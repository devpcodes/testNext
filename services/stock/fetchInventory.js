import { getCookie } from '../components/layouts/cookieController';
import { getA8Instance } from '../myAxios';
import { getToken } from '../user/accessToken';

export const fetchInventory = async (currentAccount, searchWords = ' ') => {
    if (currentAccount.broker_id != null) {
        try {
            const res = await getA8Instance(undefined, undefined, false).post('/Equity/Inventory', {
                broker_id: currentAccount.broker_id,
                account: currentAccount.account,
                stock: searchWords,
                ttype: 'A',
                token: getToken(),
            });
            if (res.data?.success === 'True') {
                return res.data?.result?.unreal_sums?.unreal_sum ?? [];
            } else {
                return [];
            }
        } catch (error) {
            throw error;
        }
    } else {
        return [];
    }
};
