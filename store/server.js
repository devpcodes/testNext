import * as actionType from '../actions/components/layouts/actionType';

const initialState = {
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_NAV_ITEMS:
            return {
                ...state,
                server: {
                    ...state.server,
                    nav: action.payload
                }
            };
        default:
            return state
    }
}

export default reducer;