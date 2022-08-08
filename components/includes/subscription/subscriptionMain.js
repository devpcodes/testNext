import { message } from 'antd';
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
import { useRouter } from 'next/router';
import { objectToQueryHandler } from '../../../services/objectToQueryHandler';
import { formatNum } from '../../../services/formatNum';

const SubscriptionMain = memo(({}) => {
    const isMobile = useSelector(store => store.layout.isMobile);
    const [subscriptionData, setSubscriptionData] = useState([]);
    const isLogin = useSelector(store => store.user.isLogin);
    const currentAccount = useSelector(store => store.user.currentAccount.account);
    const currentBrokerID = useSelector(store => store.user.currentAccount.broker_id);
    const idno = useSelector(store => store.user.currentAccount.idno);
    const userName = useSelector(store => store.user.currentAccount.username);
    const dispatch = useDispatch();
    const router = useRouter();

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
            if (branch && account) {
                const response = await fetchLoginSubscriptionList(token, branch, account);
                if (response.success && response.message === 'OK') {
                    setSubscriptionData(response.result);
                }
            }
        }
    }, [currentAccount, currentBrokerID]);

    const renderAdv = () => {
        return (
            <div className="subscriptionCards">
                <SubscriptionAdv />
            </div>
        );
    };

    const submitSubscription = useCallback(async (name, id, price, isAppropriation) => {
        const branch = currentBrokerID;
        const account = currentAccount;
        const token = getToken();
        const bankChannel = isMobile ? 'MWEB' : 'NETBANK';

        if (!isLogin) {
            const query = router.query;
            const queryStr = objectToQueryHandler(query);

            window.location =
                `${process.env.NEXT_PUBLIC_SUBPATH}` +
                `/SinoTrade_login${queryStr}` +
                `${queryStr ? '&' : '?'}` +
                `redirectUrl=${router.pathname}`;
            return false;
        }

        dispatch(
            setModal({
                visible: true,
                title: isAppropriation ? '提醒' : '申購確認',
                content: (
                    <div>
                        {isAppropriation ? (
                            <p>
                                離開永豐金證券理財網前往永豐銀MMA的列車即將出發，如確定上車請點選
                                【確定】，如還捨不得離開請點【取消】。
                            </p>
                        ) : (
                            <p>
                                帳號：{currentBrokerID}-{currentAccount} <br />
                                商品：{id} {name} <br />
                                申購扣款金額： {formatNum(price)} 元 <br />
                                <br />
                                <span className="notice">
                                    請於申購截止日確認銀行存款餘額應有申購扣款金額，否則為不合格件。
                                </span>
                            </p>
                        )}
                    </div>
                ),
                type: 'confirm',
                onOk: async () => {
                    const cert = await signCert({ idno: idno }, true, getToken());
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
                            // dispatch(
                            //     setModal({
                            //         visible: true,
                            //         content: response.success && response.message === 'OK' ? `委託預約中` : `申購失敗`,
                            //         type: 'info',
                            //         title: '系統訊息',
                            //     }),
                            // );
                            if (response.success && response.message === 'OK') {
                                message.success({
                                    content: (
                                        <>
                                            <h4 className="msg__title">委託預約中</h4>
                                            <p className="msg__content">
                                                請於申購截止日確認銀行存款餘額應有申購扣款金額，否則為不合格件。
                                            </p>
                                        </>
                                    ),
                                    className: 'msg__box',
                                    duration: 4,
                                });
                            } else {
                                message.error({
                                    content: (
                                        <>
                                            <h4 className="msg__title">委託失敗</h4>
                                            <p className="msg__content">
                                                {response.message ? response.message : '委託失敗'}
                                            </p>
                                        </>
                                    ),
                                    className: 'msg__box',
                                    duration: 4,
                                });
                            }
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
                    dispatch(setModal({ visible: false }));
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
                title: isAppropriation ? '取消申購及動用' : '取消申購',
                content: (
                    <div>
                        <p>
                            {isAppropriation
                                ? '請確認是否取消以下申購項目並同步取消動用'
                                : '請確認是否取消以下申購項目'}
                            <br />
                            <br />
                            帳號：{currentBrokerID}-{currentAccount} <br />
                            商品：{id} {name} <br />
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
                        // dispatch(
                        //     setModal({
                        //         visible: true,
                        //         content: response.success && response.message === 'OK' ? `已成功取消申購` : `取消失敗`,
                        //         type: 'info',
                        //         title: '系統訊息',
                        //     }),
                        // );
                        if (response.success && response.message === 'OK') {
                            message.success({
                                content: (
                                    <>
                                        <h4 className="msg__title">
                                            {isAppropriation ? '已成功取消申購及動用' : '已成功取消申購'}
                                        </h4>
                                        <p className="msg__content">
                                            {`已成功取消申購 「${id} ${name}」${isAppropriation ? '及動用' : ''}`}
                                        </p>
                                    </>
                                ),
                                className: 'msg__box',
                                duration: 4,
                            });
                        } else {
                            message.error({
                                content: (
                                    <>
                                        <h4 className="msg__title">委託取消失敗</h4>
                                        <p className="msg__content">
                                            {response.message ? response.message : '委託取消失敗'}
                                        </p>
                                    </>
                                ),
                                className: 'msg__box',
                                duration: 4,
                            });
                        }

                        const listResponse = await fetchLoginSubscriptionList(token, branch, account);
                        if (listResponse.success && listResponse.message === 'OK') {
                            setSubscriptionData(listResponse.result);
                        }
                    }
                    dispatch(setModal({ visible: false }));
                },
            }),
        );
    });

    return (
        <>
            <div className="subscriptionMain__container">
                <div className="subscription__head">
                    <Breadcrumb />
                    <SubscriptionHeader />
                </div>
                <div className="subscription__cards__block">
                    {!!subscriptionData &&
                        subscriptionData.map((stockData, stockIndex) => (
                            <>
                                <div className="subscriptionCards">
                                    <SubscriptionCards
                                        stockData={stockData}
                                        onActionClick={submitSubscription}
                                        onCancelClick={cancelSubscription}
                                    />
                                </div>
                                {subscriptionData.length >= 3 && stockIndex == 1 ? (
                                    renderAdv()
                                ) : subscriptionData.length < 3 && stockIndex == 0 ? (
                                    renderAdv()
                                ) : (
                                    <></>
                                )}
                            </>
                        ))}
                    {subscriptionData.length == 0 ? renderAdv() : <></>}
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
                    .subscription__head {
                        margin: 0px 5%;
                    }
                }
            `}</style>
            <style jsx global>{`
                .notice {
                    color: #c43826;
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
                .ant-message-notice-content {
                    text-align: left;
                    padding: 20px 20px 15px 20px;
                }
                .msg__title {
                    display: inline;
                    font-weight: bold;
                }
                .msg__content {
                    margin: 7px 5px 0px 24px;
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
            `}</style>
        </>
    );
});

export default SubscriptionMain;
