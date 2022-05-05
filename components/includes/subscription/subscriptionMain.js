import { Modal } from 'antd';
import { useCallback, useState, useEffect, memo } from 'react';
import SubscriptionHeader from '../subscription/subscriptionHeader';
import SubscriptionCards from '../subscription/subscriptionCards';
import SubscriptionAdv from '../subscription/subscriptionAdv';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubscriptionList } from '../../../services/components/subscription/fetchSubscriptionList';
import { fetchLoginSubscriptionList } from '../../../services/components/subscription/fetchLoginSubscriptionList';
import { fetchApplySubscription } from '../../../services/components/subscription/fetchApplySubscription';
import { getToken } from '../../../services/user/accessToken';
import { setModal } from '../../../store/components/layouts/action';
import Breadcrumb from '../breadcrumb/breadcrumb';
import { checkSignCA, sign, signCert } from '../../../services/webCa';

const SubscriptionMain = memo(({}) => {
    const isMobile = useSelector(store => store.layout.isMobile);
    const [subscriptionData, setSubscriptionData] = useState([]);
    const isLogin = useSelector(store => store.user.isLogin);
    const currentAccount = useSelector(store => store.user.currentAccount.account);
    const currentBrokerID = useSelector(store => store.user.currentAccount.broker_id);
    const idno = useSelector(store => store.user.currentAccount.idno);
    const userName = useSelector(store => store.user.currentAccount.username);
    const dispatch = useDispatch();

    useEffect(async () => {
        if (!isLogin) {
            const response = await fetchSubscriptionList();
            if (response.success && response.message === 'OK') {
                setSubscriptionData(response.result);
            }
        }
    }, []);

    useEffect(async () => {
        if (isLogin) {
            const branch = currentBrokerID;
            const account = currentAccount;
            const token = getToken();
            const response = await fetchLoginSubscriptionList(token, branch, account);
            if (response.success && response.message === 'OK') {
                setSubscriptionData(response.result);
            }
        }
    }, [currentAccount, currentBrokerID]);

    const submitSubscription = useCallback(async (name, id, price) => {
        const branch = currentBrokerID;
        const account = currentAccount;
        const token = getToken();
        dispatch(
            setModal({
                visible: true,
                title: '申購確認',
                content: (
                    <div>
                        <p>
                            帳號：{currentBrokerID}-{currentAccount} {userName} <br />
                            商品：{id} {name} <br />
                            申購扣款金額： {price} 元 <br />
                            <br />
                            <span className="notice">
                                請於申購截止日確認銀行存款餘額應有申購扣款金額，否則為不合格件。
                            </span>
                        </p>
                    </div>
                ),
                type: 'confirm',
                onOk: async () => {
                    const cert = await signCert({ idno: idno }, true, getToken());
                    const response = await fetchApplySubscription(token, branch, account, id, '0.0.0.0', cert);
                    alert(JSON.stringify(response));
                    dispatch(
                        setModal({
                            visible: true,
                            content: `${response.message}`,
                            type: 'info',
                            title: '系統訊息',
                        }),
                    );
                },
            }),
        );
    });

    return (
        <>
            <div className="subscriptionMain__container">
                <Breadcrumb />
                <SubscriptionHeader />
                <div className="subscription__cards__block">
                    {!!subscriptionData &&
                        subscriptionData.map((stockData, stockIndex) => (
                            <SubscriptionCards stockData={stockData} onActionClick={submitSubscription} />
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
            <style jsx global>{`
                .notice {
                    color: #c43826;
                }
            `}</style>
        </>
    );
});

export default SubscriptionMain;
