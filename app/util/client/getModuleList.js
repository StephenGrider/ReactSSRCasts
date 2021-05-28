import { moduleList as modules } from '~app/etc/client';

/** Process modules list */
let activeModules = [];
Object.keys(modules).map(moduleName => {
    if (modules.hasOwnProperty(moduleName) && modules[moduleName]) {
        activeModules.push(moduleName);
    }
});

export default activeModules;
