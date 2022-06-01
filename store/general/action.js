import * as actionType from './actionType';

export const setPlatform = platform => {
    return {
        type: actionType.SET_PLATFORM,
        payload: platform,
    };
};

export const setCurrentPath = path => {
    return {
        type: actionType.SET_CURRENT_PATH,
        payload: path,
    };
};

export const setGoBackPath = path => {
    return {
        type: actionType.SET_GOBACK_PATH,
        payload: path,
    };
};
