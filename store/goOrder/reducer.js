import * as actionType from './actionType';

const initialState = {
    type: 'S',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_TYPE:
            return {
                ...state,
                type: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
