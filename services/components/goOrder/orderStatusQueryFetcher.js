import { Modal } from 'antd';
import { getA8Instance } from '../../myAxios';
const defaultErrorMsg = '伺服器錯誤，請稍後再試';

export const orderStatusQueryFetcherWithSWR = async function (strObj) {
    return await orderStatusQueryFetcher(JSON.parse(strObj));
};
export const orderStatusQueryFetcher = async function ({
    account,
    action,
    broker_id,
    stock_id,
    token,
    user_id,
    pageIndex,
    pageSize,
    status,
    bs,
}) {
    const url = `/Equity/OrderStatusQuery`;
    if (!account || account == null) return [];
    try {
        let res;
        if (pageIndex != null && pageSize != null) {
            res = await await getA8Instance('v2', undefined, false).post(url, {
                account,
                action,
                broker_id,
                stock_id,
                token,
                user_id,
                pageIndex,
                pageSize,
                status,
                bs,
            });
        } else {
            res = await await getA8Instance('v2', undefined, true).post(url, {
                account,
                action,
                broker_id,
                stock_id,
                token,
                user_id,
            });
        }
        if (pageSize == null) {
            if (res.data.success === 'True') {
                if (Array.isArray(res.data.result)) {
                    return res.data.result;
                } else {
                    return [];
                }
            } else {
                return [];
            }
        } else {
            if (res.data?.success === 'True') {
                return res.data?.result;
            } else {
                throw 'error';
            }
        }
    } catch (error) {
        Modal.error({
            content:
                error.response.data.message ||
                (error.response.data.result.msg && JSON.stringify(error.response.data.result.msg)) ||
                defaultErrorMsg,
        });
        throw error;
        return error;
    }
};
