import { useSelector, useDispatch } from 'react-redux';
import { themeColor } from './panel/PanelTabs';
import arrow from '../../../resources/images/components/goOrder/arrow-chevron-down.png';
import { setConfirmBoxOpen } from '../../../store/goOrder/action';
//style={{display: show ? 'block' : 'none'}}
const OrderConfirmBox = ({ show, title }) => {
    const dispatch = useDispatch();
    const closeHandler = () => {
        dispatch(setConfirmBoxOpen(false));
    };
    return (
        <div className="confirm__container">
            <div className="title">
                {title}
                <img onClick={closeHandler} className="back__icon" src={arrow} />
            </div>
            <div className="line"></div>
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
                    color: ${themeColor.buyTabColor};
                    font-weight: bold;
                }
                .line {
                    background: ${themeColor.buyTabColor};
                    height: 1px;
                    margin-top: 10px;
                }
                .back__icon {
                    transform: rotate(-90deg);
                    top: 2px;
                    position: absolute;
                    left: 16px;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
};

export default OrderConfirmBox;
