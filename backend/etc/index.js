import adminConfig from '../../client/admin/etc/config.json';
import clientConfig from '../../client/client/etc/config.json';
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
