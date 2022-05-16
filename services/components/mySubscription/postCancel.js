import { getSubscriptionInstance } from '../../myAxios';

export const postCancel = async function ({ branch, account, stockId, status, ca_content, client_ip, token }) {
    try {
        const reqUrl = '/cancel';
        const res = await getSubscriptionInstance().post(
            reqUrl,
            {
                branch,
                account,
                stockId,
                status,
                ca_content,
                client_ip,
            },
            {
                headers: {
                    token,
                },
            },
        );

        if (res.data.success != null && res.data.success === true) {
            return res.data.result;
        } else {
            throw '伺服器錯誤';
        }
    } catch (error) {
        throw '伺服器錯誤';
    }
};
