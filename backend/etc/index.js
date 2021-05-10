import adminConfig from '../../app/etc/admin-config.json';
import clientConfig from '../../app/etc/client-config.json';
import modules from './modules.json';

/** Process modules list */
let activeModules = [];
Object.keys(modules).map(moduleName => {
    if (modules.hasOwnProperty(moduleName) && modules[moduleName]) {
        activeModules.push(moduleName);
    }
});

export default {
    adminConfig,
    clientConfig,
    modules: activeModules
};
