import { Modal } from 'antd';
import { useCallback, useState, useEffect, memo } from 'react';
import SubscriptionHeader from '../subscription/subscriptionHeader';
import SubscriptionCards from '../subscription/subscriptionCards';
import SubscriptionAdv from '../subscription/subscriptionAdv';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubscriptionList } from '../../../services/components/subscription/getSubscriptionList';
import { fetchLoginSubscriptionList } from '../../../services/components/subscription/getLoginSubscriptionList';
import { getToken } from '../../../services/user/accessToken';
import { setModal } from '../../../store/components/layouts/action';

const SubscriptionMain = memo(({}) => {
    const isMobile = useSelector(store => store.layout.isMobile);
    const [subscriptionData, setSubscriptionData] = useState([]);
    const isLogin = useSelector(store => store.user.isLogin);
    const accounts = useSelector(store => store.user.accounts);
    const [activeAccount, setActiveAccount] = useState('');
    const dispatch = useDispatch();

    useEffect(async () => {
        console.log('==============================================================');
        console.log(isLogin);
        console.log(activeAccount);
        console.log('==============================================================');
        if (!isLogin) {
            const response = await fetchSubscriptionList();
            if (response.success && response.message === 'OK') {
                setSubscriptionData(response.result);
            }
        }
    }, []);

    useEffect(async () => {
        console.log('=====0000000000000000000000000000=============');
        console.log(isLogin);
        console.log(activeAccount);
        console.log('=======0000000000000000000000000=====================');
        if (isLogin) {
            const branch = activeAccount.split('-')[0];
            const account = activeAccount.split('-')[1];
            const token = getToken();
            const response = await fetchLoginSubscriptionList(token, branch, account);
            if (response.success && response.message === 'OK') {
                setSubscriptionData(response.result);
            }
        }
    }, [activeAccount]);

    const selectHandler = useCallback(val => {
        console.log(val);
        setActiveAccount(val);
    }, []);

    const onTest = useCallback(async type => {
        dispatch(setModal({ visible: true, content: type, type: 'info', title: '系統訊息' }));
    });

    useEffect(async () => {
        console.log('00000000000000000000000000000000000000000000000000000000');
        console.log(activeAccount);
        console.log('00000000000000000000000000000000000000000000000000000000');
    }, [activeAccount]);

    return (
        <>
            <div className="subscriptionMain__container">
                <SubscriptionHeader onSelect={selectHandler} />
                <div className="subscription__cards__block">
                    {!!subscriptionData &&
                        subscriptionData.map((stockData, stockIndex) => (
                            <SubscriptionCards stockData={stockData} onActionClick={onTest} />
                        ))}
                    <SubscriptionAdv />
                </div>
            </div>

            <style jsx>{`
                .subscriptionMain__container {
                    padding-left: 10%;
                    padding-right: 10%;
                    padding-top: 20px;
                }
                .subscription__cards__block {
                    display: flex;
                    justify-content: flex-start;
                    flex-wrap: wrap;
                }
                @media (max-width: 768px) {
                    .subscriptionMain__container {
                        padding-left: 0;
                        padding-right: 0;
                    }
                }
            `}</style>
        </>
    );
});

export default SubscriptionMain;
