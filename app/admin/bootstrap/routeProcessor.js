import React from 'react';
import loadable from '@loadable/component';
import modules from '~app/util/admin/getModules';
import loaderGenerator from '~app/util/base/loaderGenerator';

/** Collect loaders for routes from modules */
let loaders = Object.keys(modules).reduce((collectedLoader, module) => {
    let { loader } = modules[module];

    if (!loader) {
        return collectedLoader;
    }

    Object.keys(loader).map((loaderRoute) => {
        collectedLoader[loaderRoute] = collectedLoader.hasOwnProperty(loaderRoute)
            ? [...collectedLoader[loaderRoute], ...loader[loaderRoute]]
            : loader[loaderRoute];
    });

    return collectedLoader;
}, {});

/** Collect routes from modules */
let routes = Object.keys(modules).reduce((accumulatedConfigs, module) => {
    let { route } = modules[module];

    if (!route) {
        return accumulatedConfigs;
    }

    let routePath = route['path'];
    if (loaders.hasOwnProperty(routePath)) {
        let routeLoaders = loaders[routePath];
        route['loadData'] = loaderGenerator(routeLoaders);
    }

    return [...accumulatedConfigs, ...route];
}, []);

/** Routes configuration */
export default () => ([
    {
        component: loadable(() => import(`../App`)),
        loadData: loaderGenerator(loaders['default']),
        routes
    }
]);
