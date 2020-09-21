import * as actionType from './actionType';
import { getNav } from '../../../services/components/header/navFetcher';

export const resize = (winWidth, isMobile) => {
    const payload = {
        winWidth,
        isMobile
    }
    return {
        type: actionType.RESIZE_EVENT,
        payload
    }
}

export const setIsLogin = (isLogin) => {
    return {
        type: actionType.IS_LOGIN,
        payload: isLogin,
    };
};

export const showLoginHandler = (bool) => {
    return {
        type: actionType.SHOW_LOGIN,
        payload: bool
    }
}

export const setAccounts = (accounts) => {
    return {
        type: actionType.SET_ACCOUNTS,
        payload: accounts
    }
}

export const setNavItems = (token) => async (dispatch) => {
    const isServer = typeof window === 'undefined';
    const res = await getNav(token);
    const navData = res.result;

    const setServerNavItems = (navData) => {
        return {
            type: actionType.SET_SERVER_NAV_ITEMS,
            payload: navData,
        };
    };
    const setClientNavItems = (navData) => {
        return {
            type: actionType.SET_CLIENT_NAV_ITEMS,
            payload: navData,
        };
    };

    if (isServer) {
        return dispatch(setServerNavItems(navData));
    } else {
        return dispatch(setClientNavItems(navData));
    }
};
