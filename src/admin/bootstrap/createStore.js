import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import axios from 'axios';
import config from 'config';
import { AppConfig } from '@reactmono/registry';

/** Backend admin SSR Redux Store. */
export default (req) => {
    const serverPort = config.get('server.port');
    const apiPath = AppConfig.get('adminApiPath');
    let baseUrl = `http://localhost:${serverPort}${apiPath}/`;

    /** Pass headers to request to preserve request cookies */
    const axiosInstance = axios.create({
        baseURL: baseUrl,
        timeout: 1000,
        headers: req.headers
    });

    const storeParams = {
        type: 'backend',
        resolver: axiosInstance
    }

    return createStore(
        reducers,
        {},
        applyMiddleware(thunk.withExtraArgument(storeParams))
    );
}
