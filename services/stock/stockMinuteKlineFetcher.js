import { getA8Instance } from '../myAxios';

export const fetchStockMinuteKline = async function (code, modal = true) {
    try {
        const url = `/Quotes/PresentMinuteKline`;
        const res = await getA8Instance(undefined, undefined, modal, 'https://service.sinotrade.com.tw/api/v1').post(
            url,
            {
                code,
            },
        );
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
