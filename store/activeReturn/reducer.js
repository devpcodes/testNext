import * as actionType from './actionType';

const initialState = {
    websocketInfo: {},
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_WEBSOCKETINFO:
            return {
                ...state,
                websocketInfo: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
