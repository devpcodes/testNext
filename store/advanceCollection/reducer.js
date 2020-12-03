import { ACCOUNTS, SELECTED } from './actionType';

const initialState = {
    accounts: [],
    selected: '',
};

export function accountsReducer(state = initialState, action) {
    switch (action.type) {
        case ACCOUNTS:
            return {
                ...state,
                accounts: action.payload,
            };
        case SELECTED:
            return {
                ...state,
                selected: action.payload,
            };
        default:
            return state;
    }
}
