import { getSubscriptionInstanceV2 } from '../../myAxios';

export const fetchAppropriationDetail = async function ({ token, startDate, endDate, source = 'h' }) {
    try {
        const reqUrl = '/loan/appropriationDetail';
        const res = await getSubscriptionInstanceV2().get(reqUrl, {
            headers: { token },
            params: {
                startDate,
                endDate,
                source,
            },
        });
        if (res.data.success != null && res.data.success === true) {
            return res.data.result;
        } else {
            throw res.data.message;
        }
    } catch (error) {
        throw '伺服器錯誤';
    }
};
