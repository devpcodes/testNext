import { getA8StpInstance } from '../../../myAxios';

export const fetchRepaymentAccount = async function (token, branch) {
    try {
        const url = '/loan/api/repaymentAcoount';
        const res = await getA8StpInstance(false).get(url, {
            headers: { token: `${token}` },
            params: {
                branch,
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
