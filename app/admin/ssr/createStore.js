import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '~admin/bootstrap/reducerProcessor';
import axios from 'axios';
import config from 'config';
import { AppConfig } from '@reactmono/framework-registry';

/** Backend admin SSR Redux Store. */
export default (req) => {
    const backendProtocol = config.get('backend.protocol');
    const serverHost = config.get('backend.host');
    const serverPort = config.get('backend.port');
    const apiPath = AppConfig.get('adminApiPath');
    let baseUrl = `${backendProtocol}://${serverHost}:${serverPort}${apiPath}/`;

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
        reducer,
        {},
        applyMiddleware(thunk.withExtraArgument(storeParams))
    );
}
