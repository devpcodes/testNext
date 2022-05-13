import { getA8StpInstance } from '../../../myAxios';

export const postApply = async function ({ branch, account, applyFinancing, purpose, collaterals, ca_content, token }) {
    try {
        const url = '/loan/api/apply';
        const res = await getA8StpInstance(false).post(
            url,
            {
                branch,
                account,
                applyFinancing,
                purpose,
                collaterals,
                ca_content,
            },
            {
                headers: { token: `${token}` },
            },
        );
        console.log('res', res.data);
        if (res.data.success) {
            return res.data.result.moneyTime;
        } else {
            throw res.data.message || '伺服器錯誤';
        }
    } catch (error) {
        throw error?.response?.data?.message || error;
    }
};
