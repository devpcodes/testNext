import { getCookie } from '../layouts/cookieController';
import { getA8Instance } from '../../myAxios';
import { getToken } from '../../user/accessToken';

export const fetchInventoryWithSWR = async function (
    currentAccount,
    searchWords = ' ',
    pageIndex = 1,
    pageSize = 50,
) {
    return await fetchInventory(currentAccount, searchWords, pageIndex, pageSize);
};
export const fetchInventory = async (
    currentAccount,
    searchWords = ' ',
    pageIndex = 1,
    pageSize = 50,
) => {
    if (currentAccount.accttype !== 'S') {
        return [];
    }
    if (currentAccount.broker_id != null) {
        try {
            const res = await getA8Instance(undefined, undefined, false).post('/Equity/Inventory', {
                broker_id: currentAccount.broker_id,
                account: currentAccount.account,
                stock: searchWords,
                token: getToken(),
                pageIndex,
                pageSize,
            });
            if (res.data?.success === 'True') {
                return res.data?.result;
            } else {
                throw 'error';
            }
        } catch (error) {
            throw error;
        }
    } else {
        return [];
    }
};
