import { getA8StpInstance } from '../../myAxios';

export const fetchEarmarkStatus = async function (token, branch, account) {
    try {
        const url = `/stp/api/queryEarmarkStatus`;
        const baseUrl = 'https://servicerd.sinotrade.com.tw';
        const res = await getA8StpInstance(true, baseUrl).post(url, {
            token,
            branch,
            account,
        });
        console.log(res.data);
        if (res.data?.success === true) {
            // return res.data?.result?.unreal_sums?.unreal_sum ?? [];
            return res.data?.result || [];
        } else {
            return [];
        }
    } catch (error) {
        return '伺服器錯誤';
    }
};
