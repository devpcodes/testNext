import { getA8Instance } from '../../myAxios';

export const orderStatusQueryFetcher = async function ({ account, action, broker_id, stock_id, token, user_id }) {
    const url = `/Equity/OrderStatusQuery`;
    try {
        const res = await await getA8Instance('v2', undefined, true).post(url, {
            account,
            action,
            broker_id,
            stock_id,
            token,
            user_id,
        });
        if (res.data.success === 'True') {
            if (Array.isArray(res.data.result)) {
                return res.data.result;
            } else {
                return [];
            }
        } else {
            return [];
        }
    } catch (error) {
        return error;
    }
};
