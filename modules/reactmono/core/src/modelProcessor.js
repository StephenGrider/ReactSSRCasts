import { AppConfig, Model } from '@reactmono/registry';

/** Process Models */
export default (app) => {
    let modules = AppConfig.get('modules');

    modules.map(moduleName => {
        let moduleModels = require(moduleName).model;
        if (!moduleModels) {
            return;
        }
        Object.keys(moduleModels).map((alias) => {
            const getModel = moduleModels[alias];
            if (typeof getModel !== 'function') {
                return;
            }
            Model.set(alias, getModel());
            console.log('Register Model: ', alias);
        });
    });
};
