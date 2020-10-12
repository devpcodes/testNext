import * as actionType from './actionType';
import { getNav } from '../../../services/components/header/navFetcher';

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

export const setNavItems = token => async dispatch => {
    try {
        const isServer = typeof window === 'undefined';
        const res = await getNav(token);
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
