import '@babel/polyfill';
import dotenv from 'dotenv';
dotenv.config({path: `${process.env.NODE_ENV}.env`});

import express from 'express';
import config from 'config';

/** Create application */
const app = express();
app.use(express.static('public'));
app.use(express.static('static'));
app.use('/styles', express.static('public'));

/** Prepare global configurations */
import appConfigs from './etc';
import { initAppConfigs } from '@reactmono/core';
initAppConfigs(appConfigs);

/** Serve api via proxy */
import proxy from 'express-http-proxy';
const backendHost = config.get('backend.host');
const backendPort = config.get('backend.port');
const clientPort = config.get('client.port');
const clientApiPath = appConfigs.clientConfig.apiRoute;
const adminApiPath = appConfigs.adminConfig.apiRoute;
const adminPath = appConfigs.adminConfig.adminPath;

app.use(
    `/${adminPath}/${adminApiPath}`,
    proxy(
        `${backendHost}:${backendPort}`,
        {
            proxyReqPathResolver: (req) => `/${adminPath}/${adminApiPath}${req.url}`,
            proxyReqOptDecorator: (opts) =>  {
                opts.headers['x-forwarded-host'] = `localhost:${clientPort}`;
                return opts;
            }
        }
    )
);

app.use(
    `/${clientApiPath}`,
    proxy(`${backendHost}:${backendPort}`,
        {
            proxyReqPathResolver: (req) => `/${clientApiPath}${req.url}`,
            proxyReqOptDecorator: (opts) => {
                opts.headers['x-forwarded-host'] = `localhost:${clientPort}`;
                return opts;
            }
        }
    )
);

/**
 * Admin Area Client routers configuration.
 * Process all other then api requests.
 * Backend frontend and browser frontend common start point.
 */
import adminRoutes from './admin/ssr/initRoutes';
adminRoutes(app);

/**
 * Frontend/Client routers configuration.
 * Process all other then api requests.
 * Backend frontend and browser frontend common start point.
 */
import clientRoutes from './client/ssr/initRoutes';
clientRoutes(app);

/** Start application */
const serverPort = config.get('client.port');
app.listen(serverPort, () => {
    console.log(`Listening on port ${serverPort}`);
});
