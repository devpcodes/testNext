import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import { getCookie } from '../../../services/components/layouts/cookieController';
import { getStockUnRealPrtlos, getStockSummarisePrtlos } from '../../../actions/stock/action';
import { fetchStockUnRealPrtlos } from '../../../services/stock/stockUnRealPrtlosFetcher';
import { fetchStockSummarisePrtlos } from '../../../services/stock/stockSummarisePrtlosFetcher';
import { StockQuickView } from './stockQuickView/StockQuickView';
import { LastUpdatedTime } from './LastUpdatedTime';
import { formatNum } from '../../../services/formatNum';
import SBQuickView from './SBQuickView';

export const TradingQuickView = () => {
    const dispatch = useDispatch();
    const currentAccount = useSelector((store) => store.user.currentAccount);
    const unRealPrtlos = useSelector((store) => store.stock.UnRealPrtlos);
    const summarisePrtlos = useSelector((store) => store.stock.SummarisePrtlos);
    const prevAccount = useRef(false);

    useEffect(() => {
        prevAccount.current = currentAccount;
        getStockUnReal();
        getSummarise();
    }, []);

    useEffect(() => {
        // 修正初次渲染會多發一次請求
        if(prevAccount.current.account != null && currentAccount.account === prevAccount.current.account){
            return;
        }
        prevAccount.current = currentAccount;
        getStockUnReal();
        getSummarise();
    }, [currentAccount]);

    const getStockUnReal = function(){
        const action = '';
        const bhno = currentAccount.broker_id;
        const cseq = currentAccount.account;
        const ctype = 'A'; // 全部
        const sip = getCookie('client_ip');
        const stock = ' ';
        const token = getCookie('token');
        const ttype = 'A';
        dispatch(getStockUnRealPrtlos(fetchStockUnRealPrtlos(action, bhno, cseq, ctype, sip, stock, ttype, token)));
    }

    const getSummarise = function(){
        const bhno = currentAccount.broker_id;
        const cseq = currentAccount.account;
        const sip = getCookie('client_ip');
        const token = getCookie('token');
        dispatch(getStockSummarisePrtlos(fetchStockSummarisePrtlos(bhno, cseq, sip, token)));
    }

    //拿當日交割款
    const getTnetamt = function(currency){
        if(summarisePrtlos.length !== 0){
            const currencyInfo = summarisePrtlos.filter((item) => {
                if(item.Currency === currency){
                    return true;
                }
            })
            return currencyInfo[0].tnetamt
        }else{
            return '--'
        }
    }

    //當日的不拿，有值的才拿
    const getSummarisePrtlosInfo = function(){
        const tableInfo = [];
        if(summarisePrtlos.length !== 0){
            summarisePrtlos.forEach((obj) => {
                if(obj.t1netamt != 0) {
                    tableInfo.push({
                        key: obj.Currency + obj.t1day,
                        date: moment(obj.t1day).format('YYYY.MM.DD'),
                        amount: formatNum(Number(obj.t1netamt)),
                        cruuency: obj.Currency
                    }) 
                }
                if(obj.t2netamt != 0) {
                    tableInfo.push({
                        key: obj.Currency + obj.t2day,
                        date: moment(obj.t1day).format('YYYY.MM.DD'),
                        amount: formatNum(Number(obj.t2netamt)),
                        cruuency: obj.Currency
                    }) 
                }
            })

            if(tableInfo.length === 0){
                return [{
                    key: 0, 
                    date: '--',
                    amount: '--',
                    cruuency: '--'
                }]
            }else{
                return tableInfo;
            }
        }else{
            return [{
                key: 0, 
                date: '--',
                amount: '--',
                cruuency: '--'
            }]
        }
    }

    //當日交割款全幣別
    const getCurrencyData = () => {
        const currencyInfo = [];
        if(summarisePrtlos.length !== 0){
            summarisePrtlos.forEach((obj) => {
                if(obj.tnetamt != 0){
                    let item = {};
                    item.currency = obj.Currency;
                    item.amount = obj.tnetamt;
                    currencyInfo.push(item);
                }
            })
            // console.log(currencyInfo)
            return currencyInfo;
        }else{
            return [];
        }
    }

    // console.log(unRealPrtlos[unRealPrtlos.length - 1].unreal)
    return (
        <div className="tradingQuickView__container">
            <LastUpdatedTime />
            {currentAccount.accttype === 'S' &&
                <StockQuickView 
                    unreal={unRealPrtlos.length === 0 ? '--' : unRealPrtlos[unRealPrtlos.length - 1].unreal}
                    currencyData={getCurrencyData()}
                    tableInfo={getSummarisePrtlosInfo()}
                />
            }
            {currentAccount.accttype === 'H' &&
                <SBQuickView/>
            }
            <style jsx>{``}</style>
        </div>
    );
};
