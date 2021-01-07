import { getA8Instance } from '../myAxios';

export const fetchStockUnRealPrtlos = async function (
    { action, bhno, cseq, ctype, sip, stock, ttype, token },
    modal = true,
) {
    try {
        const url = `/Equity/UnRealPrtlos`;
        const res = await getA8Instance(undefined, undefined, modal).post(url, {
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
