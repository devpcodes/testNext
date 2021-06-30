import { getA8Instance } from '../../myAxios';

export const fetchBankAccount = async ({ broker_id, account, token }) => {
    try {
        const res = await getA8Instance(undefined, undefined, false).post('/Equity/ClientData/BankAccount', {
            broker_id,
            account,
            token,
        });
        if (res.data?.success === 'True') {
            return res.data?.result;
        } else {
            throw 'error';
        }
    } catch (error) {
        throw error;
    }
};
