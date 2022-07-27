import { getSubscriptionInstance } from '../../myAxios';

export const fetchOrderStatus = async function ({
    token,
    branch,
    account,
    page,
    pageSize,
    orderStatusFilter,
    loanStatusFilter,
    methodFilter,
    orderAmountSort,
    lotDateSort,
}) {
    const params = {
        branch,
        account,
        page,
        pageSize,
        orderStatusFilter,
        loanStatusFilter,
        methodFilter,
        orderAmountSort,
        lotDateSort,
    };
    if (!orderStatusFilter) {
        delete params.orderStatusFilter;
    }
    if (!loanStatusFilter) {
        delete params.loanStatusFilter;
    }
    if (!methodFilter) {
        delete params.methodFilter;
    }
    if (!orderAmountSort || orderAmountSort == null) {
        delete params.orderAmountSort;
    }
    if (!lotDateSort || lotDateSort == null) {
        delete params.lotDateSort;
    }
    try {
        const reqUrl = '/orderStatus';
        const res = await getSubscriptionInstance().get(reqUrl, {
            headers: { token },
            params,
        });

        if (res.data.success != null && res.data.success === true) {
            return res.data.result;
        } else {
            throw '伺服器錯誤';
        }
    } catch (error) {
        throw '伺服器錯誤';
    }
};
