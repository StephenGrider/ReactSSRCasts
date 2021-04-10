import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import getRoutes from '../routes';
import config from 'config';
import { AppConfig } from '@reactmono/registry';

/**
 * Start point for node.js page rendering.
 * - React application rendering on backend.
 * - Process page <head> tag elements.
 */
export default (req, store, context) => {
    let useSSR = config.get('useSSR');
    const adminPath = AppConfig.get('adminPath');

    const content = useSSR
        ? renderToString(
            <Provider store={store}>
                <StaticRouter basename={adminPath} location={req.path} context={context}>
                    <div>{renderRoutes(getRoutes())}</div>
                </StaticRouter>
            </Provider>)
        : '';

    const helmet = Helmet.renderStatic();

    const initialState = useSSR
        ? `<script>
            window.INITIAL_STATE = ${serialize(store.getState())}
        </script>`
        : ''

    return `
        <html>
            <head>
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                <base href="/${adminPath}/">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
            </head>
            <body>
                <div id="root">${content}</div>
                ${initialState}
                <script src="/admin-bundle.js"></script>
            </body>
        </html>
    `;
};
