import React from 'react';
import defaultLoader from './loaders/defaultLoader';
import loadable from '@loadable/component';

import { route as homepage } from './module/page-home';
import { route as notFoundPage } from './module/page-not-found';
import { route as signUpPage } from './module/page-sign-up';

export default () => ([
    {
        component: loadable(() => import(`./App`)),
        loadData: defaultLoader,
        routes: [
            ...homepage,
            ...signUpPage,
            ...notFoundPage
        ]
    }
]);
