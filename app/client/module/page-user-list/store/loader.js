import { fetchUser, fetchNextUser } from './fetchUser';
import { fetchUsers } from './fetchUsers';

export default {
    '/user/:id': [
        (params) => fetchUser(params.id),
        (params) => fetchNextUser(params.id)
    ],
    '/users': [
        () => fetchUsers()
    ]
};
