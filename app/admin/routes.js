import React from 'react';
import defaultLoader from './loaders/defaultLoader';
import loadable from '@loadable/component';

import { route as homepage } from './module/home-page';

export default () => ([
    {
        component: loadable(() => import(`./App`)),
        loadData: defaultLoader,
        routes: [
            ...homepage,
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
