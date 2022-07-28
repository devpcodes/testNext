import { useEffect, useState, memo } from 'react';
import { useCheckMobile } from '../../../../hooks/useCheckMobile';
import { useSelector } from 'react-redux';
import MoneyBox from './MoneyBox';
import SignBox from './SignBox';
import { formatNum } from '../../../../services/formatNum';
import { postBankAccountBalance } from '../../../../services/components/mySubscription/postBankAccountBalance';
import { getToken } from '../../../../services/user/accessToken';
import { message } from 'antd';
import { debounce } from '../../../../services/throttle';
import { fetchAccount } from '../../../../services/components/subscriptionOverview/fetchAccount';
import { postQueryCrossSelling } from '../../../../services/components/mySubscription/postQueryCrossSelling';
import { fetchAccountStatus } from '../../../../services/components/subscriptionOverview/fetchAccountStatus';
import { useCheckSubscriptionAcc } from '../../../../hooks/useCheckSubscriptionAcc';
const MoneyContainer = memo(({ payable, receivable, applyStatusHandler }) => {
    const isMobile = useCheckMobile();
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [balance, setBalance] = useState('--');
    const [bankAccount, setBankAccount] = useState('--');
    const [signAccounts, setSignAccounts] = useState([]);
    // const [signAcc, setSignAcc] = useState(false);
    // const [applyStatus, setApplyStatus] = useState(false);
    const [allCanLoan, setAllCanLoan] = useState('--');
    const [financing, setFinancing] = useState('--');
    const [applyStatus, signAcc] = useCheckSubscriptionAcc();
    const getBalance = async () => {
        const token = getToken();
        try {
            const res = await postBankAccountBalance({
                token,
                broker_id: currentAccount.broker_id,
                account: currentAccount.account,
            });
            console.log('res', res);
            const found = res.balance.find(element => element.currency === 'TWD');
            console.log('found', found);
            setBalance(found.amt);
            setBankAccount(res.bankactno);
        } catch (error) {
            const err = message.error;
            debounce(err.bind(null, error), 500);
        }
    };

    // useEffect(() => {
    //     if (signAccounts.length > 0) {
    //         const signAccs = signAccounts.filter(item => {
    //             return item.account === currentAccount.account;
    //         });
    //         //TODO MOCK
    //         // signAccs[0].bank_flag = '1';

    //         setSignAcc(signAccs[0]?.bank_flag === '0' ? true : false);
    //     } else {
    //         setSignAcc(false);
    //     }
    // }, [currentAccount, signAccounts]);

    useEffect(() => {
        console.log('applyStatus', applyStatus);
        if (applyStatus) {
            applyStatusHandler(true);
        }
    }, [applyStatus]);

    useEffect(() => {
        if (signAcc) {
            getAccountStatus();
        }
    }, [signAcc]);

    const getAccountStatus = async () => {
        try {
            const res = await fetchAccountStatus(getToken());
            setAllCanLoan(res.limitAmount);
            setFinancing(res.totalOs);
        } catch (error) {}
    };

    // const getQueryCrossSelling = async account => {
    //     const res = await postQueryCrossSelling(getToken());
    //     console.log('res', res, account);
    //     setSignAccounts(res);
    // };

    // const getDsAndBank = async () => {
    //     //TODO mock
    //     // setApplyStatus(true);
    //     // getQueryCrossSelling(currentAccount.account);

    //     try {
    //         const res = await fetchAccount(getToken());
    //         console.log('step1', res);
    //         if (res.applyStatus === '1') {
    //             setApplyStatus(true);
    //             getQueryCrossSelling(currentAccount.account);
    //         } else {
    //             setApplyStatus(false);
    //         }
    //     } catch (error) {
    //         setApplyStatus(false);
    //         message.error(error || '伺服器錯誤');
    //     }
    // };

    useEffect(() => {
        setTimeout(() => {
            if (currentAccount.broker_id != null) {
                debounce(getBalance, 500);
                // debounce(getDsAndBank, 500);
            }
        }, 700);
    }, [currentAccount]);

    const moneyBoxClick = () => {
        alert('123');
    };

    return (
        <div className="moneyBox__container">
            {isMobile ? (
                <>
                    <MoneyBox
                        style={{ width: '100%' }}
                        title={[
                            {
                                val: '銀行交割餘額',
                                style: { flex: '1 0 0' },
                            },
                            {
                                val: '次一營業日申購款',
                                style: { flex: '1.5 0 0' },
                            },
                        ]}
                        data={[
                            {
                                label:
                                    '帳號 ' +
                                    (currentAccount.broker_id || '--') +
                                    '-' +
                                    (currentAccount.account || '--'),
                                val: `$${formatNum(balance)}`,
                                style: { flex: '1 0 0' },
                                showLine: true,
                            },
                            {
                                label: '應扣申購款',
                                val: `$${formatNum(payable)}`,
                                style: { flex: '0.75 0 0' },
                                showLine: false,
                            },
                            {
                                label: '應退申購款',
                                val: `$${formatNum(receivable)}`,
                                style: { flex: '0.75 0 0' },
                                showLine: false,
                            },
                        ]}
                    />
                    {!applyStatus && (
                        <SignBox
                            style={{ width: '100%', marginTop: '16px' }}
                            title={[{ val: '申購信用通', linkText: '了解更多 >', icon: false }]}
                            content={'立即申辦'}
                        />
                    )}
                    {applyStatus && !signAcc && (
                        <SignBox
                            style={{ width: '100%', marginTop: '16px' }}
                            title={[{ val: '申購信用通', linkText: '了解更多 >', icon: false }]}
                            content={'立即簽署'}
                            contentLink={process.env.NEXT_PUBLIC_SIGNCENTER_DOMAIN}
                        />
                    )}
                    {applyStatus && signAcc && (
                        <MoneyBox
                            style={{ width: '100%', display: 'block', marginTop: '16px' }}
                            title={[{ val: '申購信用通', linkText: '我要還款', icon: true }]}
                            financing={Number(financing)}
                            data={[
                                {
                                    label: '可動用',
                                    val: `$${formatNum(Number(allCanLoan) - Number(financing))}`,
                                    showLine: false,
                                },
                                {
                                    label: '已動用',
                                    val: `$${formatNum(financing)}`,
                                    showLine: false,
                                },
                            ]}
                        />
                    )}
                </>
            ) : (
                <>
                    <MoneyBox
                        title={[{ val: '銀行交割餘額' }]}
                        data={[
                            {
                                label: '交割帳號 ' + bankAccount,
                                val: `$${formatNum(balance)}`,
                            },
                        ]}
                        style={{ width: '33%', marginRight: 20 }}
                    />
                    <MoneyBox
                        style={{ width: '33%', marginRight: 20 }}
                        title={[{ val: '次一營業日申購款' }]}
                        data={[
                            {
                                label: '應扣申購款',
                                val: `$${formatNum(payable)}`,
                                showLine: true,
                            },
                            {
                                label: '應退申購款',
                                val: `$${formatNum(receivable)}`,
                                showLine: false,
                            },
                        ]}
                    />
                    {!applyStatus && (
                        <SignBox
                            style={{ width: '33%' }}
                            title={[{ val: '申購信用通', linkText: '了解更多 >', icon: false }]}
                            content={'立即申辦'}
                        />
                    )}
                    {applyStatus && !signAcc && (
                        <SignBox
                            style={{ width: '33%' }}
                            title={[{ val: '申購信用通', linkText: '了解更多 >', icon: false }]}
                            content={'立即簽署'}
                            contentLink={process.env.NEXT_PUBLIC_SIGNCENTER_DOMAIN}
                        />
                    )}
                    {applyStatus && signAcc && (
                        <MoneyBox
                            style={{ width: '33%' }}
                            title={[{ val: '申購信用通', linkText: '我要還款', icon: true }]}
                            financing={Number(financing)}
                            data={[
                                {
                                    label: '可動用',
                                    val: `$${formatNum(Number(allCanLoan) - Number(financing))}`,
                                    showLine: true,
                                },
                                {
                                    label: '已動用',
                                    val: `$${formatNum(financing)}`,
                                    showLine: false,
                                },
                            ]}
                        />
                    )}
                </>
            )}

            <style>{`
                .moneyBox__container {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 18px;
                    margin-bottom: 17px;
                }
                @media (max-width: 768px) {
                    .moneyBox__container {
                        display: block;
                    }
                }
            `}</style>
        </div>
    );
});

export default MoneyContainer;
