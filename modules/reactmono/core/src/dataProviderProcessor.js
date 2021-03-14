import { AppConfig, DataProvider } from '@reactmono/registry';

/** Process (collect and register) modules Data Providers */
export default () => {
    let modules = AppConfig.get('modules');

    modules.map(moduleName => {
        let moduleDataProvidersMethod = require(moduleName).dataProvider;
        if (!moduleDataProvidersMethod || typeof moduleDataProvidersMethod !== 'function') {
            return;
        }

        let moduleDataProviders = moduleDataProvidersMethod();
        Object.keys(moduleDataProviders).map((alias) => {
            DataProvider.set(alias, moduleDataProviders[alias]);
            console.log('Register DataProvider: ', alias);
        });
    });
};
