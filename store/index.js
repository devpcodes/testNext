import { combineReducers } from 'redux';
import layout from './components/layouts/layout';
import server from './server';
import user from './user';

import goOrder from './goOrder';
import testReducer from './testReducer';

const reducers = combineReducers({
    layout,
    goOrder,
    testReducer,
    server,
    user,
})
export default reducers;