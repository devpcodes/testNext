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
import subBrokerage from './subBrokerage/reducer';
import watchLists from './watchLists/reducer';
import accBalance from './accBalance/reducer';
import activeReturn from './activeReturn/reducer';

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
    subBrokerage,
    watchLists,
    accBalance,
    activeReturn,
});

export default reducers;
