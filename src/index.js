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

/** Process WebApi Router Configurations */
import { routeProcessor } from '@reactmono/core';
routeProcessor(app);

/**
 * Frontend/Client routers configuration.
 * Process all other then api requests.
 * Backend frontend and browser frontend common start point.
 */
// import { default as client } from './client';
import { default as client } from './client';
client.routes(app);

/** Start application */
const serverPort = config.get('server.port');
app.listen(serverPort, () => {
    console.log(`Listening on port ${serverPort}`);
});
