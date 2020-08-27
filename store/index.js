import { combineReducers } from 'redux';
import layout from './components/layouts/layout';

import goOrder from './goOrder';
import testReducer from './testReducer';

const reducers = combineReducers({
    layout,
    goOrder,
    testReducer
})
export default reducers;