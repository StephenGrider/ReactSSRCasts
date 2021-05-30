import path from 'path';
import { AppConfig } from '@reactmono/framework-registry';

/** Set admin Api path configuration. */
const setAdminApiPath = (appConfigs) => {
    let adminPath = appConfigs.adminConfig.adminPath;
    let adminApiRoute = appConfigs.adminConfig.apiRoute;
    const defaultAdminPath = 'admin';
    adminPath = adminPath ? adminPath : defaultAdminPath;
    AppConfig.set('adminPath', adminPath);
    let adminApiPath = path.join('/', adminPath, adminApiRoute);
    console.log('Admin Api Path', adminApiPath);
    AppConfig.set('adminApiPath', adminApiPath);
};

const setClientApiPath = (appConfigs) => {
    /** Set client Api path configuration. */
    let clientPath = appConfigs.clientConfig.clientPath;
    let clientApiRoute = appConfigs.clientConfig.apiRoute;
    let clientApiPath = clientPath.length
        ? path.join('/', clientPath, clientApiRoute)
        : path.join('/', clientApiRoute);
    console.log('Client Api Path', clientApiPath);
    AppConfig.set('clientApiPath', clientApiPath);
};

const setModules = (appConfigs) => {
    AppConfig.set('modules', appConfigs.modules);
};

/**
 * Process App Configurations
 * @param appConfigs: object
 * @param applicationType: string - frontend, backend
 */
export default (appConfigs, applicationType) => {
    if (applicationType === 'backend') {
        setModules(appConfigs);
    }
    setAdminApiPath(appConfigs);
    setClientApiPath(appConfigs);
};
