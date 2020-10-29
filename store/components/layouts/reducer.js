import * as actionType from './actionType';

const initialState = {
    winWidth: 0,
    isMobile: false,
    showLogin: false,
    showMenu: false,
    navData: {},
    showMask: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.RESIZE_EVENT:
            return {
                ...state,
                winWidth: action.payload.winWidth,
                isMobile: action.payload.isMobile,
            };
        case actionType.SHOW_LOGIN:
            return {
                ...state,
                showLogin: action.payload,
            };
        case actionType.SET_CLIENT_NAV_ITEMS:
            return {
                ...state,
                navData: action.payload,
            };
        case actionType.SHOW_MENU:
            return {
                ...state,
                showMenu: action.payload,
            };
        case actionType.SHOW_MASK:
            return {
                ...state,
                showMask: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
