import * as actionType from './actionType';

export const getOpenProfitLossSum = axiosFun => async dispatch => {
    try {
        const data = await axiosFun;
        return dispatch(setOpenProfitLossSum(data.FlowProfitLossTot ?? '0'));
    } catch (error) {
        console.error(`error:`, error);
    }
};

const setOpenProfitLossSum = openProfitLossSum => {
    return {
        type: actionType.SET_OPEN_PROFIT_LOSS_SUM,
        payload: openProfitLossSum,
    };
};
