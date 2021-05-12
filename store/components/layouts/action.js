import * as actionType from './actionType';
import { getNav } from '../../../services/components/header/navFetcher';
import { checkServer } from '../../../services/checkServer';

export const resize = (winWidth, isMobile) => {
    const payload = {
        winWidth,
        isMobile,
    };
    return {
        type: actionType.RESIZE_EVENT,
        payload,
    };
};

export const showLoginHandler = bool => {
    return {
        type: actionType.SHOW_LOGIN,
        payload: bool,
    };
};

export const setMenuOpen = bool => {
    return {
        type: actionType.SHOW_MENU,
        payload: bool,
    };
};

export const setMaskVisible = bool => {
    return {
        type: actionType.SHOW_MASK,
        payload: bool,
    };
};

export const setNavItems = data => async dispatch => {
    try {
        const isServer = checkServer();
        const res = await getNav(data);
        const navData = res.result;

        const setServerNavItems = navData => {
            return {
                type: actionType.SET_SERVER_NAV_ITEMS,
                payload: navData,
            };
        };
        const setClientNavItems = navData => {
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
    } catch (error) {
        console.error(`error:`, error);
    }
};

export const setPersonalAreaVisible = bool => {
    return {
        type: actionType.SET_PERSONAL_AREA_VISIBLE,
        payload: bool,
    };
};

export const setRecaptchaReady = bool => {
    return {
        type: actionType.SET_RECAPTCHA_LOAD,
        payload: true,
    };
};

export const setModal = options => {
    return {
        type: actionType.SET_MODAL,
        payload: options,
    };
};
