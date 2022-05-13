import { getA8StpInstance } from '../../../myAxios';

export const fetchGreenChannel = async function (stockId) {
    try {
        const url = '/loan/api/checkGreenChannelStock';
        const res = await getA8StpInstance(false).get(url, {
            // headers: { token: `${token}` },
            params: {
                stockId,
            },
        });

        if (res.data.success) {
            return res.data.result;
        } else {
            throw res.data.message;
        }
    } catch (error) {
        throw error?.response?.data?.message || error;
    }
};
