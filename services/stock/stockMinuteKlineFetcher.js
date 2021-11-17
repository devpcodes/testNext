import { getZionInstance } from '../myAxios';

export const fetchStockMinuteKline = async function (code, modal = true) {
    try {
        const res = await getZionInstance(undefined, modal).post('/Quotes/PresentMinuteKline', {
            code,
        });
        if (res.data.success != null && res.data.success === 'True') {
            return res.data.result;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        return {};
    }
};
