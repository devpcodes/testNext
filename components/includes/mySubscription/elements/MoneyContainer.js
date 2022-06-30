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
const MoneyContainer = memo(({ payable, receivable }) => {
    const isMobile = useCheckMobile();
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [balance, setBalance] = useState('--');
    const [bankAccount, setBankAccount] = useState('--');
    const [signAccounts, setSignAccounts] = useState([]);
    const [signAcc, setSignAcc] = useState(false);
    const [applyStatus, setApplyStatus] = useState(false);
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

    useEffect(() => {
        if (signAccounts.length > 0) {
            const signAccs = signAccounts.filter(item => {
                return item.account === currentAccount.account;
            });
            setSignAcc(signAccs[0].bank_flag === '1' ? true : false);
        }
    }, [currentAccount, signAccounts]);

    const getQueryCrossSelling = async account => {
        const res = await postQueryCrossSelling(getToken());
        console.log('res', res, account);
        setSignAccounts(res);
    };

    const getDsAndBank = async () => {
        try {
            const res = await fetchAccount(getToken());
            console.log('step1', res);
            //TODO mock
            res.applyStatus = '1';
            if (res.applyStatus === '1') {
                setApplyStatus(true);
                getQueryCrossSelling(currentAccount.account);
            } else {
                setApplyStatus(false);
            }
        } catch (error) {
            message.error(error);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            if (currentAccount.broker_id != null) {
                debounce(getBalance, 500);
                debounce(getDsAndBank, 500);
            }
        }, 700);
    }, [currentAccount]);

    return (
        <div className="moneyBox__container">
            {isMobile ? (
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
                                '帳號 ' + (currentAccount.broker_id || '--') + '-' + (currentAccount.account || '--'),
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
                        />
                    )}
                    {applyStatus && signAcc && (
                        <MoneyBox
                            style={{ width: '33%' }}
                            title={[{ val: '申購信用通', linkText: '我要還款 >', icon: true }]}
                            data={[
                                {
                                    label: '可動用',
                                    val: `$${formatNum(payable)}`,
                                    showLine: true,
                                },
                                {
                                    label: '已動用',
                                    val: `$${formatNum(receivable)}`,
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
            `}</style>
        </div>
    );
});

export default MoneyContainer;
