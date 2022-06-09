import { useState } from 'react';
import Breadcrumb from '../../breadcrumb/breadcrumb';
import LoanBox from '../elements/LoanBox';
import Btn from '../../loan/overview/elements/Btn';
import AccountSelect from '../elements/AccountSelect';
import TopTabBar from '../../../../components/includes/subBrokerage/elements/TopTabBar';
import AmountTable from '../elements/AmountTable';
const SubscriptionOverviewComp = () => {
    const [current, setCurrent] = useState('amount');
    const menuList = [
        { key: 'amount', title: '額度使用紀錄' },
        { key: 'interest', title: '利息紀錄' },
    ];
    const tabClickHandler = () => {};
    return (
        <div className="subOverview__container">
            <Breadcrumb />
            <div className="subOverview__head">
                <h1 className="subOverview__title">申購信用通總覽</h1>
                <div className="subOverview__control">
                    <Btn
                        text="申購信用通"
                        type="info"
                        style={{
                            width: '133px',
                            paddingLeft: '8px',
                            paddingRight: '8px',
                            marginRight: '16px',
                        }}
                    />
                    <AccountSelect
                        accText={'帳戶資訊'}
                        data={['127–018-00008']}
                        value="127–018-00008"
                        style={{
                            height: '40px',
                        }}
                    />
                </div>
            </div>
            <LoanBox />
            <div className="subOverview__down">
                <h2 className="subOverview__h2">使用明細</h2>
                <div>
                    <span className="subOverview__update">最後更新時間：2022.02.18 15:36</span>
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
                <AmountTable />
            </div>
            <style jsx>{`
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
                }
                @media (max-width: 1024px) {
                    .subOverview__container {
                        padding-left: 5%;
                        padding-right: 5%;
                    }
                }
                @media (max-width: 768px) {
                    .subOverview__container {
                        padding-left: 0;
                        padding-right: 0;
                    }
                }
            `}</style>
        </div>
    );
};

export default SubscriptionOverviewComp;
