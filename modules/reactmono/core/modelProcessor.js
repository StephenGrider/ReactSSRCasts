import { AppConfig, Model } from '@reactmono/registry';

/** Process Models */
export default (app) => {
    let modules = AppConfig.get('modules');

    modules.map(moduleName => {
        let moduleModels = require(moduleName).models;
        if (!moduleModels) {
            return;
        }
        Object.keys(moduleModels).map((alias) => {
            Model.set(alias, moduleModels[alias]());
            console.log('Register Model: ', alias);
        });
    });
};
