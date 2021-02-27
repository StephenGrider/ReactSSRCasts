import '@babel/polyfill';
import dotenv from 'dotenv';
dotenv.config({ path: `${process.env.NODE_ENV}.env`});

import express from 'express';
import config from 'config';

/** Run DB connection */
import { dbConnector } from '@reactmono/core';
dbConnector();

/** Create application */
const app = express();
app.use(express.static('public'));

/** Auth implementation, Cookie Key pass */
import { initSession } from '@reactmono/auth';
initSession(app);

/** Prepare global configurations */
import appConfigs from './etc';
import { AppConfig } from '@reactmono/registry';
AppConfig.set('modules', appConfigs.modules);
let adminPath = appConfigs.adminConfig.adminPath;
const defaultAdminPath = 'admin'
adminPath = adminPath ? adminPath : defaultAdminPath;
AppConfig.set('adminPath', adminPath);

/** Process WebApi Router Configurations */
import { routeProcessor } from '@reactmono/core';
routeProcessor(app);

/**
 * Admin Area Client routers configuration.
 * Process all other then api requests.
 * Backend frontend and browser frontend common start point.
 */
import adminRoutes from './admin/bootstrap/initRoutes';
adminRoutes(app);

/**
 * Frontend/Client routers configuration.
 * Process all other then api requests.
 * Backend frontend and browser frontend common start point.
 */
import clientRoutes from './client/bootstrap/initRoutes';
clientRoutes(app);

/** Start application */
const serverPort = config.get('server.port');
app.listen(serverPort, () => {
    console.log(`Listening on port ${serverPort}`);
});
