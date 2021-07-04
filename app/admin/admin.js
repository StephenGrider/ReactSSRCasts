// Startup point for the Admin frontend application
import '@babel/polyfill';
import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import axios from 'axios';
import createRootReducer from '~admin/bootstrap/reducerProcessor';
import { getApiRoute, getAdminPath } from '~app/util/admin/config';
import { loadableReady } from '@loadable/component';
import { getStateVar } from '~app/util/base/config';
import App from './App';
import { createBrowserHistory } from 'history';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';

const axiosInstance = axios.create({
    baseURL: `/${getAdminPath()}/${getApiRoute()}`
});

const storeParams = {
    type: 'frontend',
    resolver: axiosInstance
}

const initialState = JSON.parse(atob(window[getStateVar()]));
const history = createBrowserHistory();

const store = createStore(
    createRootReducer(history),
    initialState,
    compose(
        applyMiddleware(
            routerMiddleware(history),
            thunk.withExtraArgument(storeParams)
        )
    )
);

loadableReady(() => {
    hydrate(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <BrowserRouter basename={getAdminPath()}>
                    <App />
                </BrowserRouter>
            </ConnectedRouter>
        </Provider>,
        document.getElementById('root')
    );
});
