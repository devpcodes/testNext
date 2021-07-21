import { useEffect, useRef, useState } from 'react';
import { Button, Tooltip, Modal, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { themeColor } from '../panel/PanelTabs';
import { formatNum } from '../../../../services/formatNum';
import { submitService } from '../../../../services/components/goOrder/sb/submitService';
import { usePlatform } from '../../../../hooks/usePlatform';
import { getWebId } from '../../../../services/components/goOrder/getWebId';
import { getToken } from '../../../../services/user/accessToken';
import { setSBActiveTabKey } from '../../../../store/goOrderSB/action';

const OrderBox = ({
    StockId,
    name,
    Price,
    Qty,
    BS,
    transactionCost,
    GTCDate,
    aon,
    TouchedPrice,
    market,
    closeHandler,
    currency,
}) => {
    const StockIdC = useRef('');
    const nameC = useRef('');
    const PriceC = useRef('');
    const QtyC = useRef('');
    const BSC = useRef('');
    const transactionCostC = useRef('');
    const GTCDateC = useRef('');
    const aonC = useRef('');
    const TouchedPriceC = useRef('');
    const marketC = useRef('');
    const currencyC = useRef('');
    const currentAccount = useSelector(store => store.user.currentAccount);
    const platform = usePlatform();
    const dispatch = useDispatch();
    useEffect(() => {
        StockIdC.current = StockId;
        PriceC.current = Price;
        QtyC.current = Qty;
        BSC.current = BS;
        transactionCostC.current = transactionCost;
        GTCDateC.current = GTCDate;
        aonC.current = aon;
        TouchedPriceC.current = TouchedPrice;
        marketC.current = market;
        currencyC.current = currency;
        nameC.current = name;
    }, []);

    const getTypeHandler = () => {
        if (marketC.current !== 'US') {
            return '限價單';
        }
        if (TouchedPriceC.current && marketC.current === 'US') {
            return `觸價單/${aonC.current === 'ANY' ? '可部份成交 ANY' : '限完全成交 AON'}`;
        } else {
            return `限價單/${aonC.current === 'ANY' ? '可部份成交 ANY' : '限完全成交 AON'}`;
        }
    };

    const submitHandler = async () => {
        try {
            const res = await submitService({
                CID: getWebId(platform, 'recommisiioned'),
                StockID: StockIdC.current,
                Price: PriceC.current,
                Qty: QtyC.current,
                BS: BSC.current,
                GTCDate: GTCDateC.current,
                aon: aonC.current,
                TouchedPrice: TouchedPriceC.current,
                Exchid: marketC.current,
                Creator: currentAccount.idno,
                token: getToken(),
                currentAccount,
            });
            message.success({
                content: '委託已送出',
            });
            closeHandler();
            dispatch(setSBActiveTabKey('3'));
        } catch (error) {
            message.info({
                content: error,
            });
        }
    };
    return (
        <div>
            <div className="trade__info--title">
                <div className="info__box">
                    <div className="stock__name">{nameC.current}</div>
                    <div className="trade__type">{getTypeHandler()}</div>
                </div>
                <div className="buySell__box">{BSC.current === 'B' ? '買' : '賣'}</div>
            </div>
            <div className="trade__info--num">
                <div className="info__price">
                    <span className="label">價格</span>
                    {/* <span className="val">{ordPrice}</span> */}
                    {/* <span className="val">{mappingPriceMsg(ordPrice, priceType)}</span> */}
                    <span className="val">{PriceC.current}</span>
                </div>
                <div className="info__qty">
                    <span className="label">數量</span>
                    <span className="val">{QtyC.current}股</span>
                </div>
                {GTCDateC.current && (
                    <div className="info__qty">
                        <span className="label">長效單</span>
                        <span className="val">{GTCDateC.current}</span>
                    </div>
                )}
                {TouchedPriceC.current && (
                    <div className="info__qty">
                        <span className="label">觸發價格</span>
                        <span className="val">
                            {BS === 'B' ? '≥' : '≤'}
                            {TouchedPriceC.current}
                        </span>
                    </div>
                )}
                {transactionCostC.current && (
                    <div className="info__amount">
                        <span className="label">預估金額</span>
                        <span className="val">
                            {formatNum(transactionCostC.current)} ({currencyC.current})
                        </span>
                    </div>
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
                        backgroundColor: BSC.current === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor,
                        color: 'white',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        border: 'none',
                    }}
                    onClick={submitHandler}
                    // loading={}
                >
                    {BSC.current === 'B' ? '確認買進' : '確認賣出'}
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
                    font-weight: bold;
                    color: ${BSC.current === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor};
                }
                .line {
                    height: 1px;
                    margin-top: 10px;
                    background: ${BSC.current === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor};
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
                    color: ${BSC.current === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor};
                }
                .trade__type {
                    margin-left: 16px;
                    margin-top: -2px;
                    font-size: 2rem;
                    font-weight: bold;
                    color: ${BSC.current === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor};
                }
                .buySell__box {
                    display: inline-block;
                    font-size: 4rem;
                    font-weight: bold;
                    background: ${BSC.current === 'B' ? 'rgba(244, 90, 76, 0.15)' : 'rgba(34, 161, 111, 0.1)'};
                    width: 59px;
                    height: 59px;
                    text-align: center;
                    vertical-align: top;
                    margin-top: 15px;
                    margin-right: 16px;
                    border-radius: 3px;
                    color: ${BSC.current === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor};
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
                    color: ${BSC.current === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor};
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
                    margin-top: '54px';
                    padding-bottom: 16px;
                    padding-left: 16px;
                    padding-right: 16px;
                    position: absolute;
                    top: 309px;
                }
                .oddDescription {
                    margin-top: 14px;
                    font-size: 1.6rem;
                    color: ${BSC.current === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor};
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
