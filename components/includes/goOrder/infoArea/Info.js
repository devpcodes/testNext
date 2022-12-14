import { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Button } from 'antd';
import { trim } from 'lodash';
import { useRouter } from 'next/router';

import { Search } from '../search/Search';
import { TextBox } from './TextBox';

import { InfoBox } from './InfoBox';
import { objectToQueryHandler } from '../../../../services/objectToQueryHandler';
import AddSelectStock from '../../editSelfSelectGroupBox/AddSelectStock';

import {
    priceColor,
    getArrow,
    toDecimal,
    formatPriceByUnit,
    trimMinus,
    simTradeHandler,
} from '../../../../services/numFormat';
import {
    setBs,
    setCode,
    setLot,
    setProductInfo,
    setSelectInfo,
    setDefaultOrdPrice,
    setOrdQty,
    setTradeTime,
    setT30,
    setCheckLot,
    setConfirmBoxOpen,
    setType,
} from '../../../../store/goOrder/action';

// import share from '../../../../resources/images/components/goOrder/basic-share-outline.svg';
import search from '../../../../resources/images/components/goOrder/edit-search.svg';

import theme from '../../../../resources/styles/theme';
import { marketIdToMarket } from '../../../../services/stock/marketIdToMarket';
import icon from '../../../../resources/images/components/goOrder/ic-trending-up.svg';
import { fetchCheckTradingDate } from '../../../../services/components/goOrder/fetchCheckTradingDate';
import { fetchCheckSelfSelect } from '../../../../services/selfSelect/checkSelectStatus';
import { getToken } from '../../../../services/user/accessToken';
import { getSocalToken } from '../../../../services/user/accessToken';
import { InstallWebCA } from './InstallWebCA';
import { fetchStockT30 } from '../../../../services/stock/stockT30Fetcher';

import { checkServer } from '../../../../services/checkServer';
import { getParamFromQueryString } from '../../../../services/getParamFromQueryString';
// import { fetchGetRichClubReport } from '../../../../services/components/richclub/getRichClubReport';
import MoreInfo from './MoreInfo';
import { setSBBs } from '../../../../store/goOrderSB/action';
import AddSelectGroup from '../../selfSelect/AddSelectGroup';

// ??? solace ???????????????????????????????????????????????????????????????????????????
const solaceDataHandler = (solaceData, lot, checkLot) => {
    const code = useSelector(store => store.goOrder.code);
    const isSimTrade =
        lot === 'Odd' && checkLot ? !!solaceData[0]?.data?.OddlotSimtrade : !!solaceData[0]?.data?.Simtrade;

    if (lot === 'Odd' && checkLot) {
        const [
            {
                data: {
                    Name = '', // TODO: ??? Solace ??????????????????????????????????????????????????????????????? `Name` ?????? Solace ???????????????
                    OddlotClose = 0,
                    OddlotDiffPrice = 0,
                    OddlotDiffRate = 0,
                    OddlotSharesSum = 0,
                    OddlotReference = 0,
                } = {},
            } = {},
        ] = solaceData;

        return {
            name: Name,
            close: OddlotClose,
            diffPrice: OddlotDiffPrice,
            diffRate: OddlotDiffRate,
            volSum: OddlotSharesSum,
            reference: OddlotReference,
            isSimTrade,
        };
    } else {
        const [
            { data: { Name = '', Close = [], DiffPrice = [], DiffRate = [], VolSum = [], Reference = 0 } = {} } = {},
        ] = solaceData;

        return {
            name: Name,
            close: Close[0] || 0,
            diffPrice: DiffPrice[0] || 0,
            diffRate: DiffRate[0] || 0,
            volSum: VolSum[0] || 0,
            reference: Reference,
            isSimTrade,
        };
    }
};

// TODO: ??????????????????
export const Info = ({ stockid }) => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isMoreDetailVisitable, setIsMoreDetailVisitable] = useState(false);
    const [isSelfSelectVisitable, setIsSelfSelectVisitable] = useState(false);
    const [hour, setHour] = useState('');
    const [min, setMin] = useState('');
    const [sec, setSec] = useState('');
    const [tradingDate, setTradingDate] = useState('');
    const [reloadLoading, setReloadLoading] = useState(false);
    const [t30Data, setT30Data] = useState(false);
    const [moreItems, setMoreItems] = useState([]);
    const [isAddSelectGroupVisitable, setAddSelectGroupVisitable] = useState(false);

    const dispatch = useDispatch();

    const lot = useSelector(store => store.goOrder.lot);
    const code = useSelector(store => store.goOrder.code);
    const type = useSelector(store => store.goOrder.type);
    const productInfo = useSelector(store => store.goOrder.productInfo);
    const solaceData = useSelector(store => store.solace.solaceData);
    const isLogin = useSelector(store => store.user.isLogin);
    const socalLoginData = useSelector(store => store.user.socalLogin);
    const checkLot = useSelector(store => store.goOrder.checkLot);
    const selectInfo = useSelector(store => store.goOrder.selectInfo);
    const userSettings = useSelector(store => store.user.userSettings);
    const T30 = useSelector(store => store.goOrder.T30Data);
    const checkQuery = useSelector(store => store.goOrder.checkQuery);

    const { close, diffPrice, diffRate, volSum, reference, isSimTrade } = solaceDataHandler(solaceData, lot, checkLot);

    const router = useRouter();
    const init = useRef(false);
    const goCheckLot = useRef(false);
    const checkSolaceConnect = useRef(false);

    //??????????????????????????????????????????querystring????????????????????????????????????
    const initHandler = (() => {
        if (!checkServer()) {
            if (!checkQuery) return;

            const stockid = getParamFromQueryString('stockid');
            const type = getParamFromQueryString('type');
            if (!init.current) {
                if (stockid && (type === 'S' || type == '')) {
                    dispatch(setCode(stockid));
                } else {
                    dispatch(setCode('2890'));
                }
            }

            setTimeout(() => {
                init.current = true;
            }, 1500);
        }
    })();

    useEffect(() => {
        if (router.query.bs != null && !init.current) {
            // ????????????????????????????????????????????????????????????????????????????????????????????????????????????
            if ((router.query.type == null || router.query.type === 'S') && checkQuery) {
                setTimeout(() => {
                    dispatch(setBs(router.query.bs));
                    dispatch(setSBBs(router.query.bs));
                }, 1000);
            }
        }

        if (router.query.price != null) {
            if ((router.query.type == null || router.query.type === 'S') && checkQuery) {
                dispatch(setDefaultOrdPrice(router.query.price));
            }
        }

        if (router.query.qty != null) {
            if ((router.query.type == null || router.query.type === 'S') && checkQuery) {
                dispatch(setOrdQty(router.query.qty));
            }
            if (!checkQuery) {
                dispatch(setOrdQty(1));
            }
        } else {
            if (userSettings.stockOrderUnit != null) {
                dispatch(setOrdQty(userSettings.stockOrderUnit));
            }
        }

        if (router.query.session != null) {
            //????????????
            if (router.query.session === 'C') {
                // TODO ?????????????????????????????????
                checkSolaceConnect.current = true;

                // setTimeout(() => {
                //     dispatch(setLot('Odd'));
                // }, 500);
            }
            //??????????????????????????? ??????2
            if (router.query.session === '2') {
                goCheckLot.current = true;
                dispatch(setTradeTime('after'));
            }
        }
    }, [router, userSettings, checkQuery]);

    // TODO ?????????????????????????????????
    useEffect(() => {
        if (solaceData.length != 0) {
            if (checkSolaceConnect.current) {
                dispatch(setLot('Odd'));
                checkSolaceConnect.current = false;
            }
        }
    }, [solaceData]);

    useEffect(() => {
        dispatch(setConfirmBoxOpen(false));
    }, [type]);

    useEffect(() => {
        if (goCheckLot.current) {
            if (productInfo != null && productInfo.solaceMarket !== '??????') {
                dispatch(setLot('Odd'));
                goCheckLot.current = false;
            }
        }
    }, [productInfo]);

    useEffect(() => {
        if (solaceData.length > 0 && solaceData[0].topic != null) {
            setTimeout(() => {
                setReloadLoading(false);
            }, 100);
            if (solaceData[0].data.Jck1 != null) {
                const marketId = solaceData[0].data.Jck1;
                const market = marketIdToMarket(marketId);
                const solaceName = solaceData[0].data.Name;

                let oldProductInfo = { ...productInfo };
                oldProductInfo.solaceMarket = market;
                oldProductInfo.solaceName = trim(solaceName);
                dispatch(setProductInfo(oldProductInfo));
            }
        }
    }, [solaceData]);

    useEffect(() => {
        let tib = '';
        if (T30?.EXCHANGE === 'OTC' && T30?.STK_CTGCD === '3') {
            tib = '????????????';
            let oldProductInfo = { ...productInfo };
            oldProductInfo.TIB = tib;
            dispatch(setProductInfo(oldProductInfo));
        }
        if (T30?.EXCHANGE === 'TSE' && T30?.STK_CTGCD === '3') {
            tib = '?????????';
            let oldProductInfo = { ...productInfo };
            oldProductInfo.TIB = tib;
            dispatch(setProductInfo(oldProductInfo));
        }
    }, [T30]);

    useEffect(async () => {
        if (code === '') {
            return;
        }
        if (!isLogin) {
            getTimeOver();
        }
    }, [code, lot, isLogin]);

    useEffect(async () => {
        if (!isLogin && Object.keys(socalLoginData).length === 0) {
            return;
        }
        // getSelect();
    }, [T30, isLogin, isSelfSelectVisitable]);

    useEffect(async () => {
        if (!code) {
            return;
        }
        await setInfoItems(code);
    }, [code]);

    useEffect(() => {
        if (selectInfo) {
            reloadSelfSelectSmallIcon();
        }
    }, [selectInfo]);

    // ??????????????????
    setTimeout(() => {
        reloadSelfSelectSmallIcon();
    }, 200);

    const closeAddSelfGroup = useCallback(() => {
        setAddSelectGroupVisitable(false);
        setIsSelfSelectVisitable(true);
    }, []);

    const openAddSelfGroup = useCallback(() => {
        setAddSelectGroupVisitable(true);
    }, []);
    const reload = () => {};
    const reloadTabkey = () => {};

    const updateQueryStringParameter = (uri, key, value) => {
        var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
        var separator = uri.indexOf('?') !== -1 ? '&' : '?';
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + '=' + value + '$2');
        } else {
            return uri + separator + key + '=' + value;
        }
    };

    const loginClickHandler = () => {
        const query = router.query;
        let queryStr = objectToQueryHandler(query);
        if (code) {
            queryStr = updateQueryStringParameter(queryStr, 'stockid', code);
        }
        window.location =
            `${process.env.NEXT_PUBLIC_SUBPATH}` +
            `/SinoTrade_login${queryStr}` +
            `${queryStr ? '&' : '?'}` +
            'redirectUrl=OrderGO';
    };

    const reloadSelfSelectSmallIcon = useCallback(() => {
        const cloneMoreItems = JSON.parse(JSON.stringify(moreItems));
        const index = cloneMoreItems.findIndex(obj => obj.id === '4');
        if (cloneMoreItems[index]) {
            if (selectInfo && selectInfo.isExist) {
                cloneMoreItems[index].text = '??? 222';
            } else {
                cloneMoreItems[index].text = '+ 222';
            }
            setMoreItems(cloneMoreItems);
        }
    });

    const lotHandler = () => {
        const nextLot = lot === 'Board' ? 'Odd' : 'Board';
        dispatch(setLot(nextLot));
    };

    const showSearch = () => {
        setIsSearchVisible(true);
    };

    const handleCancel = useCallback(() => {
        setIsSearchVisible(false);
    }, []);

    const lotWidthHandler = () => {
        // if (productInfo?.solaceMarket && productInfo.solaceMarket !== '??????' && productInfo.solaceMarket !== '??????') {
        //     return { width: '44px' };
        // } else {
        //     return { width: '22px' };
        // }
        //
        if (checkLot) {
            return { width: '44px' };
        } else {
            return { width: '22px' };
        }
    };

    // const shareHandler = () => {
    //     console.log('share!!!');
    // };

    const setMoreDetailIsVisitable = () => {
        isMoreDetailVisitable ? setIsMoreDetailVisitable(false) : setIsMoreDetailVisitable(true);
    };

    const showSelfSelect = () => {
        setIsSelfSelectVisitable(true);
    };

    const closeSelfSelect = useCallback(() => {
        setIsSelfSelectVisitable(false);
    }, []);

    const reloadHandler = () => {
        setReloadLoading(true);
        dispatch(setCode(''));
        setTimeout(() => {
            dispatch(setCode(code));
        }, 100);
    };

    const getTimeOver = async () => {
        const currentDate = moment().format('YYYYMMDD');
        const res = await fetchCheckTradingDate(currentDate);
        if (res.result.hasTrading) {
            setTradingDate(true);
            setHour(res.result.remainingTime.hours);
            setMin(res.result.remainingTime.minutes);
            setSec(res.result.remainingTime.seconds);
        } else {
            setTradingDate(false);
        }
    };

    const getSelect = useCallback(async () => {
        let exchange;
        const isSocalLogin = Object.keys(socalLoginData).length > 0 ? true : false;
        switch (type) {
            case 'S':
                exchange = T30.EXCHANGE ? T30.EXCHANGE : 'OES';
                break;
            default:
                break;
        }
        const reqData = {
            symbol: code,
            exchange: exchange,
            market: type,
            isShowDetail: true,
            isSocalLogin: isSocalLogin,
            token: isSocalLogin ? getSocalToken() : getToken(),
        };
        const res = await fetchCheckSelfSelect(reqData);
        dispatch(setSelectInfo(res));
    });

    const getTimeWording = (hour, min, sec) => {
        if (!tradingDate) {
            return '??????????????????';
        }

        if ((hour === '' && min === '' && sec === '') || tradingDate === '') {
            return '';
        }
        if (hour == '0' && min == '0' && sec == '0') {
            return '???????????????';
        }
        if (hour == '0' && min == '0' && sec != '0') {
            return `????????????????????????${sec}??????`;
        }
        if (hour != '0' || min != '0') {
            return `????????????????????????${hour}??????${min}??????`;
        }
    };

    const getCloseInfo = (close, isSimTrade, diffPrice, reference, diffRate) => {
        if (close === 0) {
            return '--';
        }
        return `${simTradeHandler(formatPriceByUnit(code, close), isSimTrade)} ${getArrow(
            close,
            reference,
        )} ${simTradeHandler(trimMinus(toDecimal(diffPrice)), isSimTrade)} (${trimMinus(toDecimal(diffRate))}%)`;
    };

    const getVolume = volSum => {
        if (volSum === 0) {
            return '?????? --';
        }
        return `?????? ${volSum}`;
    };

    const setInfoItems = async code => {
        // const t30Res = await fetchStockT30(code);
        // dispatch(setT30(t30Res));

        let moreItems = [
            {
                id: '1',
                color: 'red',
                text: '???',
                title: '????????????',
                desc: '?????????????????????',
                inInfoBox: true,
                link: `${process.env.NEXT_PUBLIC_SUBPATH}/TradingCenter_TWStocks_Stock/?code=${code}`,
            },
            {
                id: '2',
                color: 'orange',
                text: '???',
                title: '?????????',
                desc: '?????????????????????',
                inInfoBox: true,
                link: `https://aiinvest.sinotrade.com.tw/Product/In?id=${code}`,
            },
            {
                id: '3',
                color: 'blue',
                text: '???',
                title: '????????????',
                desc: '????????????????????????',
                inInfoBox: true,
                link: `https://www.sinotrade.com.tw/richclub/stock?code=${code}`,
            },
            { id: '4', color: 'brown', text: '+ ??????', title: '', desc: '', inInfoBox: false, link: '' },
        ];

        // if (![t30Res['?????????'], t30Res['?????????'], t30Res['?????????'], t30Res['?????????']].some(el => el == null)) {
        //     moreItems.unshift({ id: '5', color: 'dark', text: '???', title: '', desc: '', inInfoBox: false, link: '' });
        // }
        // setT30Data(t30Res);
        setMoreItems(moreItems);
    };

    return (
        <div className="info__container">
            {!isLogin && (
                <div className="noLogin__box">
                    {hour !== '' && <img className="noLoginIcon" src={icon} />}
                    <span className="endTime">{getTimeWording(hour, min, sec)}</span>
                    <Button
                        style={{
                            width: '70px',
                            height: '28px',
                            margin: '0 0 0 9px',
                            padding: '4px 1px 4px 2px',
                            borderRadius: '2px',
                            backgroundColor: '#254a91',
                            color: 'white',
                            position: 'absolute',
                            right: '16px',
                            top: '8px',
                            border: 'none',
                        }}
                        loading={reloadLoading}
                        onClick={() => {
                            reloadHandler();
                        }}
                    >
                        ??????
                    </Button>
                </div>
            )}
            {<InstallWebCA />}
            <div className="info__box">
                <div className="row">
                    <div className="product__container">
                        <div
                            className="product__name"
                            style={{
                                fontSize: trim(productInfo?.solaceName).length >= 5 ? '2rem' : '2.6rem',
                            }}
                        >
                            {trim(productInfo?.solaceName)}
                        </div>
                        <div className="product__code">{code || stockid || '2890'}</div>
                    </div>
                    <div className="toolbar__container">
                        {/* <button className="share" onClick={shareHandler}>
                            <img src={share} alt="share"></img>
                        </button> */}
                        <button className="search" onClick={showSearch}>
                            <img src={search} alt="search"></img>
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="price__container">
                        {getCloseInfo(close, isSimTrade, diffPrice, reference, diffRate)}
                    </div>
                    <div className="volume__container">
                        <div className="volume">{getVolume(volSum)}</div>
                        <div className="unit">{lot === 'Odd' ? '???' : '???'}</div>
                    </div>
                </div>
                {/* <div className="row">
                    <div className="market__container">
                        <button className="lot__box" onClick={lotHandler} style={lotWidthHandler()}>
                            <div className="box board">???</div>
                            {checkLot && <div className="box odd">???</div>}
                        </button>
                        {productInfo?.solaceMarket != null && (
                            <div className="market__box">{productInfo.TIB || productInfo.solaceMarket}</div>
                        )}
                        <div className="market__box">{productInfo?.TIB || productInfo?.solaceMarket}</div>
                    </div>
                    <div className="more__container" onClick={setMoreDetailIsVisitable}>
                        {moreItems.map(item => (
                            <TextBox key={item.id} color={item.color} text={item.text} />
                        ))}
                    </div>
                </div>  */}
                <MoreInfo isMoreDetailVisitable={isMoreDetailVisitable}>
                    <div className="market__container">
                        <button className="lot__box" onClick={lotHandler} style={lotWidthHandler()}>
                            <div className="box board">???</div>
                            {checkLot && <div className="box odd">???</div>}
                            {/* {productInfo?.solaceMarket &&
                                productInfo.solaceMarket !== '??????' &&
                                productInfo.solaceMarket !== '??????' && <div className="box odd">???</div>} */}
                        </button>
                        {/* {productInfo?.solaceMarket != null && (
                            <div className="market__box">{productInfo.TIB || productInfo.solaceMarket}</div>
                        )} */}
                        <div className="market__box">{productInfo?.TIB || productInfo?.solaceMarket}</div>
                    </div>
                </MoreInfo>
            </div>

            <div className="more__info__container">
                <div className="information__box">
                    <InfoBox code={code} t30Data={t30Data} moreItems={moreItems} />
                    <button
                        className="btn add__self__select"
                        onClick={isLogin || Object.keys(socalLoginData).length > 0 ? showSelfSelect : loginClickHandler}
                    >
                        {isLogin ? (!!selectInfo && selectInfo.isExist ? '????????????' : '????????????') : '????????????'}
                    </button>
                </div>
            </div>
            <div className="page__mask"></div>
            <Search isVisible={isSearchVisible} handleCancel={handleCancel} />
            <AddSelectStock
                isVisible={isSelfSelectVisitable}
                handleClose={closeSelfSelect}
                addSelectGroupWindowOpen={openAddSelfGroup}
            />
            <AddSelectGroup
                isAddSelectGroupVisitable={isAddSelectGroupVisitable}
                handleClose={closeAddSelfGroup}
                callBack={reload}
                reloadTabkey={reloadTabkey}
            />
            <style jsx>{`
                .noLogin__box {
                    height: 44px;
                    background-color: #e6ebf5;
                    position: relative;
                }
                .noLoginIcon {
                    margin-left: 16px;
                }
                .warningIcon {
                    margin-left: 16px;
                    margin-top: -1px;
                }
                .endTime {
                    color: #254a91;
                    font-size: 1.4rem;
                    display: inline-block;
                    line-height: 44px;
                    margin-left: 8px;
                }
                button {
                    border: none;
                    padding: 0;
                    background-color: inherit;
                }
                .info__container {
                    margin: 0;
                    font-weight: 600;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                }
                .info__box {
                    margin: 16px;
                    margin-top: 14px;
                }
                .row {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                }
                .row ~ .row {
                    margin-top: 8px;
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
                    font-size: 1.8rem;
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
                .price__container {
                    display: flex;
                    align-items: flex-end;
                    max-width: calc((8 / 12) * 100%);
                    color: ${priceColor(close, reference)};
                    font-size: 2rem;
                }
                @media (max-width: 340px), print {
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
                @media (max-width: 340px), print {
                    .volume__container .volume {
                        font-size: 1.4rem;
                    }
                }
                .volume__container .unit {
                    font-size: 1.2rem;
                    font-weight: 500;
                    margin: 0 0 2px 4px;
                }
                @media (max-width: 340px), print {
                    .volume__container .unit {
                        margin: 0 0 0 4px;
                    }
                }
                .market__container {
                    display: flex;
                    align-items: flex-end;
                    max-width: calc((4 / 12) * 100%);
                    font-size: 1.5rem;
                    font-weight: 500;
                }
                button.lot__box {
                    width: 44px;
                    height: 22px;
                    border-radius: 2px;
                    background-color: ${lot === 'Odd' && checkLot ? '#f5e8d7' : theme.colors.normalBg};
                }
                .lot__box .box {
                    display: inline-block;
                    padding: 1px 3px 1px 4px;
                    width: 22px;
                    height: 22px;
                    border-radius: 2px;
                }
                .lot__box .box.board {
                    background-color: ${lot === 'Odd' && checkLot ? 'inherit' : '#0d1623'};
                    color: ${lot === 'Odd' && checkLot ? theme.colors.secondary : theme.colors.text};
                }
                .lot__box .box.odd {
                    background-color: ${lot === 'Odd' ? theme.colors.secondary : 'inherit'};
                    color: ${lot === 'Odd' && checkLot ? theme.colors.text : '#a9b6cb'};
                }
                .market__box {
                    /* width: 42px; */
                    height: 22px;
                    margin-left: 4px;
                    padding: 1px 6px;
                    border-radius: 2px;
                    background-color: ${theme.colors.normalBg};
                    color: ${theme.colors.darkBg};
                }
                .more__container {
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-end;
                    max-width: calc((8 / 12) * 100%);
                    font-size: 1.5rem;
                    font-weight: 500;
                    position: relative;
                    cursor: pointer;
                }
                .more__info__container {
                    background: #fff;
                    display: block;
                    left: 0;
                    position: absolute;
                    padding: 0 16px 12px 16px;
                    width: 100%;
                    z-index: 1300;
                    display: ${isMoreDetailVisitable === false ? 'none' : 'block'};
                }
                .more__info__container .information__box {
                    padding-top: 12px;
                    border-top: 1px solid #0d1623;
                }
                .more__info__container .add__self__select {
                    width: 100%;
                    height: 52px;
                    border-radius: 2px;
                    background-color: #c43826;
                    color: #fff;
                    font-size: 1.6rem;
                }
                .more__info__container .add__self__select:disabled {
                    color: rgba(0, 0, 0, 0.25);
                    background: #f5f5f5;
                    border: 1px solid #d9d9d9;
                    cursor: no-drop;
                }
                .page__mask {
                    position: fixed;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    z-index: 1200;
                    height: calc(100% - 230px);
                    background-color: rgb(0 0 0 / 30%);
                    display: ${isMoreDetailVisitable === false ? 'none' : 'block'};
                }
            `}</style>
            <style jsx global>{`
                // ???????????????
                .add__self__select,
                .text__box.brown {
                    display: none !important;
                }

                .ant-modal-wrap {
                    z-index: 15001;
                }
                .ant-modal-mask {
                    z-index: 15000;
                }
            `}</style>
        </div>
    );
};
