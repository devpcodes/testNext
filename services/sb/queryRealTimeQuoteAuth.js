import { getSignInstance } from '../myAxios';

export const fetchSBQueryRealTimeQuoteAuth = async function (exchange, token, modal = true) {
    try {
        const url = `/subbrokerage/queryRealTimeQuoteAuth`;
        const res = await getSignInstance(undefined, modal).post(url, {
            exchange,
            token,
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
