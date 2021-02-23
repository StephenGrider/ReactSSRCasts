import config from 'config';
import { matchRoutes } from 'react-router-config';
import createStore from './createStore';
import renderer from './renderer';
import Routes from '../Routes';

/**
 * Frontend Client routers configuration.
 * Process all other then api requests.
 * Backend frontend and browser frontend common start point.
 */
export default (app) => {
    app.get('*', (req, res) => {
        const store = createStore(req);

        let useSSR = config.get('useSSR');
        const promises = matchRoutes(Routes, req.path).map(({ route }) => {
            return route.loadData && useSSR ? route.loadData(store) : null;
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
