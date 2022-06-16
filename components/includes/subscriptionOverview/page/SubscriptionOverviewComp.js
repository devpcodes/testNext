import { useState } from 'react';
import { useSelector } from 'react-redux';
import Breadcrumb from '../../breadcrumb/breadcrumb';
import LoanBox from '../elements/LoanBox';
import Btn from '../../loan/overview/elements/Btn';
import AccountSelect from '../elements/AccountSelect';
import TopTabBar from '../../../../components/includes/subBrokerage/elements/TopTabBar';
import AmountTable from '../elements/AmountTable';
import InterestTable from '../elements/InterestTable';
import icon from '../../../../resources/images/components/subscriptionOverview/ic-circle (2).svg';
const SubscriptionOverviewComp = () => {
    const [current, setCurrent] = useState('amount');
    const isMobile = useSelector(store => store.layout.isMobile);
    const menuList = [
        { key: 'amount', title: '額度使用紀錄' },
        { key: 'interest', title: '利息紀錄' },
    ];
    const tabClickHandler = key => {
        setCurrent(key);
    };
    return (
        <div className="subOverview__container">
            <div className="subOverview__bread">
                <Breadcrumb />
            </div>

            <div className="subOverview__head">
                {isMobile ? (
                    <div className="subOverview__mobileHead">
                        <h1 className="subOverview__title">申購信用通總覽</h1>
                        <img className="subOverview__icon" src={icon} />
                    </div>
                ) : (
                    <h1 className="subOverview__title">申購信用通總覽</h1>
                )}
                <div className="subOverview__control">
                    <Btn
                        text="申購信用通"
                        type="info"
                        style={{
                            width: '133px',
                            paddingLeft: '8px',
                            paddingRight: '8px',
                            marginRight: '16px',
                            display: isMobile ? 'none' : 'inline-block',
                        }}
                    />
                    <AccountSelect
                        accText={'帳戶資訊'}
                        data={['127–018-00008']}
                        value="127–018-00008"
                        style={{
                            height: '40px',
                            width: '100%',
                        }}
                    />
                </div>
            </div>
            <LoanBox />
            <div className="subOverview__down">
                {isMobile ? (
                    <div className="subOverview__downHead">
                        <h2 className="subOverview__h2">使用明細</h2>
                        <img className="subOverview__icon" src={icon} />
                    </div>
                ) : (
                    <h2 className="subOverview__h2">使用明細</h2>
                )}
                <div className="subOverview__downControl">
                    <span className="subOverview__updatePc">最後更新時間：2022.02.18 15:36</span>
                    <Btn
                        text="注意事項"
                        type="info"
                        style={{
                            marginLeft: '16px',
                        }}
                    />
                </div>
            </div>
            <div>
                <TopTabBar menuList={menuList} current={current} onClick={tabClickHandler} activeKey={current} />
                {current === 'amount' ? <AmountTable /> : <InterestTable />}
                <p className="subOverview__desc">僅提供近一年之使用明細，詳細資訊依永豐銀行公告為準。</p>
                <p className="subOverview__update">最後更新時間：2022.02.18 15:36</p>
            </div>
            <style jsx>{`
                .subOverview__update {
                    display: none;
                }
                .subOverview__updatePc {
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                    color: #3f5372;
                    display: inline-block;
                    margin-top: 10px;
                }
                .subOverview__container {
                    padding-top: 20px;
                    padding-left: 10%;
                    padding-right: 10%;
                }
                .subOverview__head {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 6px;
                }
                .subOverview__control {
                    display: flex;
                    justify-content: space-between;
                }
                .subOverview__title {
                    font-size: 28px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: 0.7px;
                    color: #0d1623;
                }
                .subOverview__h2 {
                    font-size: 28px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: 0.7px;
                    color: #0d1623;
                }
                .subOverview__down {
                    margin-top: 32px;
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 6px;
                }
                .subOverview__update {
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                    color: #3f5372;
                    display: inline-block;
                    margin-top: 10px;
                    display: none;
                }
                .subOverview__desc {
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                    color: #3f5372;
                    margin-top: -12px;
                    margin-bottom: 40px;
                }
                @media (max-width: 1024px) {
                    .subOverview__container {
                        padding-left: 5%;
                        padding-right: 5%;
                    }
                    .subOverview__bread {
                        width: 90%;
                    }
                }
                @media (max-width: 768px) {
                    .subOverview__container {
                        padding-left: 0;
                        padding-right: 0;
                    }
                    .subOverview__head {
                        /* width: 90%; */
                        padding: 0 16px;
                        display: block;
                    }
                    .subOverview__bread {
                        width: 90%;
                        padding-left: 16px;
                    }
                    .subOverview__mobileHead {
                        display: flex;
                        justify-content: space-between;
                    }
                    .subOverview__control {
                        margin-bottom: 15px;
                    }
                    .subOverview__icon {
                        margin-top: -13px;
                    }
                    .subOverview__down {
                        margin-top: 15px;
                        padding-left: 16px;
                    }
                    .subOverview__downControl {
                        display: none;
                    }
                    .subOverview__downHead {
                        display: flex;
                        justify-content: space-between;
                        width: 100%;
                        padding-right: 16px;
                    }
                    .subOverview__desc {
                        text-align: center;
                        margin-bottom: 16px;
                    }
                    .subOverview__update {
                        display: block;
                        text-align: center;
                        font-size: 14px;
                        font-weight: normal;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: normal;
                        letter-spacing: normal;
                        color: #3f5372;
                        margin-top: -12px;
                        margin-bottom: 40px;
                    }
                    .subOverview__updatePc {
                        display: none;
                    }
                }
            `}</style>
            <style jsx global>
                {`
                    .page__container {
                        background-color: #f9fbff;
                        padding-bottom: 32px;
                    }
                `}
            </style>
        </div>
    );
};

export default SubscriptionOverviewComp;
