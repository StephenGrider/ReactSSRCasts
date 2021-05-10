import {
    getAdminPath,
    getTokenCookieName,
    getAdminSessionExpireTime
} from './admin-config';

export const deleteAdminTokenCookies = () => {
    document.cookie = `${getTokenCookieName()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `${getTokenCookieName()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/${getAdminPath()};`;
};

export const setAdminTokenCookie = (value) => {
    let date = new Date();
    date.setTime(date.getTime() + getAdminSessionExpireTime() * 1000);
    document.cookie = `${getTokenCookieName()}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/${getAdminPath()}`;
};
