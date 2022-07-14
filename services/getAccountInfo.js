import { getA8StpInstance } from './myAxios';
import moment from 'moment';

export const getAccountData = async function (token, user_id, broker_id, account) {
    try {
        const url = 'api/v1/Equity/ClientData/PrivateInfo';
        const res = await getA8StpInstance(true).post(url, { token, user_id, broker_id, account });
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
