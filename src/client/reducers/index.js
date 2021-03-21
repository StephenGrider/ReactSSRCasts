import { combineReducers } from 'redux';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import adminsReducer from './adminsReducer';

export default combineReducers({
    user: userReducer,
    users: usersReducer,
    auth: authReducer,
    admins: adminsReducer
});
