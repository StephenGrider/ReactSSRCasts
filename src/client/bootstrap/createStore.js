import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { RenderDataProvider } from '@reactmono/core';
import reducers from '../reducers';

/** Backend client SSR Redux Store. */
export default (req, apiRoutes) => {
    const dataProvider = new RenderDataProvider(req, 'client', apiRoutes);
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