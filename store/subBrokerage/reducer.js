import * as actionType from './actionType';

const initialState = {
    orderList: [],
    symbolList: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_ORDER:
            return {
                ...state,
                orderList: action.payload,
            };
        case actionType.SET_SYMBOL:
            return {
                ...state,
                symbolList: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
