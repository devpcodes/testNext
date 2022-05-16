import { useCheckMobile } from '../../../../hooks/useCheckMobile';
import { useSelector } from 'react-redux';
import MoneyBox from './MoneyBox';
import { formatNum } from '../../../../services/formatNum';
const MoneyContainer = ({ payable, receivable }) => {
    const isMobile = useCheckMobile();
    const currentAccount = useSelector(store => store.user.currentAccount);
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
                            val: `$135,000`,
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
                                label:
                                    '交割帳號 ' +
                                    (currentAccount.broker_id || '--') +
                                    '-' +
                                    (currentAccount.account || '--'),
                                val: '$135,000',
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
};

export default MoneyContainer;
