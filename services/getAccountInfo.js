import { getA8StpInstanceAuth, getA8StpInstance, getDivoInstance } from './myAxios';
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

export const queryKeepingrate = async function (token, branch, account) {
    try {
        const url = '/assets/queryStructuredNoteSum';
        // const url = '/equity/queryKeepingratetotal';
        let data = {
            account: account,
            branch: branch,
            token: token,
        };
        console.log('[queryKeepingratedata]', data);
        const res = await getDivoInstance('v1', true).post(url, data);
        console.log('[RES queryKeepingrate]', res);
        if (res.data.success === true) {
            return res.data.result;
        } else {
            return true;
        }
    } catch (error) {
        throw error;
    }
};
