import { useEffect } from 'react';
import { Button, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { themeColor } from '../../panel/PanelTabs';
import { formatNum } from '../../../../../services/formatNum';
import { getTransactionCost } from '../../../../../services/components/goOrder/sb/getTransitionCost';
import { fetchSBEstimated } from '../../../../../services/sb/querySBEstimated';
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
    const aon = useSelector(store => store.goOrderSB.aon);
    const broker_id = useSelector(store => store.user.currentAccount.broker_id);
    const account = useSelector(store => store.user.currentAccount.account);
    const dispatch = useDispatch();

    useEffect(async () => {
        let cost = '';
        if (stockInfo['@Currency'] != null && qty && price) {
            cost = await fetchSBEstimated(
                stockInfo['@Exch'],
                bs,
                parseFloat(price),
                parseFloat(qty),
                broker_id,
                account,
            );
        }
        dispatch(setTransactionCost(cost.amount));
    }, [bs, stockInfo, qty, price]);

    const submitHandler = (bs, price, qty, touch, TouchedPrice, currentAccount, quote, aon) => {
        if (validateHandler(price, qty, touch, TouchedPrice, currentAccount, quote, bs, aon)) {
            dispatch(setConfirmBoxOpen(true));
            dispatch(setConfirmBoxTitle('????????????'));
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
                    title: '???????????????',
                });
                return false;
            }
        } else {
            Modal.error({
                title: '???????????????',
            });
            return false;
        }

        if (aon === 'AON' && qty < 100) {
            Modal.error({
                title: '??????????????????',
                content: 'AON ?????????????????? 100 ???',
            });
            return false;
        }

        if (price === '' || qty === '' || price == 0 || qty == 0) {
            Modal.error({
                title: '??????????????????',
                content: '??????????????????????????????????????????',
            });
            return false;
        }
        if (touch && TouchedPrice === '') {
            Modal.error({
                title: '??????????????????',
                content: '?????????????????????',
            });
            return false;
        }

        const close = quote?.ls || quote?.refprice;
        if (TouchedPrice && !checkTouchPrice(price, TouchedPrice, close, bs)) {
            Modal.error({
                title: '??????????????????',
                content: bs === 'B' ? '????????????????????? ??? ???????????? ??? ????????????' : '????????????????????? ??? ???????????? ??? ???????????? ',
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
                onClick={submitHandler.bind(null, bs, price, qty, touch, TouchedPrice, currentAccount, quote, aon)}
                {...props}
            >
                {text}
            </Button>
            <div className="estimatedAmount">
                ???????????? {formatNum(transactionCost)}&nbsp;
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
