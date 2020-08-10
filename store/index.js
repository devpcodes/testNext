import { combineReducers } from 'redux';
import goOrder from './goOrder';
import testReducer from './testReducer';

const reducers = combineReducers({
    goOrder,
    testReducer
})
export default reducers;