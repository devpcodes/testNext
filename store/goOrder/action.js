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

export const setProductInfo = info => {
    return {
        type: actionType.SET_PRODUCT_INFO,
        payload: info,
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

export const setPriceType = type => {
    return {
        type: actionType.SET_PRICE_TYPE,
        payload: type,
    };
};

export const setOrdQty = qty => {
    return {
        type: actionType.SET_ORD_QTY,
        payload: qty,
    };
};

export const setOrderPrice = price => {
    return {
        type: actionType.SET_ORD_PRICE,
        payload: price,
    };
};

export const setIsFirstSell = boo => {
    return {
        type: actionType.IS_FIRST_SELL,
        payload: boo,
    };
};

export const setT30 = data => {
    return {
        type: actionType.SET_T30,
        payload: data,
    };
};

export const setTransactionCost = cost => {
    return {
        type: actionType.SET_TRANSACTION_COST,
        payload: cost,
    };
};

export const setConfirmBoxOpen = boo => {
    return {
        type: actionType.SET_CONFIRM_BOX_OPEN,
        payload: boo,
    };
};
export const setConfirmBoxTitle = title => {
    return {
        type: actionType.SET_CONFIRM_BOX_TITLE,
        payload: title,
    };
};
export const setConfirmBoxColor = color => {
    return {
        type: actionType.SET_CONFIRM_BOX_COLOR,
        payload: color,
    };
};
export const setConfirmBoxChangeValInfo = info => {
    return {
        type: actionType.SET_CONFIRM_BOX_CHANGEVALINFO,
        payload: info,
    };
};
export const setConfirmBoxClickSource = source => {
    return {
        type: actionType.SET_CONFIRM_BOX_CLICK_SOURCE,
        payload: source,
    };
};
export const setSearchListSubmitSuccess = boo => {
    return {
        type: actionType.SET_SEARCHLIST_SUBMITSUCCESS,
        payload: boo,
    };
};
export const setDefaultOrdPrice = price => {
    return {
        type: actionType.SET_DEFAULT_ORD_PRICE,
        payload: price,
    };
};
export const setResetData = boo => {
    return {
        type: actionType.SET_RESET_DATA,
        payload: boo,
    };
};
export const setHaveCA = boo => {
    return {
        type: actionType.SET_CHECK_CA,
        payload: boo,
    };
};
export const setCheckLot = boo => {
    return {
        type: actionType.SET_CHECK_LOT,
        payload: boo,
    };
};
