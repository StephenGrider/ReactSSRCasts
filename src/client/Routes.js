import React from 'react';
import App from './App';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';
import AdminsListPage from './pages/AdminsListPage';
import NotFoundPage from './pages/NotFoundPage';
import adminsListPageLoader from './pages/loader/adminsListPage';
import usersListPageLoader from './pages/loader/usersListPage';

export default [
    {
        ...App,
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
                component: NotFoundPage
            }
        ]
    }
];
