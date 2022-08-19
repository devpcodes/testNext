import { getA8StpInstanceAuth, getA8StpInstance } from './myAxios';
import moment from 'moment';

export const getOTPUrl = async function (token) {
    try {
        const url = '/lykan/api/v1/auth/getLendingOTP';
        const res = await getA8StpInstance(true).post(url, { token });
        if (res.data.success) {
            return res.data.result;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
};
export const getAccountData = async function (token, user_id, broker_id, account) {
    try {
        const url = 'api/v1/Equity/ClientData/PrivateInfo';
        const res = await getA8StpInstanceAuth(true).post(url, { token, user_id, broker_id, account });
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
