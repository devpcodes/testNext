import * as actionType from './actionType';
import { fetchUserSettings } from '../../services/user/userSettingsFetcher';

export const setIsLogin = isLogin => {
    return {
        type: actionType.IS_LOGIN,
        payload: isLogin,
    };
};

export const setAccounts = accounts => {
    return {
        type: actionType.SET_ACCOUNTS,
        payload: accounts,
    };
};

export const setUserSettings = userSettingsData => {
    return {
        type: actionType.SET_USER_SETTINGS,
        payload: userSettingsData,
    };
};

export const getUserSettings = (token, market) => async dispatch => {
    try {
        const data = await fetchUserSettings(token, market);
        return dispatch(setUserSettings(data.result));
    } catch (error) {
        console.error(`error:`, error);
        return dispatch(setUserSettings({}));
    }
};

export const setCurrentAccount = account => {
    return {
        type: actionType.SET_CURRENT_ACCOUNT,
        payload: account,
    };
};
