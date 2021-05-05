import React from 'react';
import adminsListPageLoader from './loaders/adminsListPage';
import usersListPageLoader from './loaders/usersListPage';
import usersPageLoader from './loaders/userPage';
import defaultLoader from './loaders/defaultLoader';
import loadable from '@loadable/component';

export default () => ([
    {
        component: loadable(() => import(`./App`)),
        loadData: defaultLoader,
        routes: [
            {
                component: loadable(() => import(`./pages/HomePage`)),
                path: '/',
                exact: true
            },
            {
                component: loadable(() => import(`./pages/AdminsListPage`)),
                loadData: adminsListPageLoader,
                path: '/admins'
            },
            {
                component: loadable(() => import(`./pages/UsersListPage`)),
                loadData: usersListPageLoader,
                path: '/users'
            },
            {
                component: loadable(() => import(`./pages/UserPage`)),
                loadData: usersPageLoader,
                path: '/user/:id'
            },
            {
                component: loadable(() => import(`./pages/NotFoundPage`))
            }
        ]
    }
]);
