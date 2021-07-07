import { useDispatch, useSelector } from 'react-redux';
import arrow from '../../../../resources/images/components/goOrder/arrow-chevron-down.png';
import { getCurrency } from '../../../../services/components/goOrder/sb/dataMapping';
import { setConfirmBoxOpen, setConfirmBoxTitle } from '../../../../store/goOrderSB/action';
import OrderBox from './OrderBox';
import DetailBox from './searchList/DetailBox';
//style={{display: show ? 'block' : 'none'}}
const OrderConfirmBox = ({ title, color }) => {
    const dispatch = useDispatch();
    const price = useSelector(store => store.goOrderSB.price);
    // const lot = useSelector(store => store.goOrder.lot);
    // const ordType = useSelector(store => store.goOrder.ord_type);
    // const clickSource = useSelector(store => store.goOrder.confirmBoxClickSource);
    const qty = useSelector(store => store.goOrderSB.qty);
    const transactionCost = useSelector(store => store.goOrderSB.transactionCost);
    const stockId = useSelector(store => store.goOrder.code);
    const bs = useSelector(store => store.goOrderSB.bs);
    const gtcDate = useSelector(store => store.goOrderSB.gtcDate);
    const aon = useSelector(store => store.goOrderSB.aon);
    const TouchedPrice = useSelector(store => store.goOrderSB.TouchedPrice);
    const productInfo = useSelector(store => store.goOrder.productInfo);
    const stockInfo = useSelector(store => store.goOrderSB.stockInfo);
    // const market = useSelector(store => store.goOrder.productInfo.solaceMarket);
    const closeHandler = () => {
        dispatch(setConfirmBoxOpen(false));
        // dispatch(setConfirmBoxTitle(''));
    };
    return (
        <div className="confirm__container">
            <div className="title">
                {title === '刪改委託單' || '' ? '' : title}
                <img onClick={closeHandler} className="back__icon" src={arrow} />
            </div>
            <div className="line"></div>
            {title === '委託確認' && (
                <OrderBox
                    StockId={stockId}
                    Price={price}
                    transactionCost={transactionCost}
                    Qty={qty}
                    BS={bs}
                    GTCDate={gtcDate}
                    aon={aon}
                    TouchedPrice={TouchedPrice}
                    market={productInfo?.market}
                    closeHandler={closeHandler}
                    currency={getCurrency(stockInfo['@Currency'])}
                />
            )}
            {title === '委託明細' && <DetailBox />}
            {/* {title === '刪改委託單' && <ChTradingInfoBox />}
            {title === '委託明細' && <DetailBox />}
            {title === '成交明細' && <DealInfoBox />} */}
            <style jsx>{`
                .confirm__container {
                    display: block;
                    height: 100vh;
                    width: 100vw;
                    background: white;
                    position: absolute;
                    top: 15px;
                    z-index: 2;
                }
                .title {
                    text-align: center;
                    font-size: 2rem;
                    color: ${color};
                    font-weight: bold;
                    height: 30px;
                }
                .line {
                    background: ${color};
                    height: 1px;
                    margin-top: 10px;
                }
                .back__icon {
                    transform: rotate(-90deg);
                    top: 2px;
                    position: absolute;
                    left: 13px;
                    cursor: pointer;
                    z-index: 9;
                }
            `}</style>
        </div>
    );
};

export default OrderConfirmBox;
