import { getA8Instance } from '../myAxios';

export const fetchStockMinuteKline = async function (code, modal = true) {
    try {
        const url = `/Quotes/PresentMinuteKline`;
        const res = await getA8Instance(undefined, undefined, modal).post(url, {
            code,
        });
        if (res.data.success != null && res.data.success === 'True') {
            return res.data.result;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        return '伺服器錯誤';
    }
};
