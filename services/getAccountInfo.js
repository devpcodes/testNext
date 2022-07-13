import { getA8StpInstance } from './myAxios';
import moment from 'moment';

export const getAccountData = async function (token, user_id, broker_id, account) {
    try {
        const url = 'api/v1/Equity/ClientData/PrivateInfo';
        let reqData = {
            token: token,
            user_id: user_id,
            broker_id: broker_id,
            account: account,
        };
        console.log('[REQ]', reqData);
        const res = await getA8StpInstance(true).post(url, { token, user_id, broker_id, account });
        console.log('[RES]', res);
        if (res.data?.success === true) {
            let dataSource = res.data.result.map(x => ({
                clientId: x.clientId,
                clientImage: x.clientImage,
                clientName: x.clientName,
                createdAt: moment(x.createdAt).format('YYYY年M月D日'),
            }));
            return dataSource || [];
        } else {
            return [];
        }
    } catch (error) {
        throw error;
    }
};
