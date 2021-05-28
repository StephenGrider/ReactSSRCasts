import * as userAction from './fetchUser';
import * as usersAction from './fetchUsers';
export const action = {
    ...userAction,
    ...usersAction
};

import userReducer from './userReducer';
import usersReducer from './usersReducer';
export const reducer = {
    user: userReducer,
    users: usersReducer
};
