import { getA8StpInstance } from '../../myAxios';

export const fetchShortSellingInventory = async function (token, branch, account, query_load_type, category) {
    try {
        const url = `/stp/api/queryShortSellingInventory`;
        // const baseUrl = 'https://servicerd.sinotrade.com.tw';
        const res = await getA8StpInstance(true).post(url, {
            token,
            branch,
            account,
            query_load_type,
            category: category == null ? '' : '1',
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
