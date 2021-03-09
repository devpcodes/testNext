import { getA8Instance } from '../../myAxios';

export const postUpdatePrice = async function ({
    ID,
    IP,
    account,
    broker_id,
    is_preorder,
    market_id,
    ord_bs,
    ord_cond,
    ord_no,
    ord_price,
    ord_qty,
    ord_seq,
    ord_type,
    stock_id,
    token,
    web_id,
    ca_content,
    postName,
}) {
    var url = `/Equity/updatePrice`;
    if (postName === 'price') {
        url = `/Equity/updatePrice`;
    } else {
        url = '/Equity/updateQty';
    }

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
        ord_price,
        ord_qty,
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
};
