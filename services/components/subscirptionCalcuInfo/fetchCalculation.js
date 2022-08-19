import { getSubscriptionInstanceV2 } from '../../myAxios';

export const fetchCalculation = async (stockId, token, source = 'h') => {
    try {
        const reqUrl = '/calculation';
        const res = await getSubscriptionInstanceV2().get(reqUrl, {
            headers: { token },
            params: {
                stockId,
                source,
            },
        });

        if (res.data.success != null && res.data.success === true) {
            return res.data.result;
        } else {
            throw '伺服器錯誤';
        }
    } catch (error) {
        throw '伺服器錯誤';
    }
};
