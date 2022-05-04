import SubscriptionHeader from '../../subscription/subscriptionHeader';
// import AccountTable from '../../tradingAccount/vipInventory/AccountTable';
import MoneyBox from '../elements/MoneyBox';
import MySubscriptionTable from '../elements/MySubscriptionTable';

const MySubscriptionPage = () => {
    return (
        <div>
            <SubscriptionHeader onSelect={() => {}} />
            <div className="moneyBox__container">
                <MoneyBox
                    title="銀行交割餘額"
                    data={[
                        {
                            label: '交割帳號 1800-1809-1631',
                            val: '$135,000',
                        },
                    ]}
                    style={{ width: '50%', marginRight: 20 }}
                />
                <MoneyBox
                    style={{ width: '50%' }}
                    title="次一營業日申購款"
                    data={[
                        {
                            label: '應扣申購款',
                            val: '$35,070',
                        },
                        {
                            label: '應退申購款',
                            val: '$189,070',
                        },
                    ]}
                />
            </div>
            <MySubscriptionTable />
            <style>{`
                .moneyBox__container {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 18px;
                    margin-bottom: 17px;
                }
            `}</style>
            <style global jsx>{`
                .page__container {
                    background-color: #f9fbff;
                    padding-bottom: 32px;
                }
            `}</style>
        </div>
    );
};

export default MySubscriptionPage;
