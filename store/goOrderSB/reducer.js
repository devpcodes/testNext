import * as actionType from './actionType';

const initialState = {
    bs: '',
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_SB_BS:
            return {
                ...state,
                bs: action.payload,
            };
        default:
            return state;
    }
};
export default reducer;
