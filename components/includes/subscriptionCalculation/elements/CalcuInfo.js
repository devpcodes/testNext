import CalcuItem from './CalcuItem';
import Line from './Line';

const CalcuInfo = () => {
    return (
        <div className="info__container">
            <p className="info__title">申購便利通合計</p>
            <div>
                <span className="info__num">20,120</span>
                <span className="info__unit">元</span>
            </div>
            <Line style={{ marginTop: '20px' }} />
            <CalcuItem style={{ marginTop: '20px' }} />
            <style jsx>{`
                .info__container {
                    padding: 24px 30px;
                }
                .info__title {
                    font-size: 16px;
                    letter-spacing: 0.4px;
                    color: #3f5372;
                    margin-bottom: 0;
                }
                .info__num {
                    font-size: 28px;
                    font-weight: bold;
                    color: #0d1623;
                }
                .info__unit {
                    font-size: 16px;
                    letter-spacing: 0.4px;
                    color: #0d1623;
                    padding-left: 4px;
                }
            `}</style>
        </div>
    );
};

export default CalcuInfo;
