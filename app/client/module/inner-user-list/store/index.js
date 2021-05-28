export * as action from './fetchInnerUsers';
export loader from './loader';

import innerUsersReducer from './usersReducer';
export const reducer = {
    innerUsers: innerUsersReducer
};
