import { getA8StpInstance } from '../../../myAxios';

export const postSign = async function (branch, account, token, ca_content) {
    try {
        const url = '/loan/api/sign';
        const res = await getA8StpInstance(false).post(
            url,
            {
                branch,
                account,
                ca_content,
            },
            {
                headers: { token: `${token}` },
            },
        );
        if (res.data.success) {
            return res.data.result;
        } else {
            throw '伺服器錯誤';
        }
    } catch (error) {
        throw '伺服器錯誤';
    }
};
