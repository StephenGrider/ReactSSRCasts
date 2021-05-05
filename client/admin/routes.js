import React from 'react';
import defaultLoader from './loaders/defaultLoader';
import loadable from '@loadable/component';

export default () => ([
    {
        component: loadable(() => import(`./App`)),
        loadData: defaultLoader,
        routes: [
            {
                component: loadable(() => import(`./pages/AdminHomePage`)),
                path: `/`,
                exact: true
            },
            {
                component: loadable(() => import(`./pages/SignUpPage`)),
                path: `/signup`,
            },
            {
                component: loadable(() => import(`./pages/NotFoundPage`))
            }
        ]
    }
]);
