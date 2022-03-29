import * as actionType from './actionType';

const initialState = {
    menuItemData: [
        "1","2","3","4","B-)"
    ],
    keyWord:[],
  };

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionType.GET_ALL_ITEM: {
        return {
          ...state,
          announcement: action.payload,
        };
      };
      case actionType.CHANGE_ITEM: {
        return { 
          keyWord: [action.payload.itemNew]
        };
      };
      case actionType.CLEAN_ITEM: {
        return { 
          menuItemData: [] 
        };
      }
      default:
        return state;
    }
};

export default reducer;
