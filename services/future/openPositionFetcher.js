import { getA8Instance } from '../myAxios';

export const fetchOpenPosition = async function ({ token, user_id, account, category, type, call_put }) {
    const url = `/A8/api/v1/Future/Position`;
    const res = await getA8Instance().post(url, {
        token,
        user_id,
        account,
        category,
        type,
        call_put,
    });
    console.log('res.data', res.data);
    if (res.data?.success === 'True') {
        return res.data.result;
    } else {
        return {};
    }
};
