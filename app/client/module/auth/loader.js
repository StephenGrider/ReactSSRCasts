import { action as authAction } from './store';
const { fetchCurrentUser } = authAction;

export default {
    'default': [
        (param) => fetchCurrentUser()
    ]
};
