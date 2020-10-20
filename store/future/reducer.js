import * as actionType from './actionType';

const initialState = {
    openProfitLossSum: '--',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_OPEN_PROFIT_LOSS_SUM:
            return {
                ...state,
                openProfitLossSum: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
