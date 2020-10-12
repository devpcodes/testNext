import { getCookie } from './cookieController';

export const checkLogin = function () {
    if (getCookie('token') !== '') {
        return true;
    }
    return false;
};
