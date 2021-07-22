import { combineReducers } from 'redux';
import layout from './components/layouts/reducer';
import server from './server';
import user from './user/reducer';
import stock from './stock/reducer';
import sb from './sb/reducer';
import future from './future/reducer';
import general from './general/reducer';
import goOrder from './goOrder/reducer';
import solace from './solace/reducer';
import goOrderSB from './goOrderSB/reducer';
const reducers = combineReducers({
    layout,
    goOrder,
    goOrderSB,
    server,
    user,
    stock,
    sb,
    future,
    general,
    solace,
});

export default reducers;
