import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import { getStockUnRealPrtlos, getStockSummarisePrtlos } from '../../../store/stock/action';
import { getSBUnRealPrtlos, getSBDeliveryTrial } from '../../../store/sb/action';
import { getOpenProfitLossSum } from '../../../store/future/action';

import { getCookie } from '../../../services/components/layouts/cookieController';
import { getToken } from '../../../services/user/getToken';
import { fetchStockUnRealPrtlos } from '../../../services/stock/stockUnRealPrtlosFetcher';
import { fetchStockSummarisePrtlos } from '../../../services/stock/stockSummarisePrtlosFetcher';
import { fetchSBUnRealPrtlosFetcher } from '../../../services/sb/sbUnrealizedPrtLosFetcher';
import { fetchSBDeliveryTrialFetcher } from '../../../services/sb/sbDeliveryTrial';
import { fetchOpenPosition } from '../../../services/future/openPositionFetcher';

import StockQuickView from './stockQuickView/StockQuickView';
import { LastUpdatedTime } from './LastUpdatedTime';
import { formatNum } from '../../../services/formatNum';
import SBQuickView from './SBQuickView';
import { FutureQuickView } from './FutureQuickView';
import errImg from '../../../resources/images/components/errPage/img-loading-m.png';

export const TradingQuickView = () => {
    const dispatch = useDispatch();
    const currentAccount = useSelector(store => store.user.currentAccount);
    const unRealPrtlos = useSelector(store => store.stock.UnRealPrtlos);
    const summarisePrtlos = useSelector(store => store.stock.SummarisePrtlos);
    const SBunRealPrtlos = useSelector(store => store.sb.SBUnRealPrtlos);
    const SBdeliveryTrial = useSelector(store => store.sb.SBDeliveryTrial);
    const openProfitLossSum = useSelector(store => store.future.openProfitLossSum);
    // const prevAccount = useRef(false);
    const prevDate = useRef('');
    const [updateDate, setUpdateDate] = useState('');
    const [isError, setIsError] = useState(false);

    // useEffect(() => {
    //     prevAccount.current = currentAccount;
    //     getDataHandler(currentAccount.accttype);
    // }, []);

    // useEffect(() => {
    //     // 修正初次渲染會多發一次請求
    //     if (prevAccount.current.account != null && currentAccount.account === prevAccount.current.account) {
    //         return;
    //     }
    //     prevAccount.current = currentAccount;
    //     getDataHandler(currentAccount.accttype);
    // }, [currentAccount]);

    useEffect(() => {
        handleUpdateDate();
    }, [currentAccount]);

    useEffect(() => {
        if (updateDate === prevDate.current) {
            return;
        }
        prevDate.current = updateDate;
        getDataHandler(currentAccount.accttype);
    }, [updateDate]);

    useEffect(() => {
        if (
            (currentAccount.accttype === 'S' && typeof unRealPrtlos !== 'object') ||
            (currentAccount.accttype === 'S' && typeof summarisePrtlos !== 'object') ||
            (currentAccount.accttype === 'H' && typeof SBunRealPrtlos !== 'object') ||
            (currentAccount.accttype === 'H' && typeof SBdeliveryTrial !== 'object') ||
            (currentAccount.accttype === 'F' && openProfitLossSum === 'error')
        ) {
            setIsError(true);
        } else {
            setIsError(false);
        }
    }, [currentAccount.accttype, unRealPrtlos, summarisePrtlos, SBunRealPrtlos, SBdeliveryTrial, openProfitLossSum]);

    const handleUpdateDate = () => {
        const formatDateToken = 'YYYY/MM/DD HH:mm:ss';
        setUpdateDate(moment().format(formatDateToken));
    };

    //根據證期權取得對應的帳號資料
    const getDataHandler = function (type) {
        switch (type) {
            case 'S':
                getStockUnReal();
                getSummarise();
                break;
            case 'H':
                getSBUnrealizedPrtLos();
                getDeliveryTrial();
                break;
            case 'F':
                dispatchOpenProfitLossSum();
                break;
            default:
                break;
        }
    };

    const getStockUnReal = function () {
        const action = '';
        const bhno = currentAccount.broker_id;
        const cseq = currentAccount.account;
        const ctype = 'A'; // 全部
        const sip = getCookie('client_ip');
        const stock = ' ';
        const token = getToken();
        const ttype = 'A';
        dispatch(getStockUnRealPrtlos(fetchStockUnRealPrtlos(action, bhno, cseq, ctype, sip, stock, ttype, token)));
    };

    const getSummarise = function () {
        const bhno = currentAccount.broker_id;
        const cseq = currentAccount.account;
        const sip = getCookie('client_ip');
        const token = getToken();
        dispatch(getStockSummarisePrtlos(fetchStockSummarisePrtlos(bhno, cseq, sip, token)));
    };

    //海外未實現損益
    const getSBUnrealizedPrtLos = function () {
        const market = '';
        const stock_id = '';
        const hasData = false;
        const token = getToken();
        dispatch(getSBUnRealPrtlos(fetchSBUnRealPrtlosFetcher(market, stock_id, hasData, token)));
    };

    //當日交割款試算
    const getDeliveryTrial = function () {
        const market = '';
        const stock_id = '';
        const hasData = false;
        const token = getToken();
        dispatch(getSBDeliveryTrial(fetchSBDeliveryTrialFetcher(market, stock_id, hasData, token)));
    };

    // 期權未平倉損益
    const dispatchOpenProfitLossSum = function () {
        const data = {
            token: getToken(),
            user_id: currentAccount.idno,
            account: `${currentAccount.broker_id}${currentAccount.account}`,
            category: '0',
            type: '1',
            call_put: ' ',
        };
        dispatch(getOpenProfitLossSum(fetchOpenPosition(data)));
    };

    const tableInfoHandler = (obj, tableInfo) => {
        if (obj.tnetamt != 0 || obj.t1netamt != 0 || obj.t2netamt != 0) {
            tableInfo.push({
                key: obj.Currency + obj.tday,
                date: moment(obj.tday).format('YYYY.MM.DD'),
                amount: formatNum(Number(obj.tnetamt)),
                currency: obj.tnetamt == 0 ? '-' : obj.Currency,
            });
            tableInfo.push({
                key: obj.Currency + obj.t1day,
                date: moment(obj.t1day).format('YYYY.MM.DD'),
                amount: formatNum(Number(obj.t1netamt)),
                currency: obj.t1netamt == 0 ? '-' : obj.Currency,
            });
            tableInfo.push({
                key: obj.Currency + obj.t2day,
                date: moment(obj.t2day).format('YYYY.MM.DD'),
                amount: formatNum(Number(obj.t2netamt)),
                currency: obj.t2netamt == 0 ? '-' : obj.Currency,
            });
        }
        return tableInfo;
    };

    //當日的不拿，有值的才拿
    const getStockSummarisePrtlosInfo = function () {
        let tableInfo = [];
        if (typeof summarisePrtlos === 'object' && summarisePrtlos.length !== 0) {
            summarisePrtlos.forEach(obj => {
                tableInfo = tableInfoHandler(obj, tableInfo);
            });

            if (tableInfo.length === 0) {
                return [
                    {
                        key: 0,
                        date: '--',
                        amount: '--',
                        currency: '--',
                    },
                ];
            } else {
                return tableInfo;
            }
        } else {
            return [
                {
                    key: 0,
                    date: '--',
                    amount: '--',
                    currency: '--',
                },
            ];
        }
    };

    const getStockUnrealInfo = () => {
        return unRealPrtlos.length === 0
            ? '--'
            : [
                  {
                      currency: 'NTD',
                      amount: unRealPrtlos[unRealPrtlos.length - 1]?.unreal,
                  },
              ];
    };

    //當日交割款全幣別
    const getStockCurrencyData = () => {
        const currencyInfo = [];
        if (typeof summarisePrtlos === 'object' && summarisePrtlos.length !== 0) {
            summarisePrtlos.forEach(obj => {
                if (obj.tnetamt != 0) {
                    let item = {};
                    item.currency = obj.Currency;
                    item.amount = obj.tnetamt;
                    currencyInfo.push(item);
                }
            });
            // console.log(currencyInfo)
            return currencyInfo;
        } else {
            return [];
        }
    };

    //海外全幣別未實現損益
    const getSBCurrencyData = () => {
        const currencyInfo = [];
        if (SBunRealPrtlos.sum_data != null && SBunRealPrtlos.sum_data.length !== 0) {
            SBunRealPrtlos.sum_data.forEach(obj => {
                let item = {};
                item.currency = obj.curr;
                item.amount = obj.sum_amt;
                currencyInfo.push(item);
            });
            return currencyInfo;
        } else {
            return [];
        }
    };

    //海外交割試算
    const getDeliveryCurrencyData = () => {
        const currencyInfo = [];

        if (SBdeliveryTrial.sum_data != null && SBdeliveryTrial.sum_data.length !== 0) {
            SBdeliveryTrial.sum_data.forEach((obj, index) => {
                let item = {
                    key: index,
                    date: moment().format('YYYY.MM.DD'),
                    currency: obj.curr,
                    amount: obj.sum_net,
                };
                currencyInfo.push(item);
            });
            return currencyInfo;
        } else {
            return [];
        }
    };

    // 期權未平倉損益轉成 CurrencyBox 的格式
    const getFutureCurrencyData = openProfitLossSum => {
        return [
            {
                currency: 'NTD',
                amount: openProfitLossSum,
            },
        ];
    };

    if (isError) {
        return (
            <div className="tradingQuickView__container">
                <LastUpdatedTime time={updateDate} handleUpdate={handleUpdateDate} />
                <img className="errImg" src={errImg} alt="永豐金證券" />
                <p className="errMsg">暫時無法取得損益資料</p>
                <style jsx>{`
                    .errImg {
                        display: block;
                        margin: 20px auto;
                        margin-bottom: 10px;
                    }
                    .errMsg {
                        text-align: center;
                    }
                    @media (max-width: 768px) {
                        .errMsg {
                            width: 100%;
                            text-align: center;
                            color: white;
                        }
                    }
                `}</style>
            </div>
        );
    }

    // console.log(unRealPrtlos[unRealPrtlos.length - 1].unreal)
    return (
        <div className="tradingQuickView__container">
            {currentAccount.accttype === 'S' && (
                <>
                    <LastUpdatedTime time={updateDate} handleUpdate={handleUpdateDate} />
                    <StockQuickView
                        unreal={getStockUnrealInfo()}
                        currencyData={getStockCurrencyData()}
                        tableInfo={getStockSummarisePrtlosInfo()}
                    />
                </>
            )}
            {currentAccount.accttype === 'H' && (
                <>
                    <LastUpdatedTime time={updateDate} handleUpdate={handleUpdateDate} />
                    <SBQuickView unreal={getSBCurrencyData()} deliveryTrial={getDeliveryCurrencyData()} />
                </>
            )}
            {currentAccount.accttype === 'F' && (
                <>
                    <LastUpdatedTime time={updateDate} handleUpdate={handleUpdateDate} />
                    <FutureQuickView openProfitLoss={getFutureCurrencyData(openProfitLossSum)} />
                </>
            )}
        </div>
    );
};
