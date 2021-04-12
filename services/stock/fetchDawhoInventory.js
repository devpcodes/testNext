import { getCookie } from '../components/layouts/cookieController';
import { getA8Instance } from '../myAxios';
import { getToken } from '../user/accessToken';

export const fetchDawhoInventory = async (currentAccount, searchWords = ' ') => {
    if (currentAccount.broker_id != null) {
        try {
            const res = await getA8Instance(undefined, undefined, false).post('/Equity/UnRealPrtlos', {
                action: '',
                bhno: currentAccount.broker_id,
                cseq: currentAccount.account,
                ctype: 'A', // 全部
                sip: getCookie('client_ip'),
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
