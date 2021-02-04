import { getA8Instance } from '../myAxios';

export const stockInfoFetcher = async function (symbol, modal = false) {
    try {
        const url = `/codeList/T30`;
        const res = await getA8Instance(undefined, undefined, modal).post(url, {
            stock_id: symbol,
        });
        if (res.data.success != null && res.data.success === 'True') {
            return res.data.result;
        } else {
            return {};
        }
    } catch (error) {
        return '伺服器錯誤';
    }
};
