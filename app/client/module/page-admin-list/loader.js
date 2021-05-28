import { action } from './store';

const { fetchAdmins } = action;

export default {
    '/admins': [
        (param) => fetchAdmins()
    ]
};
