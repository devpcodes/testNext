import * as actionType from './actionType';

const initialState = {
    type: 'S',
    lot: 'Board',
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
        default:
            return state;
    }
};

export default reducer;
