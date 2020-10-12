import * as actionType from '../actions/stock/actionType';

const initialState = {
    UnRealPrtlos: [],
    SummarisePrtlos: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_UNREAL_PRTLOS:
            return {
                ...state,
                UnRealPrtlos: action.payload,
            };
        case actionType.SET_UNREAL_PRTLOS:
            return {
                ...state,
                UnRealPrtlos: action.payload,
            };
        case actionType.SET_SUMMARISE_PRTLOS:
            return {
                ...state,
                SummarisePrtlos: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
