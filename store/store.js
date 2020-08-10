import {compose, combineReducers, applyMiddleware, createStore} from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from  './index';

export default function initializeStore(state) {
    // const store = createStore(
    //     reducer,
    //     Object.assign({}, initialState, state),
    //     applyMiddleware(ReduxThunk)
    // )
    // return store
    // const store = createStoreWithMiddleware(reducers);
    const isServer = typeof window === 'undefined';
    let composeEnhancers;
    if(isServer){
        composeEnhancers = compose;
    }else{
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    }
    const store = createStore(
        reducers, 
        Object.assign({}, state),
        composeEnhancers(applyMiddleware(ReduxThunk))
    );

    return store;
}


