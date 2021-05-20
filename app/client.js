// Startup point for the client side application
import '@babel/polyfill';
import React from 'react';
import { hydrate } from 'react-dom';
import  { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import axios from 'axios';
import getRoutes from './client/routes';
import reducers from './client/reducers';
import config from './etc/client/config.json';
import { loadableReady } from '@loadable/component';

const axiosInstance = axios.create({
    baseURL: `/${config.apiRoute}`
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

loadableReady(() => {
    hydrate(
        <Provider store={store}>
            <BrowserRouter>
                <div>{renderRoutes(getRoutes())}</div>
            </BrowserRouter>
        </Provider>,
        document.querySelector('#root')
    );
});
