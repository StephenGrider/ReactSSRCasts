import { fetchAdmins } from './fetchAdmins';

export default {
    '/admins': [
        (param) => fetchAdmins()
    ]
};
