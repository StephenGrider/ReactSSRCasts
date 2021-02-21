import { AppConfig } from '@reactmono/registry';

/** Process Api Route Configurations */
export default (app) => {
    let modules = AppConfig.get('modules');

    let routes = [];
    modules.map(moduleName => {
        let moduleRoutes = require(moduleName).routes;
        console.log('moduleRoutes: ', moduleRoutes);
        if (Array.isArray(moduleRoutes)) {
            routes = [...routes, ...moduleRoutes];
        }
    });

    routes.map((routeData) => {
        let method = routeData.method.toLowerCase();
        if (routeData.middleware) {
            app[method](
                routeData.path,
                routeData.middleware,
                routeData.callback
            );
        } else {
            app[method](
                routeData.path,
                routeData.callback
            )
        }
    });
};
