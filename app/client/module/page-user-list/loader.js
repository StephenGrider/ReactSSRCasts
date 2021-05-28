import { action as userAction } from './store';
import { action as usersAction } from './store';

const { fetchUsers, fetchInnerUsers } = usersAction;
const { fetchUser, fetchNextUser } = userAction;

export default {
    '/user/:id': [
        (params) => fetchUser(params.id),
        (params) => fetchNextUser(params.id)
    ],
    '/users': [
        () => fetchUsers(),
        () => fetchInnerUsers()
    ]
};
