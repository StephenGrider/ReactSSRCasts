import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { DataResolver } from '@reactmono/core';
import reducers from '../reducers';

export default (req) => {
    const dataResolver = new DataResolver(req);
    const storeParams = {
        type: 'backend',
        resolver: dataResolver
    }

    return createStore(
        reducers,
        {},
        applyMiddleware(thunk.withExtraArgument(storeParams))
    );
}
