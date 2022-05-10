import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useUser } from '../../../../hooks/useUser';
import { showLoginHandler } from '../../../../store/components/layouts/action';
import Breadcrumb from '../../breadcrumb/breadcrumb';
import SubscriptionHeader from '../../subscription/subscriptionHeader';
// import AccountTable from '../../tradingAccount/vipInventory/AccountTable';
import MoneyContainer from '../elements/MoneyContainer';
import MySubscriptionTable from '../elements/MySubscriptionTable';

const MySubscriptionPage = () => {
    const { isLogin } = useUser();
    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        if (!isLogin) {
            dispatch(showLoginHandler(true));
        }
    }, [isLogin]);
    const onRefresh = () => {
        setRefresh(true);
        setTimeout(() => {
            setRefresh(false);
        }, 500);
    };
    return (
        <div>
            <div className="subscription__head">
                <Breadcrumb />
                <SubscriptionHeader onSelect={() => {}} onRefresh={onRefresh} />
            </div>
            <MoneyContainer />
            <MySubscriptionTable refresh={refresh} />
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
