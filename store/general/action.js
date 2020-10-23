import * as actionType from './actionType';

export const setDomain = domain => {
    return {
        type: actionType.SET_DOMAIN,
        payload: domain,
    };
};

export const setCurrentPath = path => {
    return {
        type: actionType.SET_CURRENT_PATH,
        payload: path,
    };
};
