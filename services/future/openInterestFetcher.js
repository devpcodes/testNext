import { getA8Instance } from '../myAxios';

export const fetchOpenInterest = async function ({ token, user_id, account, category, type, call_put }) {
    const url = `https://servicerd.sinotrade.com.tw/api/v1/Future/Position`;
    const res = await getA8Instance().post(url, {
        token,
        user_id,
        account,
        category,
        type,
        call_put,
    });
    if (res.data.success != null && res.data.success === 'True') {
        return res.data.result.unreal_sums.unreal_sum;
    } else {
        return [];
    }
};
