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

/** Init body-parser middleware to parse form data */
import bodyParser from 'body-parser';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))

/** Prepare global configurations */
// ToDo move configuration processing to core module.
import appConfigs from './etc';
import { AppConfig } from '@reactmono/registry';
AppConfig.set('modules', appConfigs.modules);
let adminPath = appConfigs.adminConfig.adminPath;
let adminApiRoute = appConfigs.adminConfig.apiRoute;
const defaultAdminPath = 'admin';
adminPath = adminPath ? adminPath : defaultAdminPath;
AppConfig.set('adminPath', adminPath);
const path = require('path');
let adminApiPath = path.join('/', adminPath, adminApiRoute);
console.log('Admin Api Path', adminApiPath);
AppConfig.set('adminApiPath', adminApiPath);

let clientPath = appConfigs.clientConfig.clientPath;
let clientApiRoute = appConfigs.clientConfig.apiRoute;
let clientApiPath = clientPath.length
    ? path.join('/', clientPath, clientApiRoute)
    : path.join('/', clientApiRoute);
console.log('Client Api Path', clientApiPath);
AppConfig.set('clientApiPath', clientApiPath);

/** Init Models */
import { modelProcessor } from '@reactmono/core';
modelProcessor();

/** Auth implementation, Cookie Key pass */
import { initSession } from '@reactmono/auth';
initSession(app);

/** Process WebApi Router Configurations */
import { routeProcessor } from '@reactmono/core';
routeProcessor(app);

/** Register DataProvider Methods */
import { dataProviderProcessor } from '@reactmono/core';
dataProviderProcessor();

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
