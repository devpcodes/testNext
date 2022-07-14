import InfoBox from './InfoBox';
import TimeLineBox from './TimeLineBox';

const StockDetail = () => {
    return (
        <div className="stock__container">
            <h2 className="stock__title">新潤 6186</h2>
            <div className="stock__bar">
                <div className="stock__left">
                    <span className="text mrgh">價差</span>
                    <span className="text num">7000</span>
                    <span className="text">元 (+29.87%)</span>
                </div>
                <div className="stock__right">
                    <span className="text2">最低只要</span>
                    <span className="text num">78</span>
                    <span className="text2">元，買個中籤夢！</span>
                </div>
            </div>
            <div className="stock__content">
                <InfoBox
                    title={'中籤'}
                    style={{ marginTop: '17px', marginRight: '17px', flex: '1 0 0' }}
                    data={[
                        {
                            label: '撥券日',
                            val: '2022/05/26',
                        },
                        {
                            label: '計息天數',
                            val: '14 天',
                        },
                        {
                            label: '申購成本',
                            val: '143 元',
                            valStyle: {
                                color: '#f45a4c',
                            },
                        },
                    ]}
                />
                <InfoBox
                    title={'未中籤'}
                    style={{ marginTop: '17px', flex: '1 0 0' }}
                    data={[
                        {
                            label: '退款日',
                            val: '2022/05/26',
                        },
                        {
                            label: '計息天數',
                            val: '5 天',
                        },
                        {
                            label: '申購成本',
                            val: '78 元',
                            valStyle: {
                                color: '#f45a4c',
                            },
                        },
                    ]}
                />
            </div>
            <TimeLineBox style={{ marginTop: '16px' }} />
            <style jsx>{`
                .stock__container {
                    padding: 24px 30px 24px 28px;
                    border-radius: 2px;
                    border: solid 1px #d7e0ef;
                    background: white;
                }
                .stock__title {
                    font-size: 24px;
                    font-weight: bold;
                    color: #0d1623;
                    margin-bottom: 10px;
                }
                .stock__bar {
                    padding: 13px 16px;
                    border-radius: 2px;
                    border: solid 1px #ffd0c9;
                    background-color: #feefee;
                    display: flex;
                    justify-content: space-between;
                }
                .text {
                    font-size: 16px;
                    color: #f45a4c;
                }
                .mrgh {
                    margin-right: 10px;
                }
                .num {
                    font-size: 24px;
                }
                .text2 {
                    font-size: 16px;
                    letter-spacing: 0.4px;
                    color: #3f5372;
                }
                .stock__content {
                    display: flex;
                    justify-content: space-between;
                }
            `}</style>
        </div>
    );
};

export default StockDetail;
