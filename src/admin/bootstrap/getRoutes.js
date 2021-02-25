import React from 'react';
import App from '../App';
import AdminHomePage from '../pages/AdminHomePage';
import NotFoundPage from '../pages/NotFoundPage';
import { AppConfig } from '@reactmono/registry';

export default () => {
    const adminPath = AppConfig.get('adminPath');

    return [
        {
            component: App,
            routes: [
                {
                    component: AdminHomePage,
                    path: `/${adminPath}`,
                    exact: true
                },
                {
                    component: NotFoundPage
                }
            ]
        }
    ];
}
