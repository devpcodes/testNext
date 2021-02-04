import * as actionType from './actionType';

export const setSolaceData = solaceData => {
    return {
        type: actionType.SOLACE_DATA,
        payload: solaceData,
    };
};
