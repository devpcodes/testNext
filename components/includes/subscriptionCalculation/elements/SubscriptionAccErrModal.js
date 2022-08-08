import { useEffect, memo, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useCheckSubscriptionAcc } from '../../../../hooks/useCheckSubscriptionAcc';
import { useUser } from '../../../../hooks/useUser';
import { setModal } from '../../../../store/components/layouts/action';
import { setCurrentAccount } from '../../../../store/user/action';
import { getToken } from '../../../../services/user/accessToken';
import { fetchAccountStatus } from '../../../../services/components/subscriptionOverview/fetchAccountStatus';

const SubscriptionAccErrModal = memo(({ checkAccount, successHandler }) => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const dispatch = useDispatch();
    const [applyStatus, signAcc, accountInfo] = useCheckSubscriptionAcc();
    const { isLogin, accounts } = useUser();
    const [accountStatus, setAccountStatus] = useState({});

    const [freezeSucces, setFreezeSuccess] = useState(false);
    const [bankAccSuccess, setBankAccSuccess] = useState(false);
    const [signSuccess, setSignSuccess] = useState(false);
    const [selectAccSuccess, setSelectAccSuccess] = useState(false);
    const [noAcc, setNoAcc] = useState(false);
    const router = useRouter();

    useEffect(() => {
        getLoanAccountStatus();
    }, [isLogin]);

    useEffect(() => {
        if (!checkAccount) return;
        //沒簽署共銷
        if (!signAcc) {
            dispatch(
                setModal({
                    visible: true,
                    type: 'confirm',
                    noCloseIcon: true,
                    noTitleIcon: true,
                    title: '提醒',
                    content: (
                        <>
                            <p>
                                該服務包含【永豐金證券】與【永豐銀行】相關服務資料串接，須簽署共同行銷/合作推廣個人資料同意條款始得啟用。
                            </p>
                            <p style={{ color: '#c43826' }}>
                                請您前往永豐銀行簽署頁，並勾選：同意基本資料與往來交易資料提供予永豐金證券股份有限公司
                            </p>
                        </>
                    ),
                    bodyStyle: {
                        padding: '16px 24px',
                    },
                    onOk: () => {
                        onClick(false);
                        dispatch(setModal({ visible: false }));
                        window.location = `${
                            process.env.NEXT_PUBLIC_SIGNCENTER_DOMAIN
                        }/Cmarketing/?TOKEN=${getToken()}`;
                    },
                    okText: '前往簽署',
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
    }, [signAcc, checkAccount]);

    useEffect(() => {
        console.log('check', checkAccount);

        if (!checkAccount) return;

        if (applyStatus && accountInfo.applyStatus != null) {
            //有帳號，但帳號使用錯誤
            checkAccSelectErr();
        } else {
            //沒申購帳號
            noAccHandler();
        }
    }, [applyStatus, accountInfo, checkAccount]);

    useEffect(() => {
        if (!checkAccount) return;
        // console.log('231312123', accountInfo.bankAccount, accountStatus.lnMainAccount)
        //交割 不等於 撥款
        if (accountInfo.bankAccount !== accountStatus.repayAccount) {
            //TODO MOCK
            // setBankAccSuccess(true);

            dispatch(
                setModal({
                    visible: true,
                    okText: '確認',
                    type: 'info',
                    noCloseIcon: true,
                    noTitleIcon: true,
                    title: '帳戶須統整',
                    content: (
                        <>
                            <p style={{ marginBottom: 12, color: '#0d1623' }}>
                                您的證券交割帳戶與銀行動用帳戶不
                                一致，使用申購便利通須進行帳戶統整，以利相關款項取扣款作業。
                            </p>

                            <p style={{ fontWeight: 'bold', color: '#0d1623', marginBottom: 12 }}>證券交割帳戶</p>
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
                            <p style={{ fontWeight: 'bold', color: '#0d1623', marginBottom: 12 }}>銀行動用帳戶</p>
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
                                請洽服務專員<span style={{ color: '#c43826' }}>(02)2349-5004</span>
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
    }, [accountStatus, accountInfo, checkAccount]);

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

    const noAccHandler = () => {
        console.log('applyStatus', applyStatus);
        dispatch(
            setModal({
                visible: true,
                type: 'confirm',
                noCloseIcon: true,
                noTitleIcon: true,
                title: '無申購便利通帳號',
                content: '您目前無申購便利通帳戶，是否立即前往了解更多？',
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
                    okText: '切換帳號',
                    type: 'info',
                    noCloseIcon: true,
                    noTitleIcon: true,
                    title: '非申購便利通帳號',
                    content: (
                        <>
                            <p style={{ marginBottom: 0, color: '#0d1623' }}>申購便利通服務以每人1戶為限</p>
                            <p style={{ marginBottom: 0, color: '#0d1623' }}>您於本公司申購便利通總覽帳號為</p>
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
                            <p style={{ marginBottom: 0, color: '#0d1623' }}>請您以此帳號進行申購便利通動用</p>
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
                title: '帳戶凍結',
                content: (
                    <>
                        <p style={{ marginBottom: 0, color: '#0d1623' }}>您的申購便利通帳戶額度無法使用</p>
                        <p style={{ marginBottom: 0, color: '#0d1623', display: 'inline-block' }}>
                            請洽銀行客服 <span style={{ color: '#c43826' }}>(02)2505-9999</span>
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
            if (freezeSucces && bankAccSuccess && signSuccess && selectAccSuccess && noAcc) {
                successHandler(true);
            } else {
                successHandler(false);
            }
        }
    }, [freezeSucces, bankAccSuccess, signSuccess, selectAccSuccess, noAcc, checkAccount]);

    return (
        <>
            <style global jsx>{`
                .confirm__container .ant-btn {
                    width: 95px;
                }
            `}</style>
        </>
    );
});

export default SubscriptionAccErrModal;
