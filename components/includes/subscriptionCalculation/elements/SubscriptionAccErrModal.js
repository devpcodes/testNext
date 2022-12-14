import { useEffect, memo, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useCheckSubscriptionAcc } from '../../../../hooks/useCheckSubscriptionAcc';
// import { useUser } from '../../../../hooks/useUser';
import { setModal } from '../../../../store/components/layouts/action';
import { setCurrentAccount } from '../../../../store/user/action';
import { getToken } from '../../../../services/user/accessToken';
import { fetchAccountStatus } from '../../../../services/components/subscriptionOverview/fetchAccountStatus';
import { formatNum } from '../../../../services/formatNum';

const SubscriptionAccErrModal = memo(
    ({ checkAccount, successHandler, allOrderAmount, availAmount, stockId, stockName }) => {
        const currentAccount = useSelector(store => store.user.currentAccount);
        const userSetting = useSelector(store => store.user.userSettings);
        const dispatch = useDispatch();
        const [applyStatus, signAcc, accountInfo] = useCheckSubscriptionAcc();
        const isLogin = useSelector(store => store.user.isLogin);
        const accounts = useSelector(store => store.user.accounts);
        // const { isLogin, accounts } = useUser();
        const [accountStatus, setAccountStatus] = useState({});

        const [freezeSucces, setFreezeSuccess] = useState(false);
        const [bankAccSuccess, setBankAccSuccess] = useState(false);
        const [signSuccess, setSignSuccess] = useState(false);
        const [selectAccSuccess, setSelectAccSuccess] = useState(false);
        const [noAcc, setNoAcc] = useState(false);
        const [amountSuccess, setAmountSuccess] = useState(false);
        const [stockData, setStockData] = useState(false);
        const [userIdAcc, setUserIdAcc] = useState(false);
        const router = useRouter();

        useEffect(() => {
            getLoanAccountStatus();
        }, [isLogin]);

        useEffect(() => {
            if (stockName && stockName != null) {
                setStockData(true);
            }
        }, [stockName]);

        useEffect(() => {
            setUserIdAcc(false);
            setSelectAccSuccess(false);
        }, [currentAccount]);

        useEffect(() => {
            console.log('check', checkAccount);

            if (!checkAccount) return;

            // if (signAcc) {
            //     if (applyStatus && accountInfo.applyStatus != null) {
            //         //?????????????????????????????????
            //         checkAccSelectErr();
            //     } else {
            //         //???????????????
            //         noAccHandler();
            //     }
            // }
            if (applyStatus && accountInfo.applyStatus != null) {
                //?????????????????????????????????
                checkAccSelectErr();
                //??????id
                checkUserIdAcc();
            } else {
                //???????????????
                noAccHandler();
            }
        }, [applyStatus, accountInfo, signAcc, checkAccount, currentAccount]);

        useEffect(() => {
            if (!checkAccount) return;
            //???????????????
            if (!signAcc && applyStatus) {
                dispatch(
                    setModal({
                        visible: true,
                        type: 'confirm',
                        noCloseIcon: true,
                        noTitleIcon: true,
                        title: '??????',
                        content: (
                            <>
                                <p>
                                    ?????????????????????????????????????????????????????????????????????????????????????????????????????????/???????????????????????????????????????????????????
                                </p>
                                <p style={{ color: '#c43826' }}>
                                    ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                </p>
                            </>
                        ),
                        bodyStyle: {
                            padding: '16px 24px',
                        },
                        onOk: () => {
                            onClick(false);
                            dispatch(setModal({ visible: false }));
                            window.location = process.env.NEXT_PUBLIC_SUBSCRIPTION_BANKSIGN;
                        },
                        okText: '????????????',
                        onCancel: () => {
                            onClick(false);
                            dispatch(setModal({ visible: false }));
                        },
                        okButtonProps: {
                            style: {
                                background: '#c43826',
                                width: '95px',
                            },
                        },
                    }),
                );
            } else {
                setSignSuccess(true);
            }
        }, [signAcc, applyStatus, checkAccount]);

        useEffect(() => {
            if (!checkAccount) return;
            // console.log('231312123', accountInfo.bankAccount, accountStatus.lnMainAccount)
            //?????? ????????? ??????
            if (applyStatus && signAcc) {
                if (accountInfo.bankAccount !== accountStatus.repayAccount) {
                    //TODO MOCK
                    // setBankAccSuccess(true);
                    dispatch(
                        setModal({
                            visible: true,
                            okText: '??????',
                            type: 'info',
                            noCloseIcon: true,
                            noTitleIcon: true,
                            title: '???????????????',
                            content: (
                                <>
                                    <p style={{ marginBottom: 12, color: '#0d1623' }}>
                                        ????????????????????????????????????????????????
                                        ??????????????????????????????????????????????????????????????????????????????????????????
                                    </p>

                                    <p style={{ fontWeight: 'bold', color: '#0d1623', marginBottom: 12 }}>
                                        ??????????????????
                                    </p>
                                    <div
                                        style={{
                                            border: '1px solid ##d7e0ef',
                                            borderRadius: '2px',
                                            backgroundColor: '#e6ebf5',
                                            padding: '9px 13px',
                                            color: '#3f5372',
                                            marginBottom: '12px',
                                        }}
                                    >
                                        {accountInfo.bankAccount}
                                    </div>
                                    <p style={{ fontWeight: 'bold', color: '#0d1623', marginBottom: 12 }}>
                                        ??????????????????
                                    </p>
                                    <div
                                        style={{
                                            border: '1px solid ##d7e0ef',
                                            borderRadius: '2px',
                                            backgroundColor: '#e6ebf5',
                                            padding: '9px 13px',
                                            color: '#3f5372',
                                            marginBottom: '12px',
                                        }}
                                    >
                                        {accountStatus.repayAccount}
                                    </div>
                                    <p style={{ color: '#0d1623', marginBottom: 12 }}>
                                        ??????????????????<span style={{ color: '#c43826' }}>(02)2349-5004</span>
                                    </p>
                                </>
                            ),
                            onOk: () => {
                                // setAccHandler(accounts, accountInfo.account);
                                onClick(false);
                                dispatch(setModal({ visible: false }));
                            },
                            onCancel: () => {
                                onClick(false);
                                dispatch(setModal({ visible: false }));
                            },
                        }),
                    );
                    return;
                } else {
                    setBankAccSuccess(true);
                }
            }
        }, [accountStatus, accountInfo, checkAccount, applyStatus, signAcc]);

        useEffect(() => {
            if (!checkAccount) return;
            if (applyStatus && signAcc) {
                console.log('00000', availAmount, allOrderAmount);
                if (Number(availAmount) < Number(allOrderAmount)) {
                    //??????????????????
                    setAmountSuccess(false);
                    amountErrorHandler(availAmount, allOrderAmount, stockId, stockName);
                } else {
                    setAmountSuccess(true);
                }
            }
        }, [availAmount, allOrderAmount, checkAccount, applyStatus, signAcc]);

        useEffect(() => {
            if (!checkAccount) return;

            if (applyStatus && signAcc) {
                if (accountStatus.legalFee !== '0') {
                    freezeHandler();
                    return;
                }

                if (!(accountStatus.frozenFlag === 'N' || accountStatus.frozenFlag === '')) {
                    freezeHandler();
                    return;
                }

                if (accountStatus.overDueDays !== '0') {
                    freezeHandler();
                    return;
                }

                if (accountStatus.availAmount <= '0') {
                    freezeHandler();
                    return;
                }

                const currentDate = moment().format('YYYYMMDD');
                if (moment(accountStatus.locExpDate).isBefore(moment(currentDate))) {
                    freezeHandler();
                    return;
                }

                setFreezeSuccess(true);
            }
        }, [accountStatus, checkAccount, applyStatus, signAcc]);

        const getLoanAccountStatus = async () => {
            try {
                const res = await fetchAccountStatus(getToken());
                console.log('----res', res);
                setAccountStatus(res);
            } catch (error) {}
        };

        const amountErrorHandler = (availAmount, allOrderAmount, stockId, stockName) => {
            dispatch(
                setModal({
                    visible: true,
                    okText: '??????',
                    type: 'info',
                    noCloseIcon: true,
                    noTitleIcon: true,
                    title: '??????????????????',
                    content: (
                        <>
                            <p style={{ marginBottom: 12, color: '#0d1623', fontWeight: 'bold' }}>??????</p>
                            <div
                                style={{
                                    border: '1px solid ##d7e0ef',
                                    borderRadius: '2px',
                                    backgroundColor: '#e6ebf5',
                                    padding: '9px 13px',
                                    color: '#3f5372',
                                    marginTop: '5px',
                                    marginBottom: '12px',
                                }}
                            >
                                {stockName + ' ' + stockId}
                            </div>
                            <p style={{ marginBottom: 12, color: '#0d1623', fontWeight: 'bold' }}>???????????????????????????</p>
                            <div
                                style={{
                                    border: '1px solid ##d7e0ef',
                                    borderRadius: '2px',
                                    backgroundColor: '#e6ebf5',
                                    padding: '9px 13px',
                                    color: '#3f5372',
                                    marginTop: '5px',
                                    marginBottom: '12px',
                                }}
                            >
                                {formatNum(allOrderAmount)}
                            </div>
                            <p style={{ marginBottom: 12, color: '#0d1623', fontWeight: 'bold' }}>????????????</p>
                            <div
                                style={{
                                    border: '1px solid ##d7e0ef',
                                    borderRadius: '2px',
                                    backgroundColor: '#e6ebf5',
                                    padding: '9px 13px',
                                    color: '#3f5372',
                                    marginTop: '5px',
                                    marginBottom: '12px',
                                }}
                            >
                                {formatNum(availAmount)}
                            </div>
                        </>
                    ),
                    onOk: () => {
                        onClick(false);
                        dispatch(setModal({ visible: false }));
                    },
                }),
            );
        };

        const noAccHandler = () => {
            console.log('applyStatus', applyStatus);
            dispatch(
                setModal({
                    visible: true,
                    type: 'confirm',
                    noCloseIcon: true,
                    noTitleIcon: true,
                    title: '????????????????????????',
                    content: '?????????????????????????????????????????????????????????????????????',
                    onOk: () => {
                        onClick(false);
                        dispatch(setModal({ visible: false }));
                        router.push('/subscriptionArea/ProductInfo');
                    },
                    onCancel: () => {
                        onClick(false);
                        dispatch(setModal({ visible: false }));
                    },
                }),
            );
        };

        const checkAccSelectErr = () => {
            console.log('account', currentAccount.account, accountInfo.account);
            if (currentAccount.account !== accountInfo.account) {
                dispatch(
                    setModal({
                        visible: true,
                        okText: '????????????',
                        type: 'info',
                        noCloseIcon: true,
                        noTitleIcon: true,
                        title: '????????????????????????',
                        content: (
                            <>
                                <p style={{ marginBottom: 0, color: '#0d1623' }}>??????????????????????????????1?????????</p>
                                <p style={{ marginBottom: 0, color: '#0d1623' }}>?????????????????????????????????????????????</p>
                                <div
                                    style={{
                                        border: '1px solid ##d7e0ef',
                                        borderRadius: '2px',
                                        backgroundColor: '#e6ebf5',
                                        padding: '9px 13px',
                                        color: '#3f5372',
                                        marginTop: '5px',
                                        marginBottom: '5px',
                                    }}
                                >
                                    {accountInfo.branch + '-' + accountInfo.account}
                                </div>
                                <p style={{ marginBottom: 0, color: '#0d1623' }}>?????????????????????????????????????????????</p>
                            </>
                        ),
                        onOk: () => {
                            setAccHandler(accounts, accountInfo.account);
                            onClick(false);
                            dispatch(setModal({ visible: false }));
                        },
                        onCancel: () => {
                            onClick(false);
                            dispatch(setModal({ visible: false }));
                        },
                    }),
                );
            } else {
                setNoAcc(true);
                setSelectAccSuccess(true);
            }
        };

        const checkUserIdAcc = () => {
            if (currentAccount.idno != null && userSetting.confirmAfterStockOrdered != null) {
                console.log('accountInfo', accountInfo, currentAccount.idno);
                if (accountInfo.userId !== currentAccount.idno) {
                    console.log('accountInfo', accountInfo);
                    dispatch(
                        setModal({
                            visible: true,
                            okText: '????????????',
                            type: 'confirm',
                            noCloseIcon: true,
                            noTitleIcon: true,
                            title: '??????',
                            content: (
                                <>
                                    <p style={{ marginBottom: 0, color: '#0d1623' }}>
                                        ?????????????????????????????????????????????????????????????????????????????????
                                    </p>
                                    {/* <p style={{ marginBottom: 0, color: '#0d1623' }}>?????????????????????????????????????????????</p>
                                    <div
                                        style={{
                                            border: '1px solid ##d7e0ef',
                                            borderRadius: '2px',
                                            backgroundColor: '#e6ebf5',
                                            padding: '9px 13px',
                                            color: '#3f5372',
                                            marginTop: '5px',
                                            marginBottom: '5px',
                                        }}
                                    >
                                        {accountInfo.branch + '-' + accountInfo.account}
                                    </div>
                                    <p style={{ marginBottom: 0, color: '#0d1623' }}>?????????????????????????????????????????????</p> */}
                                </>
                            ),
                            onOk: () => {
                                setAccHandler(accounts, accountInfo.account);
                                onClick(false);
                                dispatch(setModal({ visible: false }));
                            },
                            onCancel: () => {
                                onClick(false);
                                dispatch(setModal({ visible: false }));
                            },
                        }),
                    );
                    setUserIdAcc(false);
                } else {
                    setUserIdAcc(true);
                }
            }
        };

        const onClick = () => {
            // setCheckSuccess.push([])
        };

        const freezeHandler = () => {
            dispatch(
                setModal({
                    visible: true,
                    type: 'info',
                    noCloseIcon: true,
                    noTitleIcon: true,
                    title: '????????????',
                    content: (
                        <>
                            <p style={{ marginBottom: 0, color: '#0d1623' }}>?????????????????????????????????????????????</p>
                            <p style={{ marginBottom: 0, color: '#0d1623', display: 'inline-block' }}>
                                ?????????????????? <span style={{ color: '#c43826' }}>(02)2505-9999</span>
                            </p>
                        </>
                    ),
                    onOk: () => {
                        onClick(false);
                        dispatch(setModal({ visible: false }));
                    },
                }),
            );
        };

        const setAccHandler = (accounts, subAccount) => {
            accounts.map(item => {
                if (item.account === subAccount) {
                    dispatch(setCurrentAccount(item));
                }
            });
        };

        useEffect(() => {
            if (checkAccount) {
                if (
                    freezeSucces &&
                    bankAccSuccess &&
                    signSuccess &&
                    selectAccSuccess &&
                    noAcc &&
                    amountSuccess &&
                    stockData &&
                    userIdAcc
                ) {
                    successHandler(true);
                } else {
                    successHandler(false);
                }
            }
        }, [
            freezeSucces,
            bankAccSuccess,
            signSuccess,
            selectAccSuccess,
            noAcc,
            amountSuccess,
            stockData,
            userIdAcc,
            checkAccount,
        ]);

        return (
            <>
                <style global jsx>{`
                    .confirm__container .ant-btn {
                        width: 95px;
                    }
                `}</style>
            </>
        );
    },
);

export default SubscriptionAccErrModal;
