import * as actionType from './actionType';

export const setOrderList = orderList => {
    return {
        type: actionType.SET_ORDER,
        payload: orderList,
    };
};

export const setSymbolList = symbolList => {
    return {
        type: actionType.SET_SYMBOL,
        payload: symbolList,
    };
};
