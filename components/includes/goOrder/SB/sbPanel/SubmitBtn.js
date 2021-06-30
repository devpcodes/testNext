import { useEffect } from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { themeColor } from '../../panel/PanelTabs';
import { formatNum } from '../../../../../services/formatNum';
import { getTransactionCost } from '../../../../../services/components/goOrder/sb/getTransitionCost';
import { setTransactionCost } from '../../../../../store/goOrderSB/action';
const SubmitBtn = ({ text, ...props }) => {
    const bs = useSelector(store => store.goOrderSB.bs);
    const productInfo = useSelector(store => store.goOrder.productInfo);
    const qty = useSelector(store => store.goOrderSB.qty);
    const price = useSelector(store => store.goOrderSB.price);
    const transactionCost = useSelector(store => store.goOrderSB.transactionCost);
    const dispatch = useDispatch();

    useEffect(() => {
        let cost = '';
        if (productInfo.market != null) {
            cost = getTransactionCost(qty, price, bs, productInfo.market);
        }
        console.log('cccc', cost);
        dispatch(setTransactionCost(cost));
    }, [bs, productInfo, qty, price]);
    console.log('transition', transactionCost);
    return (
        <div className="submit__container">
            <Button
                style={{ background: bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor }}
                type="primary"
                {...props}
            >
                {text}
            </Button>
            <div className="estimatedAmount">
                預估金額 {formatNum(transactionCost)}
                {'美'}元
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
