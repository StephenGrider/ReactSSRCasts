import React from 'react';
import App from '../App';
import AdminHomePage from '../pages/AdminHomePage';
import NotFoundPage from '../pages/NotFoundPage';
import SignUpPage from '../pages/SignUpPage';

export default () => ([
    {
        component: App,
        routes: [
            {
                component: AdminHomePage,
                path: `/`,
                exact: true
            },
            {
                component: SignUpPage,
                path: `/signup`,
            },
            {
                component: NotFoundPage
            }
        ]
    }
]);
