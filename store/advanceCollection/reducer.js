import { ACCOUNTS, SELECTED, DISABLED } from './actionType';

const initialState = {
    accounts: [],
    selected: '',
    disabled: false,
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
        case DISABLED:
            return {
                ...state,
                disabled: action.payload,
            };
        default:
            return state;
    }
}
