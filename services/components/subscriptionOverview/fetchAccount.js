import { getSubscriptionInstanceV2 } from '../../myAxios';

export const fetchAccount = async function (token, source = 'h') {
    try {
        const reqUrl = '/loan/dsAndBankStatus';
        const res = await getSubscriptionInstanceV2().get(reqUrl, {
            headers: { token },
            params: {
                source,
            },
        });
        if (res.data?.success === true) {
            return res.data.result;
        } else {
            throw res;
        }
    } catch (error) {
        throw error.response.data.message;
    }
};
