import { combineReducers } from 'redux';
import auth from './auth';
import alert from '@reactmono/app-base-alert';

export default combineReducers({
    auth,
    alert: alert.ducks.reducer
});
