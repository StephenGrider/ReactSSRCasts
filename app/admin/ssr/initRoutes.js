import config from 'config';
import { matchPath } from 'react-router-dom';
import createStore from './createStore';
import renderer from './renderer';
import getRoutes from '~admin/bootstrap/routeProcessor';
import { AppConfig } from '@reactmono/framework-registry';
import url from 'url';

/**
 * Frontend Admin routers configuration.
 * Process all other then api requests.
 * Admin area SSR frontend and browser frontend common start point.
 */
export default (app) => {
    let adminPath = AppConfig.get('adminPath');
    let adminBasePath = `/${adminPath}`;

    app.get(`${adminBasePath}*`, (req, res) => {
        let useSSR = config.get('useAdminSSR');
        let appRoutes = getRoutes();
        let reqUrlPath = url.parse(req.url).pathname;

        reqUrlPath = reqUrlPath.indexOf(adminBasePath) === 0
            ? reqUrlPath.substr(adminBasePath.length)
            : reqUrlPath;

        const store = createStore(req);

        let dataLoader;
        appRoutes.some(route => {
            const { loadData } = route;
            let routeMatch = matchPath(reqUrlPath, route);

            if (routeMatch && loadData && useSSR) {
                let loadDataPromise = loadData(store, routeMatch.params);
                dataLoader = new Promise((resolve, reject) => {
                    loadDataPromise.then(resolve).catch(resolve);
                });
            }

            return Boolean(routeMatch);
        });

        const render = () => {
            const context = {};
            const content = renderer(req, store, context);

            if (context.url) {
                return res.redirect(301, context.url);
            }

            if (context.notFound) {
                res.status(404);
            }

            res.send(content);
        };

        dataLoader
            ? dataLoader.then(render)
            : render();
    });
}
