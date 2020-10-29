import * as actionType from './actionType';

export const getSBUnRealPrtlos = axiosFun => async dispatch => {
    try {
        const data = await axiosFun;
        return dispatch(setSBUnRealPrtlos(data));
    } catch (error) {
        console.error(`error:`, error);
    }
};
const setSBUnRealPrtlos = sbUnRealPrtlos => {
    return {
        type: actionType.SET_SB_UNREAL_PRTLOS,
        payload: sbUnRealPrtlos,
    };
};

export const getSBDeliveryTrial = axiosFun => async dispatch => {
    try {
        const data = await axiosFun;
        return dispatch(setSBDeliveryTrial(data));
    } catch (error) {
        console.error(`error:`, error);
    }
};
const setSBDeliveryTrial = sbDeliveryTrial => {
    return {
        type: actionType.SET_SB_DELIVERY_TRIAL,
        payload: sbDeliveryTrial,
    };
};
