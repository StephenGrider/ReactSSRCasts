import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../client/reducers';
import { DataResolver } from '@reactmono/core';

export default (req) => {
    const dataResolver = new DataResolver(req);
    const storeParams = {
        type: 'backend',
        resolver: dataResolver
    }

    const store = createStore(
        reducers,
        {},
        applyMiddleware(thunk.withExtraArgument(storeParams))
    );

    return store;
}