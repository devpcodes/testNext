import { getA8StpInstanceAuth } from './myAxios';
import moment from 'moment';

export const getAccountData = async function (token, user_id, broker_id, account) {
    try {
        const url = 'api/v1/Equity/ClientData/PrivateInfo';
        const res = await getA8StpInstanceAuth(true).post(url, { token, user_id, broker_id, account });
        console.log('[RES]', res);
        if (res.data.success === 'True') {
            return res.data.result;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
};

export const getCustomerCredit = async function (branch, account, token) {
    try {
        const url = 'btkw/api/customerCredit';
        const res = await getA8StpInstanceAuth(true).get(url, {
            headers: { token: `${token}` },
            params: {
                branch,
                account,
            },
        });
        if (res.data.success === 'True') {
            return res.data.result;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
};
