import { getLykanInstance } from '../myAxios';

export const fetchQuerySubBrokerageQuote = async function (stock_list, modal = true) {
    try {
        const url = `/quotes/querySubBrokerageQuote`;
        const res = await getLykanInstance(undefined, modal).post(url, {
            stock_list,
        });
        if (res.data.success != null && res.data.success === true) {
            return res.data.result;
        } else {
            return [];
        }
    } catch (error) {
        return '伺服器錯誤';
    }
};
