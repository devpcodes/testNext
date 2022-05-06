import { getSubscriptionInstance } from '../../myAxios';

export const applySubscription = async function (token, branch, account, stockId, clientIP, ca_content) {
    try {
        const reqUrl = '/order';
        const res = await getSubscriptionInstance().get(reqUrl, {
            headers: { token },
            params: {
                branch,
                account,
                stockId,
                clientIP,
                ca_content,
            },
        });

        if (res.data.success != null && res.data.success === true) {
            return res.data;
        } else {
            return {};
        }
    } catch (error) {
        return '伺服器錯誤';
    }
};
