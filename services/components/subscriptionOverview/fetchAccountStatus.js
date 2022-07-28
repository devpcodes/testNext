import { getSubscriptionInstanceV2 } from '../../myAxios';

export const fetchAccountStatus = async function (token, source = 'h') {
    try {
        const reqUrl = '/loan/accountStatus';
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
        console.log('rrrrrrrr', error.response.data.message);
        throw error.response.data.message;
    }
};
