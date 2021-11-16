import * as actionType from './actionType';

const initialState = {
    SBUnRealPrtlos: {},
    SBDeliveryTrial: {},
    SBAccountBalance: {},
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_SB_UNREAL_PRTLOS:
            return {
                ...state,
                SBUnRealPrtlos: action.payload,
            };
        case actionType.SET_SB_DELIVERY_TRIAL:
            return {
                ...state,
                SBDeliveryTrial: action.payload,
            };
        case actionType.SET_SB_ACCOUNT_BALANCE:
            return {
                ...state,
                SBAccountBalance: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
