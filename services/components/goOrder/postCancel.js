import { getA8Instance } from '../../myAxios';

export const postCancel = async function (
    {
        ID,
        IP,
        account,
        broker_id,
        is_preorder,
        market_id,
        ord_bs,
        ord_cond,
        ord_no,
        ord_seq,
        ord_type,
        stock_id,
        token,
        web_id,
        ca_content,
    },
    listDel = false,
) {
    var url = `/Equity/cancel`;
    try {
        const res = await getA8Instance('v2', undefined, true).post(url, {
            ID,
            IP,
            account,
            broker_id,
            is_preorder,
            market_id,
            ord_bs,
            ord_cond,
            ord_no,
            ord_seq,
            ord_type,
            stock_id,
            token,
            web_id,
            ca_content,
        });
        if (listDel) {
            return res.data.success;
        } else {
            if (res.data.success === 'True') {
                return res.data.result.msg;
            } else {
                return res.data.result.msg;
            }
        }
    } catch (error) {
        if (tradingAccountCall) {
            return '伺服器錯誤';
        } else {
            return error;
        }
    }
};
