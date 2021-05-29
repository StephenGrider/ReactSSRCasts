export * as action from './action';
export loader from './loader';

import authReducer from './reducer';
export const reducer = {
    auth: authReducer
};
