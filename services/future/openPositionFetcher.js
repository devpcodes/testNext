import { getA8Instance } from '../myAxios';

export const fetchOpenPosition = async function ({ token, user_id, account, category, type, call_put }, modal = true) {
    const url = `/Future/Position`;
    const res = await getA8Instance(undefined, undefined, modal).post(url, {
        token,
        user_id,
        account,
        category,
        type,
        call_put,
    });
    if (res.data?.success === 'True') {
        return res.data.result;
    } else if (res.data?.success === 'False' && res.data?.result?.msg === '無此資料') {
        return {};
    }
};
