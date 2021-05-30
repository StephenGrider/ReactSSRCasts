import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '~client/bootstrap/reducerProcessor';
import axios from 'axios';
import config from 'config';
import { AppConfig } from '@reactmono/framework-registry';

/** Backend Client SSR Redux Store. */
export default (req) => {
    const backendProtocol = config.get('backend.protocol');
    const serverHost = config.get('backend.host');
    const serverPort = config.get('backend.port');
    const apiPath = AppConfig.get('clientApiPath');
    let baseUrl = `${backendProtocol}://${serverHost}:${serverPort}${apiPath}`;
    const axiosInstance = axios.create({
        baseURL: baseUrl,
        timeout: 1000,
        headers: req.headers
    });

    const storeParams = {
        type: 'backend',
        resolver: axiosInstance
    };

    return createStore(
        reducers,
        {},
        applyMiddleware(thunk.withExtraArgument(storeParams))
    );
}
