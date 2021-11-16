import { getLykanInstance } from '../../../myAxios';
import { getToken } from '../../../user/accessToken';

export const postQuerySubBrokerageQuoteWithSwr = async strObj => {
    if (strObj == 'null') return;
    if (JSON.parse(strObj)?.length == 0) return;
    return await postQuerySubBrokerageQuote(JSON.parse(strObj));
};
export const postQuerySubBrokerageQuote = async stock_list => {
    var url = '/quotes/querySubBrokerageQuote';

    try {
        const res = await getLykanInstance('v1', undefined, false).post(url, {
            stock_list,
            token: getToken(),
        });
        // console.log(res.data);
        if (res?.data?.success) {
            return res.data.result;
        }
    } catch (error) {
        throw error.response?.data?.message || error?.message || '伺服器錯誤';
    }
};
