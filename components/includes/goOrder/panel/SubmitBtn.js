import { Button } from 'antd';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkServer } from '../../../../services/checkServer';
import { formatNum } from '../../../../services/formatNum';
import { formatPrice } from '../../../../services/numFormat';
import { getTransactionCost } from '../../../../services/stock/transactionCost';
import {
    setConfirmBoxOpen,
    setTransactionCost,
    setConfirmBoxTitle,
    setConfirmBoxColor,
} from '../../../../store/goOrder/action';
import { themeColor } from './PanelTabs';

const SubmitBtn = () => {
    const dispatch = useDispatch();
    const code = useSelector(store => store.goOrder.code);
    const bs = useSelector(store => store.goOrder.bs);
    const T30Data = useSelector(store => store.goOrder.T30Data);
    const ord_price = useSelector(store => store.goOrder.ord_price);
    const offerShare = useSelector(store => store.goOrder.ord_qty);
    const solaceData = useSelector(store => store.solace.solaceData);
    const ord_type = useSelector(store => store.goOrder.ord_type);
    const ord_cond = useSelector(store => store.goOrder.ord_cond);
    const tradeTime = useSelector(store => store.goOrder.tradeTime);
    const price_type = useSelector(store => store.goOrder.price_type);
    const transactionCost = useSelector(store => store.goOrder.transactionCost);

    useEffect(() => {
        let capitalPercent = T30Data['資成數'] == null ? 0 : T30Data['資成數'] / 10;
        let voucherPercent = T30Data['券成數'] == null ? 0 : T30Data['券成數'] / 10;
        let dealing = bs === 'B' ? 'BUY' : 'SELL';
        let unit;
        let reference;
        if (!checkServer() && solaceData.length > 0 && solaceData[0].topic != null) {
            unit = solaceData[0].data.Unit || solaceData[0].data.OddlotUnit;
            reference = solaceData[0].data.Reference || solaceData[0].data.OddlotReference;
        }
        if ((ord_type === '2' || ord_type === 'C') && unit) {
            unit = unit / 1000;
        }
        let tradeType = getTradeType(ord_cond);
        const offerPrice = getOfferPrice(ord_price, reference, price_type);
        let cost = getTransactionCost(offerPrice, offerShare, unit, dealing, capitalPercent, voucherPercent, tradeType);
        if (price_type === '4') {
            cost = '市價';
        }
        if (tradeTime === 'after') {
            cost = '盤後';
        }
        dispatch(setTransactionCost(cost));
    }, [code, T30Data, ord_price, bs, offerShare, solaceData, ord_type, ord_cond, tradeTime, price_type]);

    const getOfferPrice = (ordPrice, reference, price_type) => {
        let offerPrice = ordPrice;
        if (price_type === '2') {
            offerPrice = formatPrice(Number(reference) * 1.1);
        }
        if (price_type === '3') {
            offerPrice = formatPrice(Number(reference) * 0.9);
        }
        if (price_type === '1') {
            offerPrice = formatPrice(reference);
        }
        return offerPrice;
    };

    const getTradeType = ordCond => {
        let tradeType = '';
        if (ordCond === '0') {
            tradeType = 'BYCASH';
        } else if (ordCond === '3') {
            tradeType = 'BYSOURCE';
        } else if (ordCond === '4') {
            tradeType = 'BYSECURITY';
        }
        return tradeType;
    };

    const submitHandler = () => {
        let color = bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor;

        dispatch(setConfirmBoxOpen(true));
        dispatch(setConfirmBoxTitle('委託確認'));
        dispatch(setConfirmBoxColor(color));
    };

    return (
        <div onClick={submitHandler} className="submit__container">
            <Button
                style={{
                    width: '100%',
                    height: '85px',
                    background: bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor,
                }}
                type="primary"
            >
                {bs === 'B' ? '委託買進' : '委託賣出'}
            </Button>
            <div className="estimatedAmount">預估金額 {formatNum(transactionCost) || '--'}元(台幣)</div>
            <style global jsx>{`
                .submit__container {
                    position: absolute;
                    top: 276px;
                    left: 0;
                    width: 100%;
                    height: 80px;
                }
                .submit__container .ant-btn-primary {
                    border: none;
                }
                .submit__container .ant-btn > span {
                    position: absolute;
                    top: 38%;
                    font-size: 2rem;
                    left: 50%;
                    font-weight: bold;
                    transform: translate(-50%, -50%);
                }
                .estimatedAmount {
                    position: absolute;
                    font-weight: bold;
                    top: 68%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: #ffffff;
                    font-size: 1.6rem;
                    opacity: 0.6;
                    width: 100%;
                    text-align: center;
                }
            `}</style>
        </div>
    );
};

export default SubmitBtn;
