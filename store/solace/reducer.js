import * as actionType from './actionType';
const initialState = {
    solaceData: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SOLACE_DATA:
            return {
                ...state,
                solaceData: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
