export * as action from './action';

import authReducer from './reducer';
export const reducer = {
    auth: authReducer
};
