import * as actionType from './actionType';

const initialState = {
    realTimePrtLosSum: {},
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.REAL_TIME_PRT_LOS_SUM:
            return {
                ...state,
                realTimePrtLosSum: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
