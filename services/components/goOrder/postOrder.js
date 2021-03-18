import { getA8Instance } from '../../myAxios';

// 下單
export const postOrder = async function ({
    ID,
    IP,
    account,
    broker_id,
    is_first_sell,
    market_id,
    ord_bs,
    ord_cond,
    ord_price,
    ord_qty,
    ord_type,
    price_type,
    stock_id,
    time_in_force,
    token,
    web_id,
    ca_content,
}) {
    const url = `/Equity/order`;
    const res = await getA8Instance('v2', undefined, true).post(url, {
        ID,
        IP,
        account,
        broker_id,
        is_first_sell,
        market_id,
        ord_bs,
        ord_cond,
        ord_price,
        ord_qty,
        ord_type,
        price_type,
        stock_id,
        time_in_force,
        token,
        web_id,
        ca_content,
    });
    return res.data;
};
