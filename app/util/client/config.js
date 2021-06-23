import { clientConfig as config } from '~app/etc/client';

export const getClientPath = () => {
    return config.clientPath || '';
};

export const getApiRoute = () => {
    return config.apiRoute;
};

// Full path for api endpoint, includes base app path and api route.
export const getBaseApiPath = () => {
    const defaultClientPath = '/';
    let clientPath = getClientPath();
    if (clientPath === defaultClientPath) {
        clientPath = '';
    }

    return clientPath.length > 0
        ? `/${getClientPath()}/${getApiRoute()}`
        : `/${getApiRoute()}`;
};
