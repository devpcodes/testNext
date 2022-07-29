import InfoBox from './InfoBox';
import TimeLineBox from './TimeLineBox';
import icon from '../../../../resources/images/components/subscriptionCalculation/basic-help-circle (4).svg';
import { useSelector } from 'react-redux';
import moment from 'moment';
const StockDetail = ({ calculationData }) => {
    const isMobile = useSelector(store => store.layout.isMobile);
    return (
        <div className="stock__container">
            <h2 className="stock__title">
                {(calculationData.stockId || '--') + ' ' + (calculationData.stockName || '--')}
            </h2>
            <div className="stock__bar">
                <div className="stock__left">
                    <span className="text mrgh">價差</span>
                    <span className="text num">{calculationData.diffPrice || '--'}</span>
                    <span className="text">
                        元 (
                        {Number(calculationData.diffRatio) > 0
                            ? '+' + (calculationData.diffRatio || '--') + '%'
                            : (calculationData.diffRatio || '--') + '%'}
                        )
                    </span>
                </div>
                <div className="stock__right">
                    <span className="text2">最低只要</span>
                    <span className="text num">{calculationData.nOrderCost || '--'}</span>
                    <span className="text2">元，買個中籤夢！</span>
                </div>
            </div>
            <div className="stock__content">
                <InfoBox
                    title={'中籤'}
                    titleTooltip={
                        <>
                            <p style={{ marginBottom: 5 }}>
                                1. 中籤股票於撥券日匯入，當日即可賣出其款項於成交後第二營業日入帳。
                            </p>
                            <p style={{ marginBottom: 5 }}>2. 借款申購中籤後，若仍有銀行欠款須自行完成銀行償還作業。</p>
                            <p style={{ marginBottom: 5 }}>3. 中籤計息天數：截止～撥券日賣出款入帳。</p>
                        </>
                    }
                    icon={icon}
                    style={{ marginTop: isMobile ? '12px' : '16px', marginRight: isMobile ? 0 : '17px', flex: '1 0 0' }}
                    data={[
                        {
                            label: '撥券日',
                            val: calculationData.stkDate ? moment(calculationData.stkDate).format('YYYY/MM/DD') : '--',
                        },
                        {
                            label: '計息天數',
                            val: (calculationData.wInterestDays || '--') + '天',
                        },
                        {
                            label: '申購成本',
                            val: (calculationData.wOrderCost || '--') + '元',
                            valStyle: {
                                color: '#f45a4c',
                            },
                        },
                    ]}
                />
                <InfoBox
                    title={'未中籤'}
                    titleTooltip={
                        <>
                            <p style={{ marginBottom: 5 }}>
                                1. 未中籤於退款日退款後，將依您銀行私房錢欠款完成後續償還作業。
                            </p>
                            <p style={{ marginBottom: 5 }}>
                                2. 不合格申購未提供銀行系統償還服務，若您私房錢仍有欠款須自行償還。
                            </p>
                            <p style={{ marginBottom: 5 }}>3. 未中籤計息天數：截止～退款日。</p>
                        </>
                    }
                    icon={icon}
                    style={{ marginTop: isMobile ? '12px' : '16px', flex: '1 0 0' }}
                    data={[
                        {
                            label: '退款日',
                            val: calculationData.moneyDate
                                ? moment(calculationData.moneyDate).format('YYYY/MM/DD')
                                : '--',
                        },
                        {
                            label: '計息天數',
                            val: (calculationData.nInterestDays || '--') + '天',
                        },
                        {
                            label: '申購成本',
                            val: (calculationData.nOrderCost || '--') + '元',
                            valStyle: {
                                color: '#f45a4c',
                            },
                        },
                    ]}
                />
            </div>
            <TimeLineBox
                style={{ marginTop: isMobile ? '12px' : '16px' }}
                price={calculationData.price}
                close={calculationData.close}
                share={calculationData.share}
                applyShare={calculationData.applyShare}
                stockData={calculationData}
            />
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
                @media (max-width: 768px) {
                    .stock__container {
                        padding: 16px;
                        border-left: none;
                        border-right: none;
                    }
                    .stock__bar {
                        display: block;
                        text-align: center;
                    }
                    .stock__content {
                        display: block;
                    }
                }
            `}</style>
        </div>
    );
};

export default StockDetail;
