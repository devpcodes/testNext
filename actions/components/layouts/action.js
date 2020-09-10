import * as actionType from './actionType';

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