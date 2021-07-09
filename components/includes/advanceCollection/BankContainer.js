import { useEffect, useCallback, useState, memo } from 'react';
import { fetchBankAccount } from '../../../services/components/reservationStock/fetchBankAccount';
const BankContainer = memo(({ broker_id, account, token }) => {
    const [bankAccount, setBankAccount] = useState('');
    useEffect(() => {
        if (broker_id && account) {
            getData(broker_id, account, token);
        }
    }, [broker_id, account]);

    const getData = useCallback(async (broker_id, account, token) => {
        try {
            const res = await fetchBankAccount({ broker_id, account, token });
            setBankAccount(res.bank_accouunt);
        } catch (error) {
            console.log(error);
            setBankAccount('--');
        }
    }, []);
    return (
        <>
            <div className="bank__container">
                {/* <p className="label">扣款銀行：&nbsp;&nbsp;{`${bhname ? `永豐商業銀行${bhname}分行` : '--'}`}</p> */}
                <p className="label">扣款銀行帳號：&nbsp;&nbsp;{bankAccount}</p>
            </div>
            <style jsx>
                {`
                    .bank__container {
                        margin-top: 20px;
                    }
                    .label {
                        font-weight: bold;
                        font-size: 18px;
                    }
                `}
            </style>
        </>
    );
});

export default BankContainer;
