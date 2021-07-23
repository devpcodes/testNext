import { getA8Instance } from '../../../myAxios';
import { getCurrency,getMarket } from './dataMapping';

export const postInventoryWithSwr = async strObj => {
    let d = await postInventory(JSON.parse(strObj))
    return d;
};
export const postInventory = async ({ AID, token }) => {
    var url = '/SubBrokerage/QueryTradeData/Position';
    try {
        console.log('[REQ]',AID)
        const res = await getA8Instance('v2', undefined, true).post(url, {
            AID,
            token,
        });
        console.log('[RES]',res)
        if (res.data.success === 'True') {
            const arr = [];
            if (res.data.result) {
                res.data.result.map(x=>{
                    x.Currency = getCurrency(x.Currency)
                    x.Symbol = x.StockID.substring(0, x.StockID.lastIndexOf('.'));
                    x.Market = getMarket(x.TT)
                    return x
                })
                return res.data.result;
            } else {
                return [];
            }
        } else {
            throw 'error';
        }
    } catch (error) {
        throw '伺服器錯誤!';
    }
};

