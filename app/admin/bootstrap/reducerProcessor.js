import { combineReducers } from 'redux';
import storeModules from '~app/util/admin/getStoreModules';

let reducers = Object.keys(storeModules).reduce((result, moduleAlias) => {
    let module = storeModules[moduleAlias];
    let { reducer } = module;

    return {...result, ...reducer};
}, {});

export default combineReducers(reducers);
