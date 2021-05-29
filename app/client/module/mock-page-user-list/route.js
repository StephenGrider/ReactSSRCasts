import loadable from '@loadable/component';

export default [
    {
        component: loadable(() => import(`./UsersListPage`)),
        path: '/users'
    },
    {
        component: loadable(() => import(`./UserPage`)),
        path: '/user/:id'
    }
];
