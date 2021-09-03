import * as actionType from './actionType';

export const setDataLoading = isDataLoading => {
    return {
        type: actionType.IS_DATA_LOADING,
        payload: isDataLoading,
    };
};
