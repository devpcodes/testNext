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
    confirmBox: false,
    confirmBoxTitle: '委託確認',
    confirmBoxColor: '',
    aon: 'ANY', //ANY, AON
    gtc: false,
    gtcDate: '',
    confirmBoxChanValInfo: {},
    queryPrice: '',
    queryQty: '',
    refreshCode: '',
    searchListSubmitSuccess: false,
    websocketEvent: false,
    realTimeUser: false,
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
        case actionType.SET_CONFIRM_BOX_OPEN:
            return {
                ...state,
                confirmBox: action.payload,
            };
        case actionType.SET_CONFIRM_BOX_TITLE:
            return {
                ...state,
                confirmBoxTitle: action.payload,
            };
        case actionType.SET_CONFIRM_BOX_COLOR:
            return {
                ...state,
                confirmBoxColor: action.payload,
            };
        case actionType.SET_AON:
            return {
                ...state,
                aon: action.payload,
            };
        case actionType.SET_GTC:
            return {
                ...state,
                gtc: action.payload,
            };
        case actionType.SET_GTC_DATE:
            return {
                ...state,
                gtcDate: action.payload,
            };
        case actionType.SET_CONFIRM_BOX_CHANGEVALINFO:
            return {
                ...state,
                confirmBoxChanValInfo: action.payload,
            };
        case actionType.SET_QUERYPRICE:
            return {
                ...state,
                queryPrice: action.payload,
            };
        case actionType.SET_QUERYQTY:
            return {
                ...state,
                queryQty: action.payload,
            };
        case actionType.SET_REFRESH_CODE:
            return {
                ...state,
                refreshCode: action.payload,
            };
        case actionType.SET_SEARCHLIST_SUBMITSUCCESS:
            return {
                ...state,
                searchListSubmitSuccess: action.payload,
            };
        case actionType.SET_WEBSOCKET_EVENT:
            return {
                ...state,
                websocketEvent: action.payload,
            };
        case actionType.SET_REALTIME_USER:
            return {
                ...state,
                realTimeUser: action.payload,
            };
        default:
            return state;
    }
};
export default reducer;
