import fs from 'fs';
import path from 'path';

/**
 * Run through all vendor modules and apply router configurations.
 */
export default (app) => {
    let vendorsDir = path.resolve(__dirname, '../../');
    fs.readdirSync(vendorsDir).forEach(vendorDir => {
        let modulesDir = path.resolve(vendorsDir, vendorDir);

        fs.readdirSync(modulesDir).forEach(moduleDir => {
            let moduleDirPath = path.resolve(modulesDir, moduleDir);
            let routeFile = path.resolve(moduleDirPath, 'routes.js');
            if (fs.existsSync(routeFile)) {
                let routesData = require(routeFile).default;
                routesData.map((routeData) => {
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
            }
        });
    });
};
