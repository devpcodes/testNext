import { getA8StpInstance } from '../../../myAxios';

export const fetchAccountOverview = async function (token, branch, account) {
    try {
        const url = '/loan/api/accountOverview';
        const res = await getA8StpInstance(false).get(url, {
            headers: { token: `${token}` },
            params: {
                branch,
                account,
            },
        });
        if (res.data.success) {
            return res.data.result;
        } else {
            throw '伺服器錯誤';
        }
    } catch (error) {
        throw '伺服器錯誤';
    }
};
