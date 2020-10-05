import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getCookie } from '../../../services/components/layouts/cookieController';
import { getStockUnRealPrtlos } from '../../../actions/stock/action';
import { fetchStockUnRealPrtlos } from '../../../services/stock/stockUnRealPrtlosFetcher';
import { StockQuickView } from './stockQuickView/StockQuickView';
import { LastUpdatedTime } from './LastUpdatedTime';

export const TradingQuickView = () => {
    const dispatch = useDispatch();
    const currentAccount = useSelector((store) => store.user.currentAccount);
    const unRealPrtlos = useSelector((store) => store.stock.UnRealPrtlos);

    useEffect(() => {
        const action = '';
        const bhno = currentAccount.broker_id;
        const cseq = currentAccount.account;
        const ctype = 'A'; // 全部
        const sip = getCookie('client_ip');
        const stock = ' ';
        const token = getCookie('token');
        const ttype = 'A';
        dispatch(getStockUnRealPrtlos(fetchStockUnRealPrtlos(action, bhno, cseq, ctype, sip, stock, ttype, token)));
    }, []);

    // console.log(unRealPrtlos[unRealPrtlos.length - 1].unreal)
    return (
        <div className="tradingQuickView__container">
            <LastUpdatedTime />
            <StockQuickView unreal={unRealPrtlos.length === 0 ? '--' : unRealPrtlos[unRealPrtlos.length - 1].unreal} />
            <style jsx>{``}</style>
        </div>
    );
};
