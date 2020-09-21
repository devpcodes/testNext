import * as actionType from './actionType';

export const setIsLogin = (isLogin) => {
    return {
        type: actionType.IS_LOGIN,
        payload: isLogin,
    };
};

export const setAccounts = (accounts) => {
    return {
        type: actionType.SET_ACCOUNTS,
        payload: accounts,
    };
};
