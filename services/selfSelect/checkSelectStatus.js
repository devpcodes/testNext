import { getLykanInstance } from '../myAxios';

export const fetchCheckSelfSelect = async function ({ symbol, exchange, market, token }) {
    try {
        const reqUrl = '/select/checkSelectStatus';
        const res = await getLykanInstance().post(reqUrl, {
            symbol,
            exchange,
            market,
            token,
        });
        if (res.data.success != null && res.data.success === true) {
            return res.data.result;
        } else {
            return {};
        }
    } catch (error) {
        return '伺服器錯誤';
    }
};
