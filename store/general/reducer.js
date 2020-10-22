import * as actionType from './actionType';

const initialState = {
    domain: 'newweb',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_DOMAIN:
            return {
                ...state,
                domain: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
