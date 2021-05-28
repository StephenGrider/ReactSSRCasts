import React from 'react';
import loadable from '@loadable/component';
import modules from '~app/util/client/getModules';
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

    if (Array.isArray(route)) {
        route.map((routeRecord) => {
            let routePath = routeRecord['path'];
            if (routePath && loaders.hasOwnProperty(routePath)) {
                let routeLoaders = loaders[routePath];
                routeRecord['loadData'] = loaderGenerator(routeLoaders);
            }
        });

        return [...accumulatedConfigs, ...route];
    } else {
        let routePath = route['path'];
        if (routePath && loaders.hasOwnProperty(routePath)) {
            let routeLoaders = loaders[routePath];
            route['loadData'] = loaderGenerator(routeLoaders);
        }

        return [...accumulatedConfigs, route];
    }
}, []);

/** Routes configuration */
export default () => ([
    {
        component: loadable(() => import(`../App`)),
        loadData: loaderGenerator(loaders['default']),
        routes
    }
]);
