import config from 'config';
import { matchPath } from 'react-router-dom';
import createStore from './createStore';
import renderer from './renderer';
import getRoutes from '~admin/bootstrap/routeProcessor';
import { AppConfig } from '@reactmono/framework-registry';
import url from 'url';
import { createMemoryHistory } from 'history';

/**
 * Frontend Admin routers configuration.
 * Process all other then api requests.
 * Admin area SSR start point.
 * Called in app/index.js
 */
export default (app) => {
    let adminPath = AppConfig.get('adminPath');
    let adminBasePath = `/${adminPath}`;

    app.get(`${adminBasePath}*`, (req, res) => {
        let useSSR = config.get('useAdminSSR');
        let appRoutes = getRoutes();
        let reqUrlPath = url.parse(req.url).pathname;
        let history = createMemoryHistory();
        history.push(req.url, {});

        reqUrlPath = reqUrlPath.indexOf(adminBasePath) === 0
            ? reqUrlPath.substr(adminBasePath.length)
            : reqUrlPath;

        const store = createStore(req, history);

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

        dataLoader
            ? dataLoader.then(() => render(req, res, store, history))
            : render(req, res, store, history);
    });
};

const render = (req, res, store, history) => {
    const context = {};
    const content = renderer(req, store, context, history);

    if (context.url) {
        return res.redirect(301, context.url);
    }

    if (context.notFound) {
        res.status(404);
    }

    res.send(content);
};