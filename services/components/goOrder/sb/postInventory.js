import { getA8Instance, getDivoInstance } from '../../../myAxios';
import { getCurrency, getMarket } from './dataMapping';
import { getCookie } from '../../layouts/cookieController';
import { getWebId } from '../../goOrder/getWebId';
import { sign } from '../../../webCa';
import moment from 'moment';

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

export const postAccBalanceWithSwr = async (strObj) => {
    console.log('[RES]',JSON.parse(strObj))
    let d = await postAccBalance(JSON.parse(strObj));
    return d;
};

const postAccBalance = async (req) => {
    var url = '/SubBrokerage/ClientData/BankBalanceAll';
    try {
        console.log('[REQ]',{AID:req.AID,token:req.token,TT:req.TT} )
        const res = await getA8Instance('v2', undefined, true).post(url, {AID:req.AID,token:req.token,TT:req.TT});
        if (res.data.success === 'True') { console.log('[RES]',res)
            let ds_ = {};
            if (res.data.data.settle_type){
                ds_.settle_type = res.data.data.settle_type
            }
            if (res.data.data.bank_balance_detail) {
                let origin = res.data.data.bank_balance_detail;
                origin.map(x=>{
                    if(x.currency && ds_.currency!==x.currency){
                      ds_.currency = x.currency
                    }
                    if(x.balance_type=="1"){
                        ds_.balance = x.balance
                    }else if(x.balance_type=="2"){
                        ds_.t1 = x.t_1
                        ds_.t2 = x.t_2
                        //ds_.balance = x.amount
                    }else{
                        ds_.buyingPower = x.buying_power
                    }
                })
                return ds_;
            } else {
                return {};
            }
        } else {
            throw 'error';
        }
    } catch (error) {
        throw '伺服器錯誤(2)';
    }
};

export const postBankBalanceWithSwr = async (strObj, controlReload) => {
    // if (controlReload == 0) return;
    let d = await postBankBalance(JSON.parse(strObj));
    return d;
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

const postUnrealized = async ({ account, broker_id, token, market }) => {
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

export const postWithdrawApply = async (currentAccount, platform, Amount, Currency, token) => {
    var url = '/SubBrokerage/Withdraw/Apply';
    try {
        let ca_content = await sign(
            {
                idno: currentAccount.idno,
                broker_id: currentAccount.broker_id,
                account: currentAccount.account,
            },
            true,
            token
        );
        console.log('[ca_content]',ca_content)
        let date = formatDate(new Date)
        let ip = getCookie('client_ip')
        let webid = await getWebId('newweb', 'recommisiioned') 
        console.log('[webid]', webid);
        let reqData = { 
            AID: currentAccount.broker_id + currentAccount.account, 
            Amount: Amount,
            Currency: Currency,
            sDate:date,
            client_ip:ip,
            webID:webid,
            creator:currentAccount.idno,
            ca_content:ca_content,
            token:token
        }
        console.log('[reqData]', reqData);
        const res = await getA8Instance('v1', undefined, true).post(url, reqData);
        console.log('[RES]',res)
        if (res.data.success === 'True') {
            const obj = [];
            console.log('[RES]',res)
            if (res.data.result) {
                console.log('[RES]', res);
                return res.data;
            } else {
                return [];
            }
        } else {
            throw 'error';
        }
    } catch (error) {
        throw '伺服器錯誤(2)'+error;
    }
};

const getCAContent = (currentAccount,token) => {
    
return ca_content
}
const formatDate = (date) => {
    let newDate = '--';
    if (date) {
        newDate = moment(date, 'YYYYMMDD').format('YYYYMMDD');
    }
    return newDate;
};
export const postBankAccount = async (AID, token) => {
    var url = '/SubBrokerage/ClientData/BankAccount';
    try {
        console.log('[REQ]', AID, token);
        const res = await getA8Instance('v1', undefined, true).post(url, { AID: AID, token: token });
        
        if (res.data.success === 'True') {
            const obj = [];
            
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
        throw '伺服器錯誤(1)'+error;
    }
};
