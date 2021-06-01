import * as actionType from './actionType';

const initialState = {
    bs: '',
    activeTabKey: '1', //2 3
    quote: {},
    ric: '',
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
        default:
            return state;
    }
};
export default reducer;
