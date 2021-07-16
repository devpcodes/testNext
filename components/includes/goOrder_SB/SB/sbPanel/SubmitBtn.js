import { useEffect } from 'react';
import { Button, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { themeColor } from '../../panel/PanelTabs';
import { formatNum } from '../../../../../services/formatNum';
import { getTransactionCost } from '../../../../../services/components/goOrder/sb/getTransitionCost';
import {
    setConfirmBoxColor,
    setConfirmBoxOpen,
    setTransactionCost,
    setConfirmBoxTitle,
} from '../../../../../store/goOrderSB/action';
import { getCurrency } from '../../../../../services/components/goOrder/sb/dataMapping';
import { checkTouchPrice } from '../../../../../services/components/goOrder/sb/checkTouchPrice';
const SubmitBtn = ({ text, ...props }) => {
    const bs = useSelector(store => store.goOrderSB.bs);
    // const productInfo = useSelector(store => store.goOrder.productInfo);
    const stockInfo = useSelector(store => store.goOrderSB.stockInfo);
    const qty = useSelector(store => store.goOrderSB.qty);
    const price = useSelector(store => store.goOrderSB.price);
    const transactionCost = useSelector(store => store.goOrderSB.transactionCost);
    const TouchedPrice = useSelector(store => store.goOrderSB.TouchedPrice);
    const touch = useSelector(store => store.goOrderSB.touch);
    const currentAccount = useSelector(store => store.user.currentAccount);
    const quote = useSelector(store => store.goOrderSB.quote);
    const dispatch = useDispatch();

    useEffect(() => {
        let cost = '';
        if (stockInfo['@Currency'] != null) {
            cost = getTransactionCost(qty, price, bs, stockInfo['@Currency']);
        }
        dispatch(setTransactionCost(cost));
    }, [bs, stockInfo, qty, price]);

    const submitHandler = (bs, price, qty, touch, TouchedPrice, currentAccount, quote) => {
        if (validateHandler(price, qty, touch, TouchedPrice, currentAccount, quote, bs)) {
            dispatch(setConfirmBoxOpen(true));
            dispatch(setConfirmBoxTitle('委託確認'));
            if (bs === 'B') {
                dispatch(setConfirmBoxColor(themeColor.buyTabColor));
            } else {
                dispatch(setConfirmBoxColor(themeColor.sellTabColor));
            }
        }
    };

    const validateHandler = (price, qty, touch, TouchedPrice, currentAccount, quote, bs) => {
        if (currentAccount != null && currentAccount.accttype != null) {
            if (currentAccount.accttype != 'H') {
                Modal.error({
                    title: '無可用帳號',
                });
                return false;
            }
        } else {
            Modal.error({
                title: '無可用帳號',
            });
            return false;
        }

        if (price === '' || qty === '' || price == 0 || qty == 0) {
            Modal.error({
                title: '資料格式錯誤',
                content: '請確認價格或股數資料填寫正確',
            });
            return false;
        }
        if (touch && TouchedPrice === '') {
            Modal.error({
                title: '資料格式錯誤',
                content: '請輸入觸發價格',
            });
            return false;
        }

        const close = quote?.ls || quote?.refprice;
        if (TouchedPrice && !checkTouchPrice(price, TouchedPrice, close, bs)) {
            Modal.error({
                title: '資料格式錯誤',
                content: bs === 'B' ? '請確認委託價格 ≧ 觸發價格 ≧ 目前市價' : '請確認委託價格 ≦ 觸發價格 ≦ 目前市價 ',
            });
            return false;
        }

        return true;
    };
    return (
        <div className="submit__container">
            <Button
                style={{ background: bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor }}
                type="primary"
                onClick={submitHandler.bind(null, bs, price, qty, touch, TouchedPrice, currentAccount, quote)}
                {...props}
            >
                {text}
            </Button>
            <div className="estimatedAmount">
                預估金額 {formatNum(transactionCost)}&nbsp;
                {stockInfo['@CHCurrency']}
            </div>
            <style global jsx>{`
                .submit__container {
                    position: absolute;
                    top: 320px;
                    left: 0;
                    width: 100%;
                    height: 80px;
                }
                .submit__container .ant-btn-primary {
                    border: none;
                    height: 80px;
                    width: 100vw;
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
                    pointer-events: none;
                }
                .submit__container .ant-btn-loading-icon {
                    position: absolute !important;
                    left: 37% !important;
                    top: 37% !important;
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default SubmitBtn;
