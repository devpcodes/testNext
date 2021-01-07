import { getA8Instance } from '../myAxios';

export const fetchStockSummarisePrtlos = async function ({ bhno, cseq, sip, token }, modal = true) {
    try {
        const url = `/Equity/SummarisePrtlos`;
        const res = await getA8Instance(undefined, undefined, modal).post(url, {
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
