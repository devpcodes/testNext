import { getSubscriptionInstance } from '../../myAxios';

export const fetchListWithOrderStatus = async function (token, branch, account) {
    try {
        const reqUrl = '/listWithOrderStatus';
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
            return {};
        }
    } catch (error) {
        return '伺服器錯誤';
    }
};
