import { getLykanInstance } from '../myAxios';

export const fetchSBUnRealPrtlosFetcher = async function ({ market, stock_id, hasData, token }, modal = true) {
    try {
        const url = `/assets/querySubBrokerageUnrealizedPrtLos`;
        const res = await getLykanInstance(undefined, modal).post(url, {
            market,
            stock_id,
            hasData,
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
