import { fetchCurrentUser } from './fetchCurrentUser';

export default {
    'default': [
        (param) => fetchCurrentUser()
    ]
};
