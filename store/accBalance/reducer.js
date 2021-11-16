import * as actionType from './actionType';

const initialState = {
    bankData: [123],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_BANK_DATA:
            return {
                ...state,
                orderList: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
