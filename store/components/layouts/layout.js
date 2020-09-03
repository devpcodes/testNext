import * as actionType from '../../../actions/components/layouts/actionType';

const initialState = {
    winWidth: 0,
    isMobile: false,
    isLogin: false,
    showLogin: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.RESIZE_EVENT:
            return {
                ...state,
                winWidth: action.payload.winWidth,
                isMobile: action.payload.isMobile,
            }
        case actionType.IS_LOGIN:
            return {
                ...state,
                isLogin: action.payload,
            }
        case actionType.SHOW_LOGIN:
            return {
                ...state,
                showLogin: action.payload,
            }
        default:
            return state
    }
}

export default reducer;