import * as actionType from './actionType';

export const getStockUnRealPrtlos = axiosFun => async dispatch => {
    try {
        const data = await axiosFun;
        return dispatch(setStockUnRealPrtlos(data));
    } catch (error) {
        console.error(`error:`, error);
    }
};
const setStockUnRealPrtlos = unRealPrtlos => {
    return {
        type: actionType.SET_UNREAL_PRTLOS,
        payload: unRealPrtlos,
    };
};

export const getStockSummarisePrtlos = axiosFun => async dispatch => {
    try {
        const data = await axiosFun;
        return dispatch(setStockSummarisePrtlos(data));
    } catch (error) {
        console.error(`error:`, error);
    }
};
const setStockSummarisePrtlos = unRealPrtlos => {
    return {
        type: actionType.SET_SUMMARISE_PRTLOS,
        payload: unRealPrtlos,
    };
};
