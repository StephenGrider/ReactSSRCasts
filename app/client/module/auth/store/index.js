export * as action from './fetchCurrentUser';

import authReducer from './authReducer';
export const reducer = {
    auth: authReducer
};
