import { combineReducers } from 'redux';
import alert from '@reactmono/app-base-alert';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import adminsReducer from './adminsReducer';

export default combineReducers({
    alert: alert.ducks.reducer,
    user: userReducer,
    users: usersReducer,
    auth: authReducer,
    admins: adminsReducer
});
