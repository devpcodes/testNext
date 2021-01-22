import { getA8StpInstance } from '../../myAxios';

export const postApplyEarmark = async function (token, branch, account, symbol, qty, category) {
    try {
        const url = '/stp/api/applyEarmark';
        const baseUrl = 'https://servicerd.sinotrade.com.tw';
        const res = await getA8StpInstance(true, baseUrl).post(url, {
            token,
            branch,
            account,
            symbol,
            qty,
            category,
        });
        console.log(res.data);
        if (res.data?.success === true) {
            return res.data?.result || '';
        } else {
            return '';
        }
    } catch (error) {
        return '伺服器錯誤';
    }
};
