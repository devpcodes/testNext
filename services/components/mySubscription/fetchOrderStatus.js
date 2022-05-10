import { getSubscriptionInstance } from '../../myAxios';

export const fetchOrderStatus = async function (token, branch, account) {
    try {
        const reqUrl = '/orderStatus';
        const res = await getSubscriptionInstance().get(reqUrl, {
            headers: { token },
            params: {
                branch,
                account,
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
