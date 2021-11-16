import * as actionType from './actionType';

export const setBalanceData = bankData => {
    return {
        type: actionType.SET_BANK_DATA,
        payload: bankData,
    };
};

