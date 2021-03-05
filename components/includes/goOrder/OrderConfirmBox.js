import { useDispatch } from 'react-redux';
import arrow from '../../../resources/images/components/goOrder/arrow-chevron-down.png';
import { setConfirmBoxOpen } from '../../../store/goOrder/action';
import ChTradingInfoBox from './searchList/ChTradingInfoBox';
import OrderBox from './OrderBox';
//style={{display: show ? 'block' : 'none'}}
const OrderConfirmBox = ({ title, color }) => {
    const dispatch = useDispatch();
    const closeHandler = () => {
        dispatch(setConfirmBoxOpen(false));
    };
    return (
        <div className="confirm__container">
            <div className="title">
                {title === '刪改委託單' || '' ? '' : title}
                <img onClick={closeHandler} className="back__icon" src={arrow} />
            </div>
            <div className="line"></div>
            {title === '委託確認' && <OrderBox />}
            {title === '刪改委託單' && <ChTradingInfoBox />}
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
