import { getA8StpInstance } from '../../myAxios';

export const fetchEarmarkStatus = async function (token, branch, account, category) {
    try {
        const url = `/stp/api/queryStockReserveStatus`;
        // const baseUrl = 'https://servicerd.sinotrade.com.tw';
        const data = {
            token,
            branch,
            account,
        };
        if (category != null) {
            data.category = category;
        }
        const res = await getA8StpInstance(true).post(url, data);
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
