import { getSubscriptionInstance } from '../../myAxios';

export const fetchSubscriptionList = async function () {
    try {
        const reqUrl = '/list';
        const res = await getSubscriptionInstance().get(reqUrl, {});

        if (res.data.success != null && res.data.success === true) {
            return res.data;
        } else {
            return {};
        }
    } catch (error) {
        return '伺服器錯誤';
    }
};
