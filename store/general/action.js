import * as actionType from './actionType';

export const setDomain = domain => {
    return {
        type: actionType.SET_DOMAIN,
        payload: domain,
    };
};
