import jwt_decode from 'jwt-decode';
import { getToken } from '../../user/accessToken';

export const checkLogin = function () {
    if (getToken() !== '') {
        //第一次登入，不算登入成功
        const tonkenVal = jwt_decode(getToken());
        if (tonkenVal.acts_detail == null) {
            return false;
        }

        return true;
    }
    return false;
};
