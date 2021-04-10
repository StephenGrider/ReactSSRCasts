import React from 'react';
import App from './App';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';
import UserPage from './pages/UserPage';
import AdminsListPage from './pages/AdminsListPage';
import NotFoundPage from './pages/NotFoundPage';
import adminsListPageLoader from './loaders/adminsListPage';
import usersListPageLoader from './loaders/usersListPage';
import usersPageLoader from './loaders/userPage';
import defaultLoader from './loaders/defaultLoader';

export default () => ([
    {
        component: App,
        loadData: defaultLoader,
        routes: [
            {
                component: HomePage,
                path: '/',
                exact: true
            },
            {
                component: AdminsListPage,
                loadData: adminsListPageLoader,
                path: '/admins'
            },
            {
                component: UsersListPage,
                loadData: usersListPageLoader,
                path: '/users'
            },
            {
                component: UserPage,
                loadData: usersPageLoader,
                path: '/user/:id'
            },
            {
                component: NotFoundPage
            }
        ]
    }
]);
