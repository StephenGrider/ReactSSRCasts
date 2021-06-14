import React from 'react';
import modules from '~app/util/client/getModules';
import loaderGenerator from '~app/util/base/loaderGenerator';

const defaultSortOrder = 999;

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
            // Route data loaders.
            let routeRecordPath = routeRecord['path'];
            let routeLoaders = loaders['default'] ? [...loaders['default']] : [];
            if (routeRecordPath && loaders.hasOwnProperty(routeRecordPath)) {
                routeLoaders = [...routeLoaders, ...loaders[routeRecordPath]];
            }

            routeRecord['loadData'] = loaderGenerator(routeLoaders);
            // Add Module route Module info to the route record.
            routeRecord['module'] = module;
        });

        return [...accumulatedConfigs, ...route];
    }

    return accumulatedConfigs;
}, []);

/** Routes configuration */
routes = routes.sort((routeA, routeB) => {
    let orderA = routeA.sortOrder ? routeA.sortOrder : defaultSortOrder;
    let orderB = routeB.sortOrder ? routeB.sortOrder : defaultSortOrder;

    return orderA < orderB
        ? -1
        : orderA > orderB
            ? 1
            : 0;
});

export default () => routes;
