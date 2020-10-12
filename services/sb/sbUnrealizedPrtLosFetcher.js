import axios from '../myAxios';

export const fetchSBUnRealPrtlosFetcher = async function (market, stock_id, hasData, token) {
    const url = `/lykan/api/v1/assets/querySubBrokerageUnrealizedPrtLos`;
    const res = await axios.post(url, {
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
};
