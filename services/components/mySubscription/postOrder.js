import { getSubscriptionInstance } from '../../myAxios';

export const postOrder = async function ({
    isAppropriation,
    bankChannel,
    callbackUrl,
    branch,
    account,
    stockId,
    source = 'h',
    token,
    ca_content,
}) {
    // console.log('................123123133333')
    try {
        const reqUrl = '/order';
        const res = await getSubscriptionInstance().post(
            reqUrl,
            {
                isAppropriation,
                bankChannel,
                callbackUrl,
                branch,
                account,
                stockId,
                source,
                ca_content,
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
        throw error?.response?.data?.message || '伺服器錯誤';
    }
};
