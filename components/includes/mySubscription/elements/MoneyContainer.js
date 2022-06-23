import { useEffect, useState, memo } from 'react';
import { useCheckMobile } from '../../../../hooks/useCheckMobile';
import { useSelector } from 'react-redux';
import MoneyBox from './MoneyBox';
import { formatNum } from '../../../../services/formatNum';
import { postBankAccountBalance } from '../../../../services/components/mySubscription/postBankAccountBalance';
import { getToken } from '../../../../services/user/accessToken';
import { message } from 'antd';
import { debounce } from '../../../../services/throttle';
const MoneyContainer = memo(({ payable, receivable }) => {
    const isMobile = useCheckMobile();
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [balance, setBalance] = useState('--');
    const [bankAccount, setBankAccount] = useState('--');
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
        setTimeout(() => {
            if (currentAccount.broker_id != null) {
                getBalance();
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
                        style={{ width: '50%', marginRight: 20 }}
                    />
                    <MoneyBox
                        style={{ width: '50%' }}
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
