import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import Routes from '../client/Routes';
import config from 'config';

export default (req, store, context) => {
    let useSSR = config.get('useSSR');

    const content = useSSR
        ? renderToString(
            <Provider store={store}>
                <StaticRouter location={req.path} context={context}>
                    <div>{renderRoutes(Routes)}</div>
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
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
            </head>
            <body>
                <div id="root">${content}</div>
                ${initialState}
                <script src="bundle.js"></script>
            </body>
        </html>
    `;
};
