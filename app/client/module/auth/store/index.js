export * as action from './fetchCurrentUser';
export loader from './loader';

import authReducer from './authReducer';
export const reducer = {
    auth: authReducer
};
