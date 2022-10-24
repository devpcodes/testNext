import { getA8StpInstance } from '../../myAxios';

export const fetchQuerySecuritiesRedemptionsStatus = async function (token, branch, account) {
    try {
        const url = `/stp/api/querySecuritiesRedemptionsStatus`;
        // const baseUrl = 'https://servicerd.sinotrade.com.tw';
        const data = {
            token,
            branch,
            account,
        };

        const res = await getA8StpInstance(true).post(url, data);
        console.log(res.data);
        if (res.data?.success === true) {
            // return res.data?.result?.unreal_sums?.unreal_sum ?? [];
            return res.data?.result?.data || [];
        } else {
            return [];
        }
    } catch (error) {
        return '伺服器錯誤';
    }
};
