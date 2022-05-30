import { getA8Instance } from '../myAxios';

export const fetchSBEstimated = async function (exchid, bs, price, qty, broker_id, account, modal = true) {
    try {
        const url = `/SubBrokerage/ClientData/EstimatedAmount`;
        const res = await getA8Instance('v2', undefined, modal).post(url, {
            broker_id,
            account,
            exchid,
            bs,
            price,
            qty,
        });
        if (res.data.success != null && res.data.success === 'True') {
            return res.data.result;
        } else {
            return {};
        }
    } catch (error) {
        return '伺服器錯誤';
    }
};
