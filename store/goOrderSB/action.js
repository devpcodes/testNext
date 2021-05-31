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
