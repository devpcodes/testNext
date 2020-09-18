import * as actionType from '../actions/components/layouts/actionType';

const initialState = {
    navData: {},
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_SERVER_NAV_ITEMS:
            return {
                ...state.server,
                navData: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
