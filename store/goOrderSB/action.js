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

export const setPrice = price => {
    return {
        type: actionType.SET_PRICE,
        payload: price,
    };
};

export const setQty = qty => {
    return {
        type: actionType.SET_QTY,
        payload: qty,
    };
};

export const setTouchedPrice = price => {
    return {
        type: actionType.SET_TOUCHED_PRICE,
        payload: price,
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

export const setAon = type => {
    return {
        type: actionType.SET_AON,
        payload: type,
    };
};

export const setGtc = boo => {
    return {
        type: actionType.SET_GTC,
        payload: boo,
    };
};

export const setGtcDate = date => {
    return {
        type: actionType.SET_GTC_DATE,
        payload: date,
    };
};

export const setConfirmBoxChanValInfo = info => {
    return {
        type: actionType.SET_CONFIRM_BOX_CHANGEVALINFO,
        payload: info,
    };
};

export const setQueryPrice = price => {
    return {
        type: actionType.SET_QUERYPRICE,
        payload: price,
    };
};

export const setQueryQty = qty => {
    return {
        type: actionType.SET_QUERYQTY,
        payload: qty,
    };
};

export const setRefreshCode = code => {
    return {
        type: actionType.SET_REFRESH_CODE,
        payload: code,
    };
};

export const setSearchListSubmitSuccess = boo => {
    return {
        type: actionType.SET_SEARCHLIST_SUBMITSUCCESS,
        payload: boo,
    };
};

export const setWebsocketEvent = boo => {
    return {
        type: actionType.SET_WEBSOCKET_EVENT,
        payload: boo,
    };
};

export const setRealTimeUser = boo => {
    return {
        type: actionType.SET_REALTIME_USER,
        payload: boo,
    };
};

export const setConfirmBoxClickSource = str => {
    return {
        type: actionType.SET_CONFIRM_BOX_CLICK_SOURCE,
        payload: str,
    };
};
