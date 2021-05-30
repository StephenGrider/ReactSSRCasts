import '@babel/polyfill';
import dotenv from 'dotenv';
dotenv.config({ path: `${process.env.NODE_ENV}.env`});

import express from 'express';
import config from 'config';
import cookieParser from 'cookie-parser';

/** Run DB connection */
import { dbConnector } from '@reactmono/framework-core';
dbConnector();

/** Create application */
const app = express();
app.use(cookieParser());

/** Init body-parser middleware to parse form data */
import bodyParser from 'body-parser';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))

/** Prepare global configurations */
import appConfigs from './etc';
import { initAppConfigs } from '@reactmono/framework-core';
initAppConfigs(appConfigs, 'backend');

/** Init Models */
import { modelProcessor } from '@reactmono/framework-core';
modelProcessor();

/** Auth implementation, Cookie Key pass */
import { initSession } from '@reactmono/backend-client-auth';
initSession(app);

/** Process WebApi Router Configurations */
import { routeProcessor } from '@reactmono/framework-core';
routeProcessor(app);

/** Start application */
const serverPort = config.get('backend.port');
app.listen(serverPort, () => {
    console.log(`Listening on port ${serverPort}`);
});
