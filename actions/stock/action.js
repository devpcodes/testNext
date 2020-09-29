import * as actionType from './actionType';

export const getStockUnRealPrtlos = (axiosFun) => async (dispatch) => {
    try {
        const data = await axiosFun;
        return dispatch(setStockUnRealPrtlos(data));
    } catch (error) {
        console.error(`error:`, error);
    }
};
export const setStockUnRealPrtlos = (unRealPrtlos) => {
    return {
        type: actionType.SET_UNREAL_PRTLOS,
        payload: unRealPrtlos,
    };
};