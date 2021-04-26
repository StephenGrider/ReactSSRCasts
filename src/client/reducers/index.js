import { combineReducers } from 'redux';
import { alert } from '@reactmono/components';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import adminsReducer from './adminsReducer';

export default combineReducers({
    alert: alert.reducer,
    user: userReducer,
    users: usersReducer,
    auth: authReducer,
    admins: adminsReducer
});
