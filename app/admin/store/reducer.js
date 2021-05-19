import { combineReducers } from 'redux';
import { reducer as auth } from './auth';
import { reducer as alert } from '@reactmono/store-base-alert';

export default combineReducers({
    auth,
    alert
});
