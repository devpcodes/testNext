import * as actionType from './actionType';

const initialState = {
    platform: 'newweb',
    currentPath: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_PLATFORM:
            return {
                ...state,
                platform: action.payload,
            };
        case actionType.SET_CURRENT_PATH:
            return {
                ...state,
                currentPath: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
