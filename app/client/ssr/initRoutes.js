import config from 'config';
import createStore from './createStore';
import renderer from './renderer';
import getRoutes from '~client/bootstrap/routeProcessor';
import url from 'url';
import {matchPath} from 'react-router-dom';

/**
 * Frontend Client routers configuration.
 * Process all other then api requests.
 * Backend frontend and browser frontend common start point.
 */
export default (app) => {
    app.get('*', (req, res) => {
        let useSSR = config.get('useSSR');
        let appRoutes = getRoutes();
        let reqUrlPath = url.parse(req.url).pathname;

        const store = createStore(req);

        /** Prepare page SSR data loaders as promises */
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
