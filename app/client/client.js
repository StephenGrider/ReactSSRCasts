// Startup point for the client side application
import '@babel/polyfill';
import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import axios from 'axios';
import reducers from '~client/bootstrap/reducerProcessor';
import { clientConfig } from '~app/etc/client';
import { getStateVar } from '~app/util/base/config';
import { loadableReady } from '@loadable/component';
import App from './App';

const axiosInstance = axios.create({
    baseURL: `/${clientConfig.apiRoute}`
});

const storeParams = {
    type: 'frontend',
    resolver: axiosInstance
};

const initialState = JSON.parse(atob(window[getStateVar()]));

const store = createStore(
    reducers,
    initialState,
    applyMiddleware(thunk.withExtraArgument(storeParams))
);

loadableReady(() => {
    hydrate(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>,
        document.getElementById('root')
    );
});
