export * as action from './action';
export * as type  from './type';

import alertReducer from './reducer';
export const reducer = {
    alert: alertReducer
};
