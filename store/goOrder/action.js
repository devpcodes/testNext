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
