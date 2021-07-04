import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createRootReducer from '~admin/bootstrap/reducerProcessor';
import axios from 'axios';
import config from 'config';
import { AppConfig } from '@reactmono/framework-registry';
import { routerMiddleware } from 'connected-react-router';

/** Render Server admin SSR Redux Store. */
export default (req, history) => {
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
        createRootReducer(history),
        {},
        compose(
            applyMiddleware(
                routerMiddleware(history),
                thunk.withExtraArgument(storeParams)
            )
        )
    );
}
