import { combineReducers } from 'redux';
import auth from './auth';
import { alert } from '@reactmono/components';

export default combineReducers({
    auth,
    alert: alert.reducer
});
