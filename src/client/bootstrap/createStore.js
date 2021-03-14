import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { RenderDataProvider } from '@reactmono/core';
import reducers from '../reducers';

export default (req) => {
    const dataProvider = new RenderDataProvider(req, 'client');
    const storeParams = {
        type: 'backend',
        resolver: dataProvider
    }

    return createStore(
        reducers,
        {},
        applyMiddleware(thunk.withExtraArgument(storeParams))
    );
}