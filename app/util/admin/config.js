import { adminConfig as config } from '~app/etc/admin';

export const getAdminPath = () => {
    return config.adminPath || 'backend';
};

export const getApiRoute = () => {
    return config.apiRoute;
}

export const getTokenCookieName = () => {
    return config.tokenCookie;
};

export const getAdminSessionExpireTime = () => {
    return parseInt(config.adminSessionExpireTime) || 3600 * 24;
};
