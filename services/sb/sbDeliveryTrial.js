import { getLykanInstance } from '../myAxios';

export const fetchSBDeliveryTrialFetcher = async function (market, stock_id, hasData, token) {
    try {
        const url = `/assets/querySubBrokerageDeliveryTrial`;
        const res = await getLykanInstance().post(url, {
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
