import { getA8Instance } from '../../../myAxios';
export const postOrder = async data => {
    var url = `/SubBrokerage/SecuritiesTrade/Order`;
    try {
        const res = await getA8Instance('v2', undefined, false).post(url, data);
        if (res.data.success === 'True') {
            return res.data;
        } else {
            throw res?.data?.result?.msg || 'error';
        }
    } catch (error) {
        throw error?.response?.data?.result?.msg || '伺服器錯誤';
    }
};
