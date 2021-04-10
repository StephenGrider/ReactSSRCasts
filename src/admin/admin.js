// Startup point for the client side application
import '@babel/polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import  { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import axios from 'axios';
import getRoutes from './routes';
import reducers from './reducers';
import { getApiRoute, getAdminPath } from './utils/config';

const axiosInstance = axios.create({
    baseURL: `/${getAdminPath()}/${getApiRoute()}`
});

const storeParams = {
    type: 'frontend',
    resolver: axiosInstance
}

const store = createStore(
    reducers,
    window.INITIAL_STATE,
    applyMiddleware(thunk.withExtraArgument(storeParams))
);

ReactDom.hydrate(
    <Provider store={store}>
        <BrowserRouter basename={getAdminPath()}>
            <div>{renderRoutes(getRoutes())}</div>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
);
