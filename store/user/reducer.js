import * as actionType from './actionType';

const initialState = {
    isLogin: false,
    accounts: [],
    userSettings: {},
    currentAccount: {},
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
        case actionType.SET_USER_SETTINGS:
            return {
                ...state,
                userSettings: action.payload,
            };
        case actionType.SET_CURRENT_ACCOUNT:
            return {
                ...state,
                currentAccount: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
