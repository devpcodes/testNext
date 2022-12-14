import { useState, useCallback, useEffect, useRef } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import theme from '../../../../resources/styles/theme';
import { getArrow, priceColor } from '../../../../services/numFormat';
import searchIcon from '../../../../resources/images/components/goOrder/edit-search.svg';
import MoreInfo from '../infoArea/MoreInfo';
import { getMarketType, Search } from '../search/Search';
import { InstallWebCA } from '../infoArea/InstallWebCA';
import UpdateBar from './UpdateBar';
import { getToken } from '../../../../services/user/accessToken';
import { fetchGetQuote } from '../../../../services/components/goOrder/sb/fetchGetQuote';
import { setBs, setCode, setProductInfo } from '../../../../store/goOrder/action';
import { getCodeType, marketName } from '../../../../services/components/goOrder/sb/dataMapping';
import {
    setConfirmBoxOpen,
    setGtc,
    setGtcDate,
    setQueryPrice,
    setQueryQty,
    setQuote,
    setRealTimeUser,
    setRefreshCode,
    setRic,
    setSBBs,
    setStockInfo,
} from '../../../../store/goOrderSB/action';
import { insert } from '../../../../services/stringFormat';
import { fetchPs } from '../../../../services/components/goOrder/sb/fetchPs';
import { postStockInfo } from '../../../../services/components/goOrder/sb/postStockInfo';
import { checkRealtimeMarket } from '../../../../services/components/goOrder/sb/checkRealtimeMarket';
import { fetchProducts } from '../../../../services/components/goOrder/productFetcher';
import { clearComma } from '../../../../services/components/goOrder/sb/clearComma';
import { useOpenAccountUrl } from '../../../../hooks/useOpenAccountUrl';
import { setModal } from '../../../../store/components/layouts/action';
import { checkLogin } from '../../../../services/components/layouts/checkLogin';
import { objectToQueryHandler } from '../../../../services/objectToQueryHandler';

export const defaultProductInfo = {
    symbol: 'AAPL',
    name: 'Apple',
    market: 'US',
    marketType: 'SB',
    exchange: 'NASDAQ',
};
const Info = ({ stockid }) => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const productInfo = useSelector(store => store.goOrder.productInfo);
    const code = useSelector(store => store.goOrder.code);
    const type = useSelector(store => store.goOrder.type);
    const quote = useSelector(store => store.goOrderSB.quote);
    const ric = useSelector(store => store.goOrderSB.ric);
    const stockInfo = useSelector(store => store.goOrderSB.stockInfo);
    const currentAccount = useSelector(store => store.user.currentAccount);
    const refresh = useSelector(store => store.goOrderSB.refresh);
    const refreshCode = useSelector(store => store.goOrderSB.refreshCode);
    const realTimeUser = useSelector(store => store.goOrderSB.realTimeUser);
    const dispatch = useDispatch();
    const [checkCA, setCheckCA] = useState(false);
    const [label, setLabel] = useState('');
    const router = useRouter();
    const init = useRef(false);
    const timer = useRef(null);
    const openAccountUrl = useOpenAccountUrl();
    useEffect(() => {
        return () => {
            if (timer?.current) {
                window.clearInterval(timer.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!checkLogin()) {
            dispatch(
                setModal({
                    visible: true,
                    title: '??????',
                    content: (
                        <div style={{ color: '#3f5372', fontSize: '1.6rem' }}>
                            ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                        </div>
                    ),
                    type: 'confirm',
                    titleIcon: false,
                    footer: (
                        <div>
                            <Button
                                style={{ width: '48%', height: '44px', borderRadius: '3px', fontSize: '1.6rem' }}
                                onClick={openAccountHandler.bind(null, openAccountUrl)}
                            >
                                ????????????
                            </Button>
                            <Button
                                style={{ width: '48%', height: '44px', borderRadius: '3px', fontSize: '1.6rem' }}
                                type="primary"
                                onClick={loginHandler}
                            >
                                ??????
                            </Button>
                        </div>
                    ),
                }),
            );
        }
    }, [openAccountUrl]);

    const loginHandler = () => {
        const query = router.query;
        const queryStr = objectToQueryHandler(query);
        window.location =
            `${process.env.NEXT_PUBLIC_SUBPATH}` +
            `/SinoTrade_login${queryStr}` +
            `${queryStr ? '&' : '?'}` +
            `redirectUrl=${router.pathname}`;
    };

    const openAccountHandler = url => {
        window.open(url);
    };

    useEffect(() => {
        if (!init.current) {
            if (router?.query?.price && router?.query?.type === 'H') {
                dispatch(setQueryPrice(router.query.price));
            }
            if (router?.query?.qty && router?.query?.type === 'H') {
                dispatch(setQueryQty(router.query.qty));
            }
            if (router?.query?.bs && router?.query?.type === 'H') {
                dispatch(setSBBs(router?.query?.bs));
                dispatch(setBs(router?.query?.bs));
            }
        }
    }, [router.query]);

    useEffect(() => {
        if (type === 'H' && stockid) {
            getProductData(stockid, type);
        }
    }, [stockid, type]);

    useEffect(() => {
        if (refreshCode != '') {
            getProductData(refreshCode, 'H');
        }
    }, [refreshCode]);

    useEffect(() => {
        dispatch(setProductInfo(defaultProductInfo));
        dispatch(setConfirmBoxOpen(false));
    }, [type]);

    useEffect(() => {
        dispatch(setQuote({}));
        dispatch(setStockInfo({}));
        dispatch(setRic(''));
        dispatch(setGtc(false));
        dispatch(setGtcDate(''));
        if (timer?.current) {
            window.clearInterval(timer.current);
        }
        // getRic(code);
    }, [code, type]);

    useEffect(() => {
        if (ric === 'error') {
            dispatch(setQuote({}));
        }
    }, [ric]);

    useEffect(() => {
        if (code != productInfo?.symbol) {
            return;
        }
        if (productInfo.market != null) {
            if (marketName(productInfo.market).label != null) {
                setLabel(marketName(productInfo.market).label);
            }
            if (checkRealtimeMarket(productInfo.market)) {
                if (checkLogin()) {
                    getRic(code);
                }
            }
            getStockInfo(currentAccount, productInfo.market);
        }
    }, [productInfo, currentAccount, code]);

    useEffect(() => {
        if (checkRealtimeMarket(productInfo.market) && realTimeUser) {
            if (timer?.current) {
                window.clearInterval(timer.current);
            }
            timer.current = window.setInterval(() => {
                getData(ric);
                // dispatch(setRefreshCode(productInfo?.symbol));
            }, 3000);
        }
    }, [productInfo, realTimeUser, ric]);

    const getProductData = async (stockid, type) => {
        const data = {
            query: stockid,
            marketType: [getMarketType(type)],
            limit: 1,
            isOrder: true,
        };
        try {
            const { result } = await fetchProducts(data);
            console.log('res', result);
            if (result[0].symbol === stockid) {
                dispatch(setProductInfo(result[0]));
                dispatch(setCode(stockid));
            } else {
                dispatch(setProductInfo(defaultProductInfo));
            }
        } catch (error) {
            console.error(`fetchProducts-error:`, error);
        }
        dispatch(setRefreshCode(''));
    };

    const getRic = async code => {
        try {
            const res = await fetchPs(code);
            if (res.ric != null) {
                dispatch(setRic(res.ric));
                getData(res.ric);
            }
        } catch (error) {
            console.log('error...');
            dispatch(setRic('error'));
        }
    };

    const getStockInfo = async (currentAccount, market) => {
        if (getToken()) {
            let AID = null;
            if (currentAccount != null && currentAccount.broker_id != null && currentAccount.accttype === 'H') {
                AID = currentAccount.broker_id + currentAccount.account;
            }
            const Exchid = market;
            const stockID = code;
            const token = getToken();
            const stockInfoData = await postStockInfo({ AID, Exchid, stockID, token });
            dispatch(setStockInfo(stockInfoData));
        }
    };

    const getData = useCallback(async code => {
        const token = getToken();
        try {
            const res = await fetchGetQuote(code, token);
            clearComma(res);
            if (res?.dc === 'realStream') {
                //realStream
                dispatch(setRealTimeUser(true));
            }
            console.log('res', res);
            dispatch(setQuote(res));
        } catch (error) {
            console.log(error);
        }
    });

    const getCloseInfo = () => {
        if (productInfo.market != null && checkRealtimeMarket(productInfo.market)) {
            let nc = '';
            let pc = '';
            if (quote?.nc != null) {
                nc = Math.abs(Number(quote.nc));
            }
            if (quote?.pc != null) {
                pc = Math.abs(Number(quote.pc));
            }
            if (quote?.ls == null) {
                return '--';
            }
            if (isNaN(nc) || isNaN(pc)) {
                return `${isNaN(parseFloat(quote.ls)) ? '' : parseFloat(quote.ls)}`;
            } else {
                return `${isNaN(parseFloat(quote.ls)) ? '' : parseFloat(quote.ls)} ${getArrow(
                    quote?.ls,
                    quote?.refprice,
                )} ${nc} (${pc}%)`;
            }
        } else {
            return (
                <>
                    <span
                        style={{
                            color: '#8e8e8e',
                            fontWeight: 500,
                            marginTop: '-5px',
                        }}
                    >
                        ??????&nbsp;&nbsp;
                    </span>
                    <span>{parseFloat(stockInfo['@refPrice']) || parseFloat(stockInfo['@PreClose']) || '--'}</span>
                </>
            );
        }
    };

    const getVolume = useCallback(() => {
        if (quote?.vo == null || quote.vo === '-') {
            return '--';
        } else {
            quote.vo = quote.vo.split(',').join('');
            return Math.round(Number(quote.vo) / 10000);
        }
    }, [quote]);

    const handleCancel = useCallback(() => {
        setIsSearchVisible(false);
    }, []);
    const searchHandler = useCallback(() => {
        setIsSearchVisible(true);
    }, []);
    const getCheckCA = useCallback(boo => {
        setCheckCA(boo);
    });
    const getTime = () => {
        if (productInfo.market != null && checkRealtimeMarket(productInfo.market)) {
            if (quote?.td != null) {
                let td = '';
                let tm = '';
                if (quote.td) {
                    td = quote.td.substr(4);
                    td = insert(td, 2, '.');
                }
                if (quote.tm) {
                    tm = insert(quote.tm, 2, ':');
                }
                let info = '?????????';
                if (quote?.dc === 'realStream' || quote?.dc === 'real') {
                    info = '????????????';
                }
                if (quote?.dc === 'delay') {
                    info = '??????15???';
                }
                //info = quote?.dc === 'realStream' && '????????????';
                // info = quote?.dc === 'delay' && '??????15???';
                return td + ' ' + tm + ' ' + info;
            } else {
                return '';
            }
        } else {
            let td = '';
            if (stockInfo['@preTDate']) {
                td = stockInfo['@preTDate'].substr(4);
                td = insert(td, 2, '.');
            }
            return td ? td + ' ???????????????' : '';
        }
    };
    return (
        <>
            <InstallWebCA getCheckCA={getCheckCA} />
            {checkCA && <UpdateBar text={'????????????????????????????????????'} />}
            {/* <UpdateBar text={'????????????????????????????????????'} /> */}
            <div className="info__container">
                <div className="info__box">
                    <div className="row">
                        <div className="product__container">
                            <div
                                className="product__name"
                                style={{
                                    fontSize: '2.6rem',
                                }}
                            >
                                {productInfo.marketType === 'SB' ? productInfo.symbol : defaultProductInfo.symbol}
                            </div>
                            <div className="product__code">
                                {productInfo.marketType === 'SB' ? productInfo.name : defaultProductInfo.name}
                            </div>
                        </div>
                        <div className="toolbar__container">
                            {/* <button className="share" onClick={shareHandler}>
                                <img src={share} alt="share"></img>
                            </button> */}
                            <button className="search" onClick={searchHandler}>
                                <img src={searchIcon} alt="search"></img>
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="price__container">{getCloseInfo()}</div>
                        <div className="volume__container">
                            <div className="volume">?????? {getVolume()}</div>
                            <div className="unit">??????</div>
                        </div>
                    </div>
                    <MoreInfo>
                        <div className="market__container">
                            <span className="market">{label ? label : ''}</span>
                            <span className="close__info">{getTime()}</span>
                        </div>
                    </MoreInfo>
                </div>
            </div>
            <Search isVisible={isSearchVisible} handleCancel={handleCancel} />
            <style jsx>{`
                .row {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                }
                .row ~ .row {
                    margin-top: 8px;
                }
                .info__box {
                    margin: 16px;
                    margin-top: 14px;
                }
                .info__container {
                    margin: 0;
                    font-weight: 600;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                }
                .product__container {
                    display: flex;
                    align-items: flex-end;
                    max-width: calc((9 / 12) * 100%);
                    color: ${theme.colors.darkBg};
                }
                .product__name {
                    font-size: 2.6rem;
                }
                .product__code {
                    font-size: 1.4rem;
                    margin-left: 1.2rem;
                }
                .toolbar__container {
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-end;
                    max-width: calc((3 / 12) * 100%);
                }
                .toolbar__container .search {
                    margin-left: 1rem;
                }
                button {
                    border: none;
                    padding: 0;
                    background-color: inherit;
                }
                .price__container {
                    display: flex;
                    align-items: flex-end;
                    max-width: calc((8 / 12) * 100%);

                    /* color: rgb(196, 56, 38);
                     */
                    color: ${priceColor(quote?.ls, quote?.refprice)};
                    font-size: 2rem;
                }
                @media (max-width: 340px) {
                    .price__container {
                        font-size: 1.8rem;
                    }
                }
                .volume__container {
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-end;
                    max-width: calc((5 / 12) * 100%);
                    color: ${theme.colors.darkBg};
                }
                .volume__container .volume {
                    font-size: 1.6rem;
                }
                @media (max-width: 340px) {
                    .volume__container .volume {
                        font-size: 1.4rem;
                    }
                }
                .volume__container .unit {
                    font-size: 1.2rem;
                    font-weight: 500;
                    margin: 0 0 2px 4px;
                }
                @media (max-width: 340px) {
                    .volume__container .unit {
                        margin: 0 0 0 4px;
                    }
                }
                .market {
                    display: inline-block;
                    color: #0d1623;
                    font-size: 1.5rem;
                    padding: 0 6px 1px;
                    border-radius: 2px;
                    background-color: #e6ebf5;
                    /* width: 42px; */
                    height: 22px;
                }
                .close__info {
                    color: #0d1623;
                    font-size: 1.5rem;
                    margin-left: 8px;
                }
            `}</style>
        </>
    );
};

export default Info;
