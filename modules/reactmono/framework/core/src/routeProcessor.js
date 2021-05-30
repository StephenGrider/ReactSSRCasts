import { AppConfig } from '@reactmono/framework-registry';

/** Process Api Route Configurations */
export default (app) => {
    let modules = AppConfig.get('modules');
    let clientApiPath = AppConfig.get('clientApiPath');
    let adminApiPath = AppConfig.get('adminApiPath');

    let routes = [];
    modules.map(moduleName => {
        let getModuleRoutes = require(moduleName).route;
        console.log('moduleRoutes: ', getModuleRoutes());
        if (typeof getModuleRoutes === 'function') {
            routes = [...routes, ...getModuleRoutes()];
        }
    });

    routes.map((routeData) => {
        let routeArea = routeData.area;
        let routePath = routeData.path;
        let apiPath;
        switch (routeArea) {
            case 'client':
                apiPath = `${clientApiPath}${routePath}`;
                break;
            case 'admin':
                apiPath = `${adminApiPath}${routePath}`;
                break;
            default:
                apiPath = routePath
        }

        let method = routeData.method.toLowerCase();
        if (routeData.middleware) {
            app[method](
                apiPath,
                routeData.middleware,
                routeData.callback
            );
        } else {
            app[method](
                apiPath,
                routeData.callback
            )
        }

        console.log('Registered route:', apiPath)
    });
};
