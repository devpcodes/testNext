import * as actionType from './actionType';
const initialState = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SOLACE:
            return {
                ...state,
                solace: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
