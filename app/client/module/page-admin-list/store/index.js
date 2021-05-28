export * as action from './fetchAdmins';
export loader from './loader';

import adminsReducer from './adminsReducer';
export const reducer = {
    admins: adminsReducer
};
