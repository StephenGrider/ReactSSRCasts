import loadable from '@loadable/component';

export default [
    {
        component: loadable(() => import(`./page/UsersListPage`)),
        path: '/users'
    },
    {
        component: loadable(() => import(`./page/UserPage`)),
        path: '/user/:id'
    }
];
