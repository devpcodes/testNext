import { ACCOUNTS, SELECTED, DISABLED, ACTIVETYPE } from './actionType';

const initialState = {
    accounts: [],
    selected: '',
    disabled: false,
    activeType: '1',
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
        case ACTIVETYPE:
            return {
                ...state,
                activeType: action.payload,
            };
        default:
            return state;
    }
}
