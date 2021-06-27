import * as actionType from './actionType';
export const setSBBs = bs => {
    return {
        type: actionType.SET_SB_BS,
        payload: bs,
    };
};
export const setSBActiveTabKey = key => {
    return {
        type: actionType.SET_SB_ACTIVETABKEY,
        payload: key,
    };
};
export const setQuote = data => {
    return {
        type: actionType.SET_QUOTE,
        payload: data,
    };
};

export const setRic = ric => {
    return {
        type: actionType.SET_RIC,
        payload: ric,
    };
};

export const setTouch = num => {
    return {
        type: actionType.SET_TOUCH,
        payload: num,
    };
};

export const setPanelHeightSB = height => {
    return {
        type: actionType.SET_PANEL_HEIGHT,
        payload: height,
    };
};

export const setStockInfo = data => {
    return {
        type: actionType.SET_STOCKINFO,
        payload: data,
    };
};
