import { getA8Instance, getDivoInstance } from '../../../myAxios';
import { getCurrency, getMarket } from './dataMapping';

export const postInventoryWithSwr = async (strObj, controlReload) => {
    // if (controlReload == 0) return;
    let d = await postInventory(JSON.parse(strObj));
    return d;
};

export const postInventory = async ({ AID, token }) => {
    console.log('test', AID, token);
    var url = '/SubBrokerage/QueryTradeData/Position';
    try {
        console.log('[REQ]', AID, token);
        const res = await getA8Instance('v2', undefined, false).post(url, {
            AID,
            token,
        });
        console.log('[RES]', res);
        if (res.data.success === 'True') {
            const arr = [];
            if (!res.data.result.msg) {
                if (res.data.result?.length > 0) {
                    res.data.result.map(x => {
                        x.Currency = getCurrency(x.Currency);
                        x.Symbol = x.StockID.substring(0, x.StockID.lastIndexOf('.'));
                        x.Market = getMarket(x.TT);
                        return x;
                    });
                    return res.data.result;
                } else {
                    return [];
                }
            } else {
                return [];
            }
        } else {
            throw 'error';
        }
    } catch (error) {
        throw '伺服器錯誤';
    }
};

export const postInventoryBalance = async (AID, token, TT) => {
    var url = '/SubBrokerage/ClientData/BankBalanceAll';
    try {
        console.log('[REQ]', AID, token);
        const res = await getA8Instance('v2', undefined, true).post(url, { AID: AID, token: token, TT: TT });
        if (res.data.success === 'True') {
            const arr = [];
            console.log('[RES]', res);
            if (res.data.data) {
                //let data = res.data.data
                //if(data.settle_type=="1")
                // let result = {
                //     data:data.bank_balance_detail,
                //     type:data.settle_type
                // }
                // console.log('[RESULT]',result)
                return res.data.data;
            } else {
                return [];
            }
        } else {
            throw 'error';
        }
    } catch (error) {
        throw '伺服器錯誤(2)';
    }
};

export const postUnrealizedWithSwr = async strObj => {
    let d = await postUnrealized(JSON.parse(strObj));
    return d;
};

export const postUnrealized = async ({ account, broker_id, token, market }) => {
    var url = '/assets/querySubBrokerageUnrealizedPrtLos';
    try {
        let data = {
            account: account,
            broker_id: broker_id,
            token: token,
            market: market,
        };
        console.log('[REQ SubBrokerage]', data);
        const res = await getDivoInstance('v1', true).post(url, data);
        console.log('[RES SubBrokerage]', res);
        if (res.data.success === true) {
            console.log('[RES SubBrokerage]', res.data.result);
            let data = res.data.result.data ? res.data.result.data : [];
            let sum_data = res.data.result.sum_data ? res.data.result.sum_data : [];
            return { data: data, sum_data: sum_data };
        } else {
            throw 'error';
        }
    } catch (error) {
        throw '伺服器錯誤(3)' + error;
    }
};

export const postBankAccount = async (AID, token) => {
    var url = '/SubBrokerage/ClientData/BankAccount';
    try {
        console.log('[REQ]', AID, token);
        const res = await getA8Instance('v1', undefined, true).post(url, { AID: AID, token: token });
        if (res.data.success === 'True') {
            const arr = [];
            console.log('[RES]', res);
            if (res.data.result) {
                // res.data.result.map(x=>{
                //     x.Currency = getCurrency(x.Currency)
                //     x.Symbol = x.StockID.substring(0, x.StockID.lastIndexOf('.'));
                //     x.Market = getMarket(x.TT)
                //     return x
                // })
                console.log('[RES]', res);
                return res.data;
            } else {
                return [];
            }
        } else {
            throw 'error';
        }
    } catch (error) {
        throw '伺服器錯誤(3)';
    }
};
