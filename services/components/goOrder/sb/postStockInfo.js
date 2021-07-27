import { getA8Instance } from '../../../myAxios';

export const postStockInfo = async ({ AID, Exchid, stockID, token }) => {
    var url = `/SubBrokerage/Config/StockInfo`;
    try {
        const res = await getA8Instance('v1', undefined, true).post(url, {
            AID,
            Exchid,
            stockID,
            token,
        });
        if (res.data.success === 'True') {
            return res.data.result.Stock.Data;
        } else {
            throw 'error';
        }
    } catch (error) {
        throw '伺服器錯誤';
    }
};
