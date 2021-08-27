import { getA8StpInstance } from '../../myAxios';

export const fetchStockInventory = async function (token, branch, account, query_load_type) {
    try {
        const url = `/stp/api/queryStockInventory`;
        // const baseUrl = 'https://servicerd.sinotrade.com.tw';
        const res = await getA8StpInstance(true).post(url, {
            token,
            branch,
            account,
            query_load_type,
        });
        console.log(res.data);
        if (res.data?.success === true) {
            // return res.data?.result?.unreal_sums?.unreal_sum ?? [];
            return res.data?.result;
        } else {
            return res.data?.message;
        }
    } catch (error) {
        // return '伺服器錯誤';
        throw error;
    }
};
