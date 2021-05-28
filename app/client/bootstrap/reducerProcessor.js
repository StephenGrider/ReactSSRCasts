import { combineReducers } from 'redux';
import modules from '~app/util/client/getModules';

let reducers = Object.keys(modules).reduce((result, moduleAlias) => {
    let module = modules[moduleAlias];
    let { reducer } = module;

    return {...result, ...reducer};
}, {});

export default combineReducers(reducers);
