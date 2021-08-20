import { getA8Instance, getDivoInstance } from '../../../myAxios';
import { getCurrency, getMarket } from './dataMapping';

export const postInventoryWithSwr = async strObj => {
    if (strObj == null) return false;
    let d = await postInventory(JSON.parse(strObj));
    return d;
};

export const postInventory = async ({ AID, token, seq }) => {
    var url = '/SubBrokerage/QueryTradeData/Position';
    try {
        console.log('[REQ]', AID, token);
        const res = await getA8Instance('v2', undefined, false).post(url, {
            AID,
            token,
        });
        console.log('[RES]', res);
        if (res.data.success === 'True') {
            const obj = [];
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
        console.log('[REQ]',AID, token )
        const res = await getA8Instance('v2', undefined, true).post(url, {AID:AID,token:token,TT:TT});
        if (res.data.success === 'True') { console.log('[RES]',res)
            let ds_ = {};
            if(res.data.data.settle_type){
                ds_.settle_type = res.data.data.settle_type
            }
            if (res.data.data.bank_balance_detail) {
                
                let origin = res.data.data.bank_balance_detail;
                origin.map(x=>{
                    if(x.currency && ds_.currency!==x.currency){
                      ds_.currency = x.currency
                    }
                    if(x.balance_type=="1"){
                        ds_.Balance = x.Balance
                    }else if(x.balance_type=="2"){
                        ds_.t1 = x.t_1
                        ds_.t2 = x.t_2
                        ds_.t = x.amount
                    }else{
                        ds_.buyingPower = x.buying_power
                    }
                })
                return ds_;
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

export const postBankBalance = async ( AID, token, UID ) => {
    var url = '/SubBrokerage/ClientData/BankBalance';
    try {
        console.log('[REQ]',AID, token ,UID)
        const res = await getA8Instance('v2', undefined, true).post(url, {AID:AID,token:token,user_id:UID});
        if (res.data.success === 'True') { 
            console.log('[RES]',res)
            if (res.data.result.data) {
                return res.data.result.data;
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
            const obj = [];
            console.log('[RES]',res)
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
