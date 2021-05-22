import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import getRoutes from '../routeProcessor';
import config from 'config';
import { ChunkExtractor } from '@loadable/server';
import { AppConfig } from '@reactmono/registry';
import path from 'path';

/**
 * Start point for node.js page rendering.
 * - React application rendering on backend.
 * - Process page <head> tag elements.
 */
export default (req, store, context) => {
    let useSSR = config.get('useAdminSSR');
    const adminPath = AppConfig.get('adminPath');
    let stylesPath = `/styles/${config.get('design.admin')}/styles.css`;

    const app = (
        <Provider store={store}>
            <StaticRouter basename={adminPath} location={req.path} context={context}>
                <div>{renderRoutes(getRoutes())}</div>
            </StaticRouter>
        </Provider>
    );

    // This is the stats file generated by webpack loadable plugin
    const statsFile = path.resolve('./public/admin/loadable-stats.json');
    // We create an extractor from the statsFile
    const extractor = new ChunkExtractor({ statsFile, publicPath: '/admin' });
    // Wrap your application using "collectChunks"
    const jsx = extractor.collectChunks(app);

    // Render your application
    const content = useSSR ? renderToString(jsx) : '';

    const helmet = Helmet.renderStatic();

    const initialState = useSSR
        ? `<script>
            window.INITIAL_STATE = ${serialize(store.getState())}
        </script>`
        : '';

    const linkTags = extractor.getLinkTags();
    const styleTags = extractor.getStyleTags();
    const scriptTags = extractor.getScriptTags();

    return `
        <html>
            <head>
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                <base href="/${adminPath}/">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
                <link rel="stylesheet" href="${stylesPath}">
                ${linkTags}
                ${styleTags}
            </head>
            <body>
                <div id="root">${content}</div>
                ${initialState}
                ${scriptTags}
            </body>
        </html>
    `;
};
