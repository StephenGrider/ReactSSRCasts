import '@babel/polyfill';
import dotenv from 'dotenv';
dotenv.config({ path: `${process.env.NODE_ENV}.env`});

import express from 'express';
import config from 'config';
import cookieParser from 'cookie-parser';

/** Run DB connection */
import { dbConnector } from '@reactmono/core';
dbConnector();

/** Create application */
const app = express();
app.use(express.static('public'));
app.use('/styles', express.static('public'));
app.use(cookieParser());

/** Init body-parser middleware to parse form data */
import bodyParser from 'body-parser';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))

/** Prepare global configurations */
import appConfigs from './etc';
import { initAppConfigs } from '@reactmono/core';
initAppConfigs(appConfigs);

/** Init Models */
import { modelProcessor } from '@reactmono/core';
modelProcessor();

/** Auth implementation, Cookie Key pass */
import { initSession } from '@reactmono/auth';
initSession(app);

/** Process WebApi Router Configurations */
import { routeProcessor } from '@reactmono/core';
routeProcessor(app);

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
const serverPort = config.get('server.port');
app.listen(serverPort, () => {
    console.log(`Listening on port ${serverPort}`);
});
