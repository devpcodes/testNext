import * as actionType from './actionType';

export const setRealTimePrtLosSum = realTimePrtLosSum => {
    return {
        type: actionType.REAL_TIME_PRT_LOS_SUM,
        payload: realTimePrtLosSum,
    };
};
