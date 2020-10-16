import { combineReducers } from 'redux';
import layout from './components/layouts/layout';
import server from './server';
import user from './user';
import stock from './stock';
import sb from './sb';
import future from './future/reducer';
import general from './general/reducer';

import goOrder from './goOrder';
import testReducer from './testReducer';

const reducers = combineReducers({
    layout,
    goOrder,
    testReducer,
    server,
    user,
    stock,
    sb,
    future,
    general,
});

export default reducers;
