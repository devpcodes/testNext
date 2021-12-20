// 註解部分待君豪完成後開放
// import { getZionInstance } from '../myAxios';
import { getA8Instance } from '../myAxios';

export const fetchStockMinuteKline = async function (code, modal = true) {
    try {
        // const res = await getZionInstance(undefined, modal).post('/Quotes/PresentMinuteKline', {
        //     code,
        // });
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
