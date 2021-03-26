import { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Button } from 'antd';
import { trim } from 'lodash';
import { useRouter } from 'next/router';

import { Search } from '../search/Search';
import { TextBox } from './TextBox';
import AddSelectStock from '../selfSelectStock/AddSelectStock';

import {
    priceColor,
    getArrow,
    toDecimal,
    formatPrice,
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
} from '../../../../store/goOrder/action';

import share from '../../../../resources/images/components/goOrder/basic-share-outline.svg';
import search from '../../../../resources/images/components/goOrder/edit-search.svg';

import theme from '../../../../resources/styles/theme';
import { marketIdToMarket } from '../../../../services/stock/marketIdToMarket';
import icon from '../../../../resources/images/components/goOrder/ic-trending-up.svg';
import { fetchCheckTradingDate } from '../../../../services/components/goOrder/fetchCheckTradingDate';
import { fetchCheckSelfSelect } from '../../../../services/selfSelect/checkSelectStatus';
import { getToken } from '../../../../services/user/accessToken';
import { getSocalToken } from '../../../../services/user/accessToken';
import { InstallWebCA } from './InstallWebCA';

import { checkServer } from '../../../../services/checkServer';
import { getParamFromQueryString } from '../../../../services/getParamFromQueryString';
// TODO: 暫時寫死，需發 API 查詢相關資料顯示
const moreItems = [
    { id: '1', color: 'dark', text: '融' },
    // { id: '2', color: 'red', text: '詳' },
    { id: '3', color: 'orange', text: '存' },
    // { id: '4', color: 'green', text: '借' },
    { id: '5', color: 'blue', text: '學' },
    { id: '6', color: 'brown', text: '+ 自選' },
];

// 因 solace 定義的資料結構較雜亂，需要小心處理初始值及預設型態
const solaceDataHandler = (solaceData, lot, checkLot) => {
    const code = useSelector(store => store.goOrder.code);
    const isSimTrade =
        lot === 'Odd' && checkLot ? !!solaceData[0]?.data?.OddlotSimtrade : !!solaceData[0]?.data?.Simtrade;

    if (lot === 'Odd' && checkLot) {
        const [
            {
                data: {
                    Name = '', // TODO: 等 Solace 提供零股中文名欄位時要補上，解構出的名稱由 `Name` 改為 Solace 定義的名稱
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

// TODO: 零股顯示價差
export const Info = ({ stockid }) => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isMoreDetailVisitable, setIsMoreDetailVisitable] = useState(false);
    const [isSelfSelectVisitable, setIsSelfSelectVisitable] = useState(false);
    const [hour, setHour] = useState('');
    const [min, setMin] = useState('');
    const [sec, setSec] = useState('');
    const [tradingDate, setTradingDate] = useState('');
    const [reloadLoading, setReloadLoading] = useState(false);

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

    const { close, diffPrice, diffRate, volSum, reference, isSimTrade } = solaceDataHandler(solaceData, lot, checkLot);

    const router = useRouter();
    const init = useRef(false);
    const goCheckLot = useRef(false);
    const checkSolaceConnect = useRef(false);
    //避免畫面先初始在永豐金再跳回querystring的股票代碼，導致畫面閃礫
    const initHandler = (() => {
        if (!checkServer()) {
            const stockid = getParamFromQueryString('stockid');
            if (!init.current) {
                if (stockid) {
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
            // 因為畫面整個與預設畫面不同，所以延遲作業，避免一次處理太多事情，影響效能
            setTimeout(() => {
                dispatch(setBs(router.query.bs));
            }, 1000);
        }

        if (router.query.price != null) {
            dispatch(setDefaultOrdPrice(router.query.price));
        }

        if (router.query.qty != null) {
            dispatch(setOrdQty(router.query.qty));
        } else {
            if (userSettings.stockOrderUnit != null) {
                dispatch(setOrdQty(userSettings.stockOrderUnit));
            }
        }

        if (router.query.session != null) {
            //盤中零股
            if (router.query.session === 'C') {
                // TODO 零股資料完整後可以替換
                checkSolaceConnect.current = true;

                // setTimeout(() => {
                //     dispatch(setLot('Odd'));
                // }, 500);
            }
            //盤後零股和興櫃盤後 都是2
            if (router.query.session === '2') {
                goCheckLot.current = true;
                dispatch(setTradeTime('after'));
            }
        }
    }, [router, userSettings]);

    // TODO 零股資料完整後可以刪掉
    useEffect(() => {
        if (solaceData.length != 0) {
            if (checkSolaceConnect.current) {
                dispatch(setLot('Odd'));
                checkSolaceConnect.current = false;
            }
        }
    }, [solaceData]);

    useEffect(() => {
        if (goCheckLot.current) {
            if (productInfo != null && productInfo.solaceMarket !== '興櫃') {
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

    useEffect(async () => {
        if (code === '') {
            return;
        }
        if (!isLogin) {
            getTimeOver();
        }
    }, [code, lot, isLogin]);

    useEffect(async () => {
        if (!isLogin && socalLoginData.length === 0) {
            return;
        }
        getSelect();
    }, [code, isLogin, isSelfSelectVisitable]);

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
        if (productInfo?.solaceMarket && productInfo.solaceMarket !== '興櫃' && productInfo.solaceMarket !== '權證') {
            return { width: '44px' };
        } else {
            return { width: '22px' };
        }
    };

    const shareHandler = () => {
        console.log('share!!!');
    };

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
        const isSocalLogin = socalLoginData.length > 0 ? true : false;
        switch (type) {
            case 'S':
                exchange = 'TAI';
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
            return '非台股交易日';
        }

        if ((hour === '' && min === '' && sec === '') || tradingDate === '') {
            return '';
        }
        if (hour == '0' && min == '0' && sec == '0') {
            return '台股已收盤';
        }
        if (hour == '0' && min == '0' && sec != '0') {
            return `距離台股收盤還有${sec}秒鐘`;
        }
        if (hour != '0' || min != '0') {
            return `距離台股收盤還有${hour}小時${min}分鐘`;
        }
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
                        更新
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
                        <button className="share" onClick={shareHandler}>
                            <img src={share} alt="share"></img>
                        </button>
                        <button className="search" onClick={showSearch}>
                            <img src={search} alt="search"></img>
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="price__container">{`${simTradeHandler(formatPrice(close), isSimTrade)} ${getArrow(
                        close,
                        reference,
                    )} ${simTradeHandler(trimMinus(toDecimal(diffPrice)), isSimTrade)} (${trimMinus(
                        toDecimal(diffRate),
                    )}%)`}</div>
                    <div className="volume__container">
                        <div className="volume">{`總量 ${volSum}`}</div>
                        <div className="unit">{lot === 'Odd' ? '股' : '張'}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="market__container">
                        <button className="lot__box" onClick={lotHandler} style={lotWidthHandler()}>
                            <div className="box board">整</div>
                            {productInfo?.solaceMarket &&
                                productInfo.solaceMarket !== '興櫃' &&
                                productInfo.solaceMarket !== '權證' && <div className="box odd">零</div>}
                        </button>
                        {productInfo?.solaceMarket != null && (
                            <div className="market__box">{productInfo.solaceMarket}</div>
                        )}
                    </div>
                    <div className="more__container" onClick={setMoreDetailIsVisitable}>
                        {moreItems.map(item => (
                            <TextBox key={item.id} color={item.color} text={item.text} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="more__info__container">
                <div className="information__box">
                    <button className="btn add__self__select" onClick={showSelfSelect} disabled={!selectInfo}>
                        加入自選
                    </button>
                </div>
            </div>
            <Search isVisible={isSearchVisible} handleCancel={handleCancel} />
            <AddSelectStock
                isVisible={isSelfSelectVisitable}
                handleClose={closeSelfSelect}
                isEdit={false}
                reloadSelect={getSelect}
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
                    width: 42px;
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
                    margin-top: 12px;
                    position: absolute;
                    padding: 0 16px 12px 16px;
                    width: 100%;
                    z-index: 1;
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
            `}</style>
            {/* <style jsx global>{`
                .endTime {
                    color: #254a91;
                    font-size: 1.4rem;
                    display: inline-block;
                    line-height: 44px;
                    margin-left: 8px;
                }
            `}</style> */}
        </div>
    );
};
