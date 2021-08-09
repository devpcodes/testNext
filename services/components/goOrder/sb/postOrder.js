import { getA8Instance } from '../../../myAxios';
export const postOrder = async (data, orderList) => {
    var url = `/SubBrokerage/SecuritiesTrade/Order`;
    try {
        const res = await getA8Instance('v2', undefined, false).post(url, data);
        if (orderList) {
            return res.data.success;
        } else {
            if (res.data.success === 'True') {
                return res.data;
            } else {
                throw res?.data?.result?.Msg || 'error';
            }
        }
    } catch (error) {
        throw error?.response?.data?.result?.msg || error || '伺服器錯誤';
    }
};
