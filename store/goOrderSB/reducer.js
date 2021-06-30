import * as actionType from './actionType';

const initialState = {
    bs: '',
    activeTabKey: '1', //2 3
    quote: {},
    ric: '',
    touch: 0, //0 1
    panelHeight: 400,
    stockInfo: {},
    price: '',
    qty: '',
    TouchedPrice: '',
    transactionCost: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_SB_BS:
            return {
                ...state,
                bs: action.payload,
            };
        case actionType.SET_SB_ACTIVETABKEY:
            return {
                ...state,
                activeTabKey: action.payload,
            };
        case actionType.SET_QUOTE:
            return {
                ...state,
                quote: action.payload,
            };
        case actionType.SET_RIC:
            return {
                ...state,
                ric: action.payload,
            };
        case actionType.SET_TOUCH:
            return {
                ...state,
                touch: action.payload,
            };
        case actionType.SET_PANEL_HEIGHT:
            return {
                ...state,
                panelHeight: action.payload,
            };
        case actionType.SET_STOCKINFO:
            return {
                ...state,
                stockInfo: action.payload,
            };
        case actionType.SET_PRICE:
            return {
                ...state,
                price: action.payload,
            };
        case actionType.SET_QTY:
            return {
                ...state,
                qty: action.payload,
            };
        case actionType.SET_TOUCHED_PRICE:
            return {
                ...state,
                TouchedPrice: action.payload,
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
