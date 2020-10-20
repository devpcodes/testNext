import { getA8Instance } from '../myAxios';

export const fetchStockSummarisePrtlos = async function (bhno, cseq, sip, token) {
    try {
        const url = `/A8/api/v1/Equity/SummarisePrtlos`;
        const res = await getA8Instance().post(url, {
            bhno,
            cseq,
            sip,
            token,
        });
        if (res.data.success != null && res.data.success === 'True') {
            return res.data.result.profit_sums.profit_sum;
        } else {
            return [];
        }
    } catch (error) {
        return '伺服器錯誤';
    }
};
