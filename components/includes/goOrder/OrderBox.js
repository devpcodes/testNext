import { useEffect, useRef, useState } from 'react';
import { Button, Tooltip, Modal, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { themeColor } from './panel/PanelTabs';
import { setActiveTabKey, setConfirmBoxOpen, setResetData } from '../../../store/goOrder/action';
import { formatNum } from '../../../services/formatNum';
import infoIcon from '../../../resources/images/components/goOrder/attention-info-circle2.svg';
import infoIconSell from '../../../resources/images/components/goOrder/attention-info-circle3.svg';
import { postOrder } from '../../../services/components/goOrder/postOrder';
import { getToken } from '../../../services/user/accessToken';
import { getCookie } from '../../../services/components/layouts/cookieController';
import { checkSignCA, sign } from '../../../services/webCa';
import { getWebId } from '../../../services/components/goOrder/getWebId';
import { usePlatform } from '../../../hooks/usePlatform';
const OrderBox = ({ ordPrice, lot, ordType, transactionCost, ordQty, stockId, market }) => {
    const dispatch = useDispatch();
    const solaceName = useSelector(store => store.goOrder.productInfo.solaceName);
    // const market = useSelector(store => store.goOrder.productInfo.solaceMarket);
    const bs = useSelector(store => store.goOrder.bs);
    // const lot = useSelector(store => store.goOrder.lot);
    const tradeTime = useSelector(store => store.goOrder.tradeTime);
    const is_first_sell = useSelector(store => store.goOrder.is_first_sell);
    const ordCond = useSelector(store => store.goOrder.ord_cond);
    const timeInForce = useSelector(store => store.goOrder.time_in_force);
    // const ordPrice = useSelector(store => store.goOrder.ord_price);
    // const ordQty = useSelector(store => store.goOrder.ord_qty);
    // const ordType = useSelector(store => store.goOrder.ord_type);
    const priceType = useSelector(store => store.goOrder.price_type);
    // const stockId = useSelector(store => store.goOrder.code);
    // const transactionCost = useSelector(store => store.goOrder.transactionCost);
    const currentAccount = useSelector(store => store.user.currentAccount);
    const userSettings = useSelector(store => store.user.userSettings);

    const orderName = useRef('');
    const [submitLoading, setSubmitLoading] = useState(false);
    const [oddToolTipVisible, setOddToolTipVisible] = useState(false);
    const platform = usePlatform();

    const currOrdPrice = useRef('');
    const currLot = useRef('');
    const currOrdType = useRef('');
    const currTransactionCost = useRef('');
    const currOrdQty = useRef('');
    const currStockId = useRef('');
    const currMarket = useRef('');
    useEffect(() => {
        orderName.current = solaceName;
        document.body.addEventListener('click', oddTipVisHandler);

        currOrdPrice.current = ordPrice;
        currLot.current = lot;
        currOrdType.current = ordType;
        currOrdQty.current = ordQty;
        currTransactionCost.current = transactionCost;
        currStockId.current = stockId;
        currMarket.current = market;
        return () => {
            document.body.removeEventListener('click', oddTipVisHandler);
        };
    }, []);

    const closeHandler = () => {
        dispatch(setConfirmBoxOpen(false));
    };
    const getLot = () => {
        if (currLot.current === 'Board') {
            return '??????';
        } else {
            return '??????';
        }
    };
    const getTradeTime = () => {
        if (tradeTime === 'ing') {
            return '??????';
        } else {
            return '??????';
        }
    };
    const getOrderCond = () => {
        switch (ordCond) {
            case '0':
                return '??????';
            case '3':
                return '??????';
            case '4':
                return '??????';
        }
    };
    const getTimeInForce = () => {
        switch (timeInForce) {
            case '0':
                return 'ROD';
            case '3':
                return 'IOC';
            case '4':
                return 'FOK';
        }
    };
    const checkReset = () => {
        if (userSettings.clearAfterStockOrdered != null && userSettings.clearAfterStockOrdered) {
            dispatch(setResetData(true));
            setTimeout(() => {
                dispatch(setResetData(false));
            }, 500);
        }
    };
    const submitHandler = async () => {
        const token = getToken();
        const ID = currentAccount.idno;
        //TODO cookie???????????????
        const IP = getCookie('client_ip');
        const account = currentAccount.account;
        const broker_id = currentAccount.broker_id;
        const ord_bs = bs;
        const ord_cond = ordCond;
        // const ord_price = ordPrice || '0';
        const ord_price = currOrdPrice.current || '0';
        const ord_qty = currOrdQty.current;
        // const ord_type = ordType;
        const ord_type = currOrdType.current;
        const price_type = priceType;
        const stock_id = currStockId.current;
        const time_in_force = timeInForce;
        const web_id = getWebId(platform, 'stock');
        // const market_id = market === '??????' || market === '??????' ? 'S' : market === '??????' ? 'O' : 'R';
        const market_id =
            currMarket.current === '??????' || currMarket.current === '??????'
                ? 'S'
                : currMarket.current === '??????'
                ? 'O'
                : 'R';
        const ca_content = sign(
            {
                idno: currentAccount.idno,
                broker_id: currentAccount.broker_id,
                account: currentAccount.account,
            },
            true,
            token,
        );
        // const ca_content = {
        //     signature:
        //         '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',
        //     plainText: 'ACCIFFACDJ1582264901237',
        //     certSN: '6036E563',
        //     type: 'web',
        // };
        //checkSignCA(ca_content)
        if (checkSignCA(ca_content)) {
            setSubmitLoading(true);
            const res = await postOrder({
                ID,
                IP,
                account,
                broker_id,
                is_first_sell,
                market_id,
                ord_bs,
                ord_cond,
                ord_price,
                ord_qty,
                ord_type,
                price_type,
                stock_id,
                time_in_force,
                token,
                web_id,
                ca_content,
            });
            setSubmitLoading(false);
            if (res.success === 'True') {
                // Modal.success({
                //     content: '????????????',
                //     onOk: () => {
                //         closeHandler();
                //         dispatch(setActiveTabKey('3'));
                //         // checkReset();
                //     },
                // });
                message.success({
                    content: '????????????',
                });
                closeHandler();
                dispatch(setActiveTabKey('3'));
            } else {
                // Modal.info({
                //     content: res.result.msg,
                //     onOk: () => {
                //         closeHandler();
                //     },
                // });
                message.info({
                    content: res.result.msg,
                });
                closeHandler();
            }
        }
    };
    const oddTipVisHandler = e => {
        if (e.target.textContent.indexOf('?????????????????????') >= 0) {
            if (e && e.stopPropagation) {
                e.stopPropagation();
            } else {
                window.event.cancelBubble = true;
            }
            setOddToolTipVisible(prevState => {
                return !prevState;
            });
        } else {
            setOddToolTipVisible(false);
        }
    };
    const mappingPriceMsg = (price, priceType, ordType) => {
        if (ordType === 'P') {
            return '??????';
        }
        switch (priceType) {
            case ' ':
                return price;
            case '4':
                return '??????';
            case '2':
                return '??????';
            case '3':
                return '??????';
            case '1':
                return '??????';
            default:
                return price;
        }
    };
    return (
        <div>
            <div className="trade__info--title">
                <div className="info__box">
                    <div className="stock__name">{orderName.current}</div>
                    <div className="trade__type">
                        {getLot()} / {getTradeTime()} / {getOrderCond()} / {getTimeInForce()}
                    </div>
                </div>
                <div className="buySell__box">{bs === 'B' ? '???' : '???'}</div>
            </div>
            <div className="trade__info--num">
                <div className="info__price">
                    <span className="label">??????</span>
                    {/* <span className="val">{ordPrice}</span> */}
                    {/* <span className="val">{mappingPriceMsg(ordPrice, priceType)}</span> */}
                    <span className="val">{mappingPriceMsg(currOrdPrice.current, priceType, currOrdType.current)}</span>
                </div>
                <div className="info__qty">
                    <span className="label">??????</span>
                    <span className="val">{currOrdQty.current}</span>
                </div>
                <div className="info__amount">
                    <span className="label">????????????</span>
                    <span className="val">{formatNum(currTransactionCost.current)}???(??????)</span>
                </div>
                {currLot.current !== 'Board' && (
                    <Tooltip
                        placement="topLeft"
                        title={
                            <>
                                ??????????????????????????????????????
                                <br />
                                ????????0.1425%??????????????????
                                <br />
                                ??????1????????????1?????????1?????????
                            </>
                        }
                        color="white"
                        visible={oddToolTipVisible}
                    >
                        <div className="oddDescription" onClick={oddTipVisHandler}>
                            <img src={bs === 'B' ? infoIcon : infoIconSell} />
                            ?????????????????????
                        </div>
                    </Tooltip>
                )}
            </div>
            <div className="btn__box">
                <Button
                    style={{
                        height: '60px',
                        width: 'calc( 50% - 8px )',
                        marginRight: '16px',
                        backgroundColor: '#e6ebf5',
                        border: 'none',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: 'black',
                    }}
                    onClick={() => {
                        closeHandler();
                    }}
                >
                    ??????
                </Button>
                <Button
                    style={{
                        height: '60px',
                        width: 'calc( 50% - 8px )',
                        backgroundColor: bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor,
                        color: 'white',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        border: 'none',
                    }}
                    onClick={submitHandler}
                    loading={submitLoading}
                >
                    {bs === 'B' ? '????????????' : '????????????'}
                </Button>
            </div>
            <style jsx>{`
                .confirm__container {
                    display: block;
                    height: 100vh;
                    width: 100vw;
                    background: white;
                    position: absolute;
                    top: 15px;
                }
                .title {
                    text-align: center;
                    font-size: 2rem;
                    color: ${bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor};
                    font-weight: bold;
                }
                .line {
                    background: ${bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor};
                    height: 1px;
                    margin-top: 10px;
                }
                .back__icon {
                    transform: rotate(-90deg);
                    top: 2px;
                    position: absolute;
                    left: 13px;
                    cursor: pointer;
                }
                .info__box {
                    display: inline-block;
                    width: calc(100% - 75px);
                }
                .stock__name {
                    margin: 17px 0 0 16px;
                    font-size: 2.4rem;
                    font-weight: bold;
                    color: ${bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor};
                }
                .trade__type {
                    margin-left: 16px;
                    margin-top: -2px;
                    font-size: 2rem;
                    font-weight: bold;
                    color: ${bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor};
                }
                .buySell__box {
                    display: inline-block;
                    font-size: 4rem;
                    font-weight: bold;
                    background: ${bs === 'B' ? 'rgba(244, 90, 76, 0.15)' : 'rgba(34, 161, 111, 0.1)'};
                    width: 59px;
                    height: 59px;
                    text-align: center;
                    vertical-align: top;
                    margin-top: 15px;
                    margin-right: 16px;
                    border-radius: 3px;
                    color: ${bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor};
                }
                .trade__info--num {
                    margin-top: 16px;
                    margin-left: 16px;
                }
                .info__price {
                    margin-bottom: 4px;
                }
                .info__qty {
                    margin-bottom: 4px;
                }
                .label {
                    color: ${bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor};
                    font-size: 1.6rem;
                }
                .val {
                    margin-left: 12px;
                    color: black;
                    font-weight: bold;
                    font-size: 1.6rem;
                }
                .btn__box {
                    width: 100%;
                    height: 84px;
                    text-align: left;
                    margin-top: ${currLot.current !== 'Board' ? '14px' : '54px'};
                    padding-bottom: 16px;
                    padding-left: 16px;
                    padding-right: 16px;
                }
                .oddDescription {
                    margin-top: 14px;
                    font-size: 1.6rem;
                    color: ${bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor};
                    display: inline-block;
                }
                .oddDescription img {
                    margin-right: 3px;
                    margin-top: -3px;
                }
            `}</style>
            <style jsx global>{`
                .ant-tooltip-inner {
                    color: #0d1623;
                    font-size: 1.6rem;
                    box-shadow: 0 2px 15px 0 rgba(169, 182, 203, 0.7);
                    padding: 16px;
                    line-height: 25px;
                }
                .ant-btn-primary {
                    background: #c43826;
                    border-color: #c43826;
                    height: 32px;
                    font-size: 1.6rem;
                    width: 63px;
                    vertical-align: top;
                }
            `}</style>
        </div>
    );
};

export default OrderBox;
