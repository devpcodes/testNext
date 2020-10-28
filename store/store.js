import { createStore, applyMiddleware } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import combinedReducer from './index';

const bindMiddleware = middleware => {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
};

const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        return {
            ...state,
            server: {
                ...state.server,
                ...action.payload.server,
            },
        };
    } else {
        return combinedReducer(state, action);
    }
};

const initStore = () => {
    return createStore(reducer, bindMiddleware([thunkMiddleware]));
};

export const wrapper = createWrapper(initStore);
