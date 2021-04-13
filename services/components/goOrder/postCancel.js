import { getA8Instance } from '../../myAxios';

export const postCancel = async function ({
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
}) {
    var url = `/Equity/cancel`;
    try {
        const res = await await getA8Instance('v2', undefined, true).post(url, {
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
        if (res.data.success === 'True') {
            return res.data.result.msg;
        } else {
            return res.data.result.msg;
        }
    } catch (error) {
        console.log('error', error);
        return error;
    }
};
