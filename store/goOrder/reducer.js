import * as actionType from './actionType';

const initialState = {
    type: 'S',
    lot: 'Board',
    code: '2890',
    bs: '',
    panelHeight: 360,
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
        default:
            return state;
    }
};

export default reducer;
