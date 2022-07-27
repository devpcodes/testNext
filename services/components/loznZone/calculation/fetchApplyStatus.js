import { getA8StpInstance } from '../../../myAxios';

export const fetchApplyStatus = async function (token, branch, account, startDate, endDate) {
    try {
        const url = '/loan/api/applyStatus';
        const res = await getA8StpInstance(false).get(url, {
            headers: { token: `${token}` },
            params: {
                branch,
                account,
                startDate,
                endDate,
            },
        });

        if (res.data.success) {
            return res.data.result;
        } else {
            throw '伺服器錯誤';
        }
    } catch (error) {
        throw error.response.data.message || error;
    }
};
