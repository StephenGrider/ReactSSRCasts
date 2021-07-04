import config from 'config';
import createStore from './createStore';
import renderer from './renderer';
import getRoutes from '~client/bootstrap/routeProcessor';
import url from 'url';
import { matchPath } from 'react-router-dom';
import { AppConfig } from '@reactmono/framework-registry';
import { createMemoryHistory } from 'history';

/**
 * Frontend Client routers SSR processing.
 * Handle all other then api requests.
 * Called in app/index.js
 */
export default (app) => {
    let clientPath = AppConfig.get('clientPath');
    let clientBasePath = `/${clientPath}`;

    app.get(`${clientBasePath}*`, (req, res) => {
        let useSSR = config.get('useSSR');
        let appRoutes = getRoutes();
        let reqUrlPath = url.parse(req.url).pathname;
        let history = createMemoryHistory();
        history.push(req.url, {});

        reqUrlPath = clientPath.length && reqUrlPath.indexOf(clientBasePath) === 0
            ? reqUrlPath.substr(clientBasePath.length)
            : reqUrlPath;

        const store = createStore(req, history);

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
