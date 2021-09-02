import * as actionType from './actionType';

const initialState = {
    dataLoading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.IS_DATA_LOADING:
            return {
                ...state,
                dataLoading: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
