import * as actionType from './actionType';
export const setSBBs = bs => {
    return {
        type: actionType.SET_SB_BS,
        payload: bs,
    };
};
