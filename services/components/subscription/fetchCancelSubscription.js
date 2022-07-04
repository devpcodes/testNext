import { getSubscriptionInstance } from '../../myAxios';

export const fetchCancelSubscription = async function (token, branch, account, stockId, ca_content, source) {
    try {
        const reqUrl = '/cancel';
        const res = await getSubscriptionInstance().post(reqUrl, {
            token,
            branch,
            account,
            stockId,
            ca_content,
            source,
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
