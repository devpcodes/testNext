import * as actionType from './actionType';

export const setOrderList = orderList => {
    return {
        type: actionType.SET_ORDER,
        payload: orderList,
    };
};
