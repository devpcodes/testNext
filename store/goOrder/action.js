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

export const setBs = bs => {
    return {
        type: actionType.SET_BS,
        payload: bs,
    };
};

export const setPanelHeight = h => {
    return {
        type: actionType.SET_PANEL_HEIGHT,
        payload: h,
    };
};

export const setOrdType = type => {
    return {
        type: actionType.SET_ORD_TYPE,
        payload: type,
    };
};

export const setTradeTime = type => {
    return {
        type: actionType.SET_TRADE_TIME,
        payload: type,
    };
};

export const setTimeInForce = type => {
    return {
        type: actionType.SET_TIME_IN_FORCE,
        payload: type,
    };
};

export const setOrdCount = type => {
    return {
        type: actionType.SET_ORD_COUND,
        payload: type,
    };
};
