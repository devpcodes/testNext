import * as actionType from './actionType';

export const setType = type => {
    return {
        type: actionType.SET_TYPE,
        payload: type,
    };
};
