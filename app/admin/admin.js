// Startup point for the client side application
import '@babel/polyfill';
import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import axios from 'axios';
import reducer from '~admin/bootstrap/reducerProcessor';
import { getApiRoute, getAdminPath } from '~app/util/admin/config';
import { loadableReady } from '@loadable/component';
import { getStateVar } from '~app/util/base/config';
import App from './App';

const axiosInstance = axios.create({
    baseURL: `/${getAdminPath()}/${getApiRoute()}`
});

const storeParams = {
    type: 'frontend',
    resolver: axiosInstance
}

const initialState = JSON.parse(atob(window[getStateVar()]));

const store = createStore(
    reducer,
    initialState,
    applyMiddleware(thunk.withExtraArgument(storeParams))
);

loadableReady(() => {
    hydrate(
        <Provider store={store}>
            <BrowserRouter basename={getAdminPath()}>
                <App />
            </BrowserRouter>
        </Provider>,
        document.getElementById('root')
    );
});
