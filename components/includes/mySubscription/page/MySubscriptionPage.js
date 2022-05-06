import Breadcrumb from '../../breadcrumb/breadcrumb';
import SubscriptionHeader from '../../subscription/subscriptionHeader';
// import AccountTable from '../../tradingAccount/vipInventory/AccountTable';
import MoneyContainer from '../elements/MoneyContainer';
import MySubscriptionTable from '../elements/MySubscriptionTable';

const MySubscriptionPage = () => {
    return (
        <div>
            <div className="subscription__head">
                <Breadcrumb />
                <SubscriptionHeader onSelect={() => {}} />
            </div>
            <MoneyContainer />
            <MySubscriptionTable />
            <style jsx>{`
                @media (max-width: 768px) {
                    .subscription__head {
                        margin: 0 5%;
                    }
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
