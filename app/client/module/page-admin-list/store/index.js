export * as action from './fetchAdmins';

import adminsReducer from './adminsReducer';
export const reducer = {
    admins: adminsReducer
};
