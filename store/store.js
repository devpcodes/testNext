import { createStore, applyMiddleware } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import combinedReducer from './index';

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

const reducer = (state, action) => {
    console.log(`state:`, state);
    console.log(`action.payload:`, action.payload);

    if (action.type === HYDRATE) {
        const nextState = {
            ...action.payload, // apply delta from hydration
            ...state, // use previous state
        };
        console.log(`nextState:`, nextState);
        return nextState;
    } else {
        return combinedReducer(state, action);
    }
};

const initStore = () => {
    return createStore(reducer, bindMiddleware([thunkMiddleware]));
};

export const wrapper = createWrapper(initStore);
