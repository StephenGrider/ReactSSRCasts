import { combineReducers } from 'redux';
import modules from '~app/util/client/getModules';
import { connectRouter } from 'connected-react-router';

export default (history) => {
    let reducers = Object.keys(modules).reduce((result, moduleAlias) => {
        let module = modules[moduleAlias];
        let { reducer } = module;

        return {...result, ...reducer};
    }, {});

    return combineReducers({
        router: connectRouter(history),
        ... reducers
    })
};
