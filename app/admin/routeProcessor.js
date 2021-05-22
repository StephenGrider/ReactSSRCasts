import React from 'react';
import defaultLoader from '~admin/loaders/defaultLoader';
import loadable from '@loadable/component';
import modules from '~app/util/admin/getModules';

let routes = Object.keys(modules).reduce((accumulatedConfigs, module) => {
    let { route } = modules[module];
    return route ? [...accumulatedConfigs, ...route] : accumulatedConfigs;
}, []);

export default () => ([
    {
        component: loadable(() => import(`./App`)),
        loadData: defaultLoader,
        routes
    }
]);
