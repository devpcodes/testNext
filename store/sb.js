import * as actionType from '../actions/sb/actionType';

const initialState = {
    SBUnRealPrtlos: {}, 
    SBDeliveryTrial: {}
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
        default:
            return state;
    }
};

export default reducer;