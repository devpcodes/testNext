import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { themeColor } from './PanelTabs';

const SubmitBtn = () => {
    const bs = useSelector(store => store.goOrder.bs);
    return (
        <div className="submit__container">
            <Button
                style={{
                    width: '100%',
                    height: '85px',
                    background: bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor,
                }}
                type="primary"
            >
                委託賣出
            </Button>
            <div className="estimatedAmount">預估金額 432,500元(台幣)</div>
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
                }
            `}</style>
        </div>
    );
};

export default SubmitBtn;
