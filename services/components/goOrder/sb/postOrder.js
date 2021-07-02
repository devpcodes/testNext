import { getA8Instance } from '../../../myAxios';
export const postOrder = async data => {
    var url = `/SubBrokerage/SecuritiesTrade/Order`;
    try {
        const res = await getA8Instance('v2', undefined, true).post(url, data);
        if (res.data.success === 'True') {
            return res.data;
        } else {
            throw 'error';
        }
    } catch (error) {
        throw '伺服器錯誤';
    }
};
