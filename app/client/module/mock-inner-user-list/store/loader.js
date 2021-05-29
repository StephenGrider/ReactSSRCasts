import { fetchInnerUsers } from './fetchInnerUsers';

export default {
    '/users': [
        () => fetchInnerUsers()
    ]
};
