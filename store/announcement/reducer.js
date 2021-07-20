const initState = {
    menuItemData: [
        "1","2","3","4","B-)"
    ],
    keyWord:[],
  };

const itemReducer = (state = initState, action) => {
    switch (action.type) {
    //   case 'ADD_ITEM': {
    //     const menuItemCopy = state.menuItemData.slice();
    //     return { menuItemData: [action.payload.itemNew].concat(menuItemCopy) };
    //   }
      case 'CHANGE_ITEM': {
        return { keyWord: [action.payload.itemNew]};
      }
      case 'CLEAN_ITEM': {
        return { menuItemData: [] };
      }
      default:
        return state;
    }
};

export {itemReducer};