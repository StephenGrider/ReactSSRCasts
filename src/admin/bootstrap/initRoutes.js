import config from 'config';
import { matchRoutes } from 'react-router-config';
import createStore from './createStore';
import renderer from './renderer';
import getRoutes from './getRoutes';
import { AppConfig } from '@reactmono/registry';

/**
 * Frontend Admin routers configuration.
 * Process all other then api requests.
 * Admin area Backend frontend and browser frontend common start point.
 */
export default (app) => {
    let adminPath = AppConfig.get('adminPath');

    app.get(`/${adminPath}*`, (req, res) => {
        let useSSR = config.get('useSSR');
        let apiRoutes = getRoutes();
        let matchRoutesList = matchRoutes(apiRoutes, req.path);

        const store = createStore(req, apiRoutes);

        const promises = matchRoutesList.map(({route, match}) => {
            return route.loadData && useSSR ? route.loadData(store, match) : null;
        }).map(promise => {
            if (promise) {
                return new Promise((resolve, reject) => {
                    promise.then(resolve).catch(resolve);
                })
            }
        });

        /** Process page SSR data loaders */
        Promise.all(promises).then(() => {
            const context = {};
            const content = renderer(req, store, context);

            if (context.url) {
                return res.redirect(301, context.url);
            }

            if (context.notFound) {
                res.status(404);
            }

            res.send(content);
        });
    });
}
