import * as actionType from './actionType';

export const setAnnounceData = (menuItemData,keyWord) => {
    const payload = {
        menuItemData,
        keyWord,
    };
    return {
        type: actionType.GET_ALL_ITEM,
        payload: payload,
    };
};
