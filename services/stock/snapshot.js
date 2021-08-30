import { getA8Instance } from '../myAxios';

export const fetchSnapshot = async function (codes, modal = true) {
    try {
        const url = `/Quotes/Snapshot`;
        const res = await getA8Instance(undefined, undefined, modal, 'https://service.sinotrade.com.tw/api/v1').post(
            url,
            {
                codes,
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
