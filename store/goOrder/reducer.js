import * as actionType from './actionType';

const initialState = {
    type: 'S',
    lot: 'Board', // Odd
    code: '2890',
    productInfo: null,
    bs: '',
    panelHeight: 360, // 80
    ord_type: ' ', // ' ', C, P, 2
    tradeTime: 'ing', // ing, after
    time_in_force: '0', // 0 3 4
    ord_cond: '0', // 0 3 4
    price_type: ' ', // ' ', 4 2 3 1
    ord_qty: '1',
    ord_price: '',
    is_first_sell: 'N', //Y N
    T30Data: {},
    transactionCost: '',
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
        case actionType.SET_PRODUCT_INFO:
            return {
                ...state,
                productInfo: action.payload,
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
        case actionType.SET_PRICE_TYPE:
            console.log('reducer', action.payload);
            return {
                ...state,
                price_type: action.payload,
            };
        case actionType.SET_ORD_QTY:
            console.log('reducer', action.payload);
            return {
                ...state,
                ord_qty: action.payload,
            };
        case actionType.SET_ORD_PRICE:
            return {
                ...state,
                ord_price: action.payload,
            };
        case actionType.IS_FIRST_SELL:
            return {
                ...state,
                is_first_sell: action.payload,
            };
        case actionType.SET_T30:
            return {
                ...state,
                T30Data: action.payload,
            };
        case actionType.SET_TRANSACTION_COST:
            return {
                ...state,
                transactionCost: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
