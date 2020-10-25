import { getA8Instance } from '../myAxios';

export const fetchStockUnRealPrtlos = async function (action, bhno, cseq, ctype, sip, stock, ttype, token) {
    try {
        const url = `/A8/api/v1/Equity/UnRealPrtlos`;
        const res = await getA8Instance().post(url, {
            action,
            bhno,
            cseq,
            ctype,
            sip,
            stock,
            ttype,
            token,
        });
        if (res.data?.success === 'True') {
            return res.data?.result?.unreal_sums?.unreal_sum ?? [];
        } else {
            return [];
        }
    } catch (error) {
        return '伺服器錯誤';
    }
};
