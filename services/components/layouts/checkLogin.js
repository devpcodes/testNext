import jwt_decode from 'jwt-decode';
import { getCookie } from './cookieController';

export const checkLogin = function () {
    if (getCookie('token') !== '') {
        //第一次登入，不算登入成功
        const tonkenVal = jwt_decode(getCookie('token'));
        if (tonkenVal.acts_detail == null) {
            return false;
        }

        return true;
    }
    return false;
};
