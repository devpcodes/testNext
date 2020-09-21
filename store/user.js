import * as actionType from '../actions/user/actionType';

const initialState = {
    isLogin: false,
    accounts: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.IS_LOGIN:
            return {
                ...state,
                isLogin: action.payload,
            };
        case actionType.SET_ACCOUNTS:
            return {
                ...state,
                accounts: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
