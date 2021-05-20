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
import getRoutes from './admin/routes';
import reducer from './admin/store/reducer';
import { getApiRoute, getAdminPath } from '~app/utils/admin-config';
import { loadableReady } from '@loadable/component';

const axiosInstance = axios.create({
    baseURL: `/${getAdminPath()}/${getApiRoute()}`
});

const storeParams = {
    type: 'frontend',
    resolver: axiosInstance
}

const store = createStore(
    reducer,
    window.INITIAL_STATE,
    applyMiddleware(thunk.withExtraArgument(storeParams))
);

loadableReady(() => {
    hydrate(
        <Provider store={store}>
            <BrowserRouter basename={getAdminPath()}>
                <div>{renderRoutes(getRoutes())}</div>
            </BrowserRouter>
        </Provider>,
        document.querySelector('#root')
    );
});
