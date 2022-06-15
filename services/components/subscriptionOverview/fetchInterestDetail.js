import { getSubscriptionInstance } from '../../myAxios';

export const fetchInterestDetail = async function (token, capDate, source = 'h') {
    try {
        const reqUrl = '/loan/interestDetail';
        const res = await getSubscriptionInstance().get(reqUrl, {
            headers: { token },
            params: {
                source,
                capDate: '20220101',
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
