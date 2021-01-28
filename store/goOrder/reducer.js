import * as actionType from './actionType';

const initialState = {
    type: 'S',
    lot: 'Board', // Odd
    code: '2890',
    bs: '',
    panelHeight: 360, // 80
    ord_type: ' ', // ' ', C, P, 2
    tradeTime: 'ing', // ing, after
    time_in_force: '0', // 0 3 4
    ord_cond: '0', // 0 3 4
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_TYPE:
            return {
                ...state,
                type: action.payload,
            };
        case actionType.SET_LOT:
            return {
                ...state,
                lot: action.payload,
            };
        case actionType.SET_CODE:
            return {
                ...state,
                code: action.payload,
            };
        case actionType.SET_BS:
            return {
                ...state,
                bs: action.payload,
            };
        case actionType.SET_PANEL_HEIGHT:
            return {
                ...state,
                panelHeight: action.payload,
            };
        case actionType.SET_ORD_TYPE:
            return {
                ...state,
                ord_type: action.payload,
            };
        case actionType.SET_TRADE_TIME:
            return {
                ...state,
                tradeTime: action.payload,
            };
        case actionType.SET_TIME_IN_FORCE:
            return {
                ...state,
                time_in_force: action.payload,
            };
        case actionType.SET_ORD_COUND:
            return {
                ...state,
                ord_cond: action.payload,
            };

        default:
            return state;
    }
};

export default reducer;
