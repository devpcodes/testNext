import { Modal } from 'antd';
import { useCallback, useState, useEffect, memo } from 'react';
import SubscriptionHeader from '../subscription/subscriptionHeader';
import SubscriptionCards from '../subscription/subscriptionCards';
import SubscriptionAdv from '../subscription/subscriptionAdv';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubscriptionList } from '../../../services/components/subscription/fetchSubscriptionList';
import { fetchLoginSubscriptionList } from '../../../services/components/subscription/fetchLoginSubscriptionList';
import { fetchApplySubscription } from '../../../services/components/subscription/fetchApplySubscription';
import { fetchCancelSubscription } from '../../../services/components/subscription/fetchCancelSubscription';
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

    const submitSubscription = useCallback(async (name, id, price, isAppropriation) => {
        const branch = currentBrokerID;
        const account = currentAccount;
        const token = getToken();
        const bankChannel = isMobile ? 'MWEB' : 'NETBANK';
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
                    console.log(cert);
                    if (cert.signature) {
                        const response = await fetchApplySubscription(
                            token,
                            branch,
                            account,
                            id,
                            cert,
                            'h',
                            isAppropriation,
                            bankChannel,
                        );
                        if (!isAppropriation) {
                            dispatch(
                                setModal({
                                    visible: true,
                                    content: response.success && response.message === 'OK' ? `申購成功` : `申購失敗`,
                                    type: 'info',
                                    title: '系統訊息',
                                }),
                            );
                        } else {
                            if (response.success && response.message === 'OK') {
                                location.href = response.result.url;
                            }
                        }

                        const listResponse = await fetchLoginSubscriptionList(token, branch, account);
                        if (listResponse.success && listResponse.message === 'OK') {
                            setSubscriptionData(listResponse.result);
                        }
                    }
                },
            }),
        );
    });

    const cancelSubscription = useCallback(async (name, id, price, isAppropriation) => {
        const branch = currentBrokerID;
        const account = currentAccount;
        const token = getToken();
        dispatch(
            setModal({
                visible: true,
                title: '取消確認',
                content: (
                    <div>
                        <p>
                            帳號：{currentBrokerID}-{currentAccount} {userName} <br />
                            商品：{id} {name} <br />
                            {/* 申購扣款金額： {price} 元 <br />
                            <br />
                            <span className="notice">
                                請於申購截止日確認銀行存款餘額應有申購扣款金額，否則為不合格件。
                            </span> */}
                        </p>
                    </div>
                ),
                type: 'confirm',
                onOk: async () => {
                    const cert = await signCert({ idno: idno }, true, getToken());
                    if (cert.signature) {
                        const response = await fetchCancelSubscription(
                            token,
                            branch,
                            account,
                            id,
                            cert,
                            'h',
                            isAppropriation,
                        );
                        dispatch(
                            setModal({
                                visible: true,
                                content: response.success && response.message === 'OK' ? `取消成功` : `取消失敗`,
                                type: 'info',
                                title: '系統訊息',
                            }),
                        );
                        const listResponse = await fetchLoginSubscriptionList(token, branch, account);
                        if (listResponse.success && listResponse.message === 'OK') {
                            setSubscriptionData(listResponse.result);
                        }
                    }
                    console.log('test');
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
                            <div className="subscriptionCards">
                                <SubscriptionCards
                                    stockData={stockData}
                                    onActionClick={submitSubscription}
                                    onCancelClick={cancelSubscription}
                                />
                            </div>
                        ))}
                    <div className="subscriptionCards">
                        <SubscriptionAdv />
                    </div>
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
                .subscriptionCards {
                    border: solid 1px #d7e0ef;
                    padding: 24px;
                    width: 30%;
                    margin-top: 24px;
                    height: 400px;
                    max-height: 400px;
                    min-height: 400px;
                    margin-bottom: 20px;
                    margin-right: 5%;
                }
                .subscriptionCards:nth-child(3n) {
                    margin-right: 0;
                }
                @media (max-width: 1600px) {
                    .subscriptionCards {
                        width: 48%;
                        margin-right: 2%;
                    }

                    .subscriptionCards:nth-child(3n) {
                        margin-right: 2%;
                    }

                    .subscriptionCards:nth-child(2n) {
                        margin-right: 0;
                    }
                }
                @media (max-width: 1000px) {
                    .subscriptionCards {
                        width: 100%;
                        margin-right: 0%;
                    }

                    .subscriptionCards:nth-child(3n) {
                        margin-right: 0%;
                    }

                    .subscriptionCards:nth-child(2n) {
                        margin-right: 0;
                    }
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
