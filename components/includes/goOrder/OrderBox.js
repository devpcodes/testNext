import { useEffect, useRef } from 'react';
import { Button, Tooltip } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { themeColor } from './panel/PanelTabs';
import { setConfirmBoxOpen } from '../../../store/goOrder/action';
import { formatNum } from '../../../services/formatNum';
import infoIcon from '../../../resources/images/components/goOrder/attention-info-circle2.svg';
import infoIconSell from '../../../resources/images/components/goOrder/attention-info-circle3.svg';
const OrderBox = () => {
    const dispatch = useDispatch();
    const solaceName = useSelector(store => store.goOrder.productInfo.solaceName);
    const bs = useSelector(store => store.goOrder.bs);
    const lot = useSelector(store => store.goOrder.lot);
    const tradeTime = useSelector(store => store.goOrder.tradeTime);
    const ordCond = useSelector(store => store.goOrder.ord_cond);
    const timeInForce = useSelector(store => store.goOrder.time_in_force);
    const ordPrice = useSelector(store => store.goOrder.ord_price);
    const ordQty = useSelector(store => store.goOrder.ord_qty);
    const transactionCost = useSelector(store => store.goOrder.transactionCost);
    const orderName = useRef('');
    useEffect(() => {
        orderName.current = solaceName;
    }, []);
    const closeHandler = () => {
        dispatch(setConfirmBoxOpen(false));
    };
    const getLot = () => {
        if (lot === 'Board') {
            return '整股';
        } else {
            return '零股';
        }
    };
    const getTradeTime = () => {
        if (tradeTime === 'ing') {
            return '盤中';
        } else {
            return '盤後';
        }
    };
    const getOrderCond = () => {
        switch (ordCond) {
            case '0':
                return '現股';
            case '3':
                return '融資';
            case '4':
                return '融券';
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
    return (
        <>
            <div className="trade__info--title">
                <div className="info__box">
                    <div className="stock__name">{orderName.current}</div>
                    <div className="trade__type">
                        {getLot()} / {getTradeTime()} / {getOrderCond()} / {getTimeInForce()}
                    </div>
                </div>
                <div className="buySell__box">{bs === 'B' ? '買' : '賣'}</div>
            </div>
            <div className="trade__info--num">
                <div className="info__price">
                    <span className="label">價格</span>
                    <span className="val">{ordPrice}</span>
                </div>
                <div className="info__qty">
                    <span className="label">數量</span>
                    <span className="val">{ordQty}</span>
                </div>
                <div className="info__amount">
                    <span className="label">預估金額</span>
                    <span className="val">{formatNum(transactionCost)}元(台幣)</span>
                </div>
                {lot !== 'Board' && (
                    <Tooltip
                        placement="topLeft"
                        title={
                            <>
                                零股交易手續費參考：股價×
                                <br />
                                股數×0.1425%，每筆手續費
                                <br />
                                最低1元，不足1元，以1元計。
                            </>
                        }
                        color="white"
                    >
                        <div className="oddDescription">
                            <img src={bs === 'B' ? infoIcon : infoIconSell} />
                            零股交易手續費
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
                    取消
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
                >
                    {bs === 'B' ? '確認買進' : '確認賣出'}
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
                    margin-top: ${lot !== 'Board' ? '14px' : '54px'};
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
            `}</style>
        </>
    );
};

export default OrderBox;
