import { action as authAction } from '~admin/store/auth';
const { fetchCurrentAdmin } = authAction;

export default {
    'default': [
        (param) => fetchCurrentAdmin()
    ]
};
