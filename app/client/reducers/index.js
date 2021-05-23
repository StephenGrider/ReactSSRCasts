import { combineReducers } from 'redux';
import { reducer as alertReducer } from '@reactmono/store-base-alert';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import adminsReducer from './adminsReducer';

export default combineReducers({
    ...alertReducer,
    user: userReducer,
    users: usersReducer,
    auth: authReducer,
    admins: adminsReducer
});
