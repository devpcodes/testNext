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

export const isLogin = (isLogin) => {
    return {
        type: actionType.IS_LOGIN,
        payload: isLogin
    }
}

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

export const setNavItems = () => async (dispatch) => {
    const res = await getNav();
    const navData = res.result;

    return dispatch({
        type: actionType.SET_NAV_ITEMS,
        payload: navData,
    });
};
