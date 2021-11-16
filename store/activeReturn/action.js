import * as actionType from './actionType';

export const setWebSocketInfo = websocketInfo => {
    return {
        type: actionType.SET_WEBSOCKETINFO,
        payload: websocketInfo,
    };
};
