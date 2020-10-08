import axios from '../myAxios';

export const fetchSBDeliveryTrialFetcher = async function (market, stock_id, hasData, token) {
    const url = `/lykan/api/v1/assets/querySubBrokerageDeliveryTrial`;
    const res = await axios.post(url, {
        market,
        stock_id,
        hasData,
        token
    });
    if(res.data.success != null && res.data.success === true){
        return res.data.result;
    }else{
        return [];
    }
};