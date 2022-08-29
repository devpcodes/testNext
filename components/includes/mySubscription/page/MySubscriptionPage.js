import { useEffect, useState, useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUser } from '../../../../hooks/useUser';
import { showLoginHandler } from '../../../../store/components/layouts/action';
import Breadcrumb from '../../breadcrumb/breadcrumb';
import SubscriptionHeader from '../../subscription/subscriptionHeader';
// import AccountTable from '../../tradingAccount/vipInventory/AccountTable';
import MoneyContainer from '../elements/MoneyContainer';
import MySubscriptionTable from '../elements/MySubscriptionTable';

const MySubscriptionPage = () => {
    // const { isLogin } = useUser();
    const isLogin = useSelector(store => store.user.isLogin);
    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(false);
    const [payable, setPayable] = useState('--');
    const [receivable, setReceivable] = useState('--');
    const [applyStatus, setApplyStatus] = useState(false);
    const [init, setInit] = useState(false);

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
    const payableHandler = (payable, receivable) => {
        setPayable(payable);
        setReceivable(receivable);
    };
    const applyStatusHandler = boo => {
        setApplyStatus(boo);
    };
    console.log('refresh...........');
    return (
        <div>
            <div className="subscription__head">
                <Breadcrumb />
                <SubscriptionHeader onRefresh={onRefresh} />
            </div>
            <MoneyContainer payable={payable} receivable={receivable} applyStatusHandler={applyStatusHandler} />
            <MySubscriptionTable refresh={refresh} payableHandler={payableHandler} applyStatus={applyStatus} />
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
