import * as actionType from './actionType';
import { fetchUserSettings } from '../../services/userSettingsFetcher';

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

export const setUserSettings = (userSettingsData) => {
    return {
        type: actionType.SET_USER_SETTINGS,
        payload: userSettingsData,
    };
};

export const getUserSettings = (userId) => async (dispatch) => {
    try {
        const res = await fetchUserSettings(userId);
        const userSettingsData = res.data;

        return dispatch(setUserSettings(userSettingsData));
    } catch (error) {
        console.error(`error:`, error);
    }
};
