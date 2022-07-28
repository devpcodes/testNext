import { getA8StpInstance } from '../../myAxios';
export const postQueryCrossSelling = async function (token) {
    try {
        const reqUrl = '/sign/api/v1/stock/queryCrossSelling';
        const res = await getA8StpInstance().post(
            reqUrl,
            {},
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
