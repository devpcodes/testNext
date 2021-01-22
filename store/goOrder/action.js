import * as actionType from './actionType';

export const setType = type => {
    return {
        type: actionType.SET_TYPE,
        payload: type,
    };
};

export const setLot = type => {
    return {
        type: actionType.SET_LOT,
        payload: type,
    };
};

export const setCode = code => {
    return {
        type: actionType.SET_CODE,
        payload: code,
    };
};
