import TimeLine from '../../subscription/timeLine';
const stockData = {
    currentDate: '20220715',
    beginDate: '20220714',
    endDate: '20220722',
    feeDate: '20220723',
    lotDate: '20220724',
    moneyDate: '20220725',
    stkDate: '20220725',
};
const TimeLineBox = ({ style }) => {
    return (
        <div className="timeLine__container" style={style}>
            <div className="timeLine__head">
                <div className="timeLine__left">
                    <div className="timeLine__item">
                        <span className="label">申購價</span>
                        <span className="val">760</span>
                    </div>
                    <div className="timeLine__item">
                        <span className="label">市價</span>
                        <span className="val">942</span>
                    </div>
                </div>
                <div className="timeLine__right">
                    <div className="timeLine__item">
                        <span className="label">總申購張數</span>
                        <span className="val">663</span>
                    </div>
                    <div className="timeLine__item">
                        <span className="label">申購張數</span>
                        <span className="val">1</span>
                    </div>
                </div>
            </div>
            <TimeLine
                stockData={stockData}
                style={{ marginTop: '22px' }}
                blockStyle={{ width: '112%', marginLeft: '-6%' }}
            />
            <style jsx>{`
                .timeLine__container {
                    border-radius: 2px;
                    border: solid 1px #d7e0ef;
                    background-color: #fff;
                    height: 175px;
                    padding: 16px 20px;
                }
                .timeLine__head {
                    display: flex;
                    justify-content: space-between;
                }
                .timeLine__left {
                    flex: 1 0 0;
                    margin-right: 58px;
                }
                .timeLine__right {
                    flex: 1 0 0;
                }
                .timeLine__item {
                    display: flex;
                    justify-content: space-between;
                    font-size: 16px;
                }
                .label {
                    color: #3f5372;
                }
                .val {
                    color: #0d1623;
                }
            `}</style>
        </div>
    );
};

export default TimeLineBox;
