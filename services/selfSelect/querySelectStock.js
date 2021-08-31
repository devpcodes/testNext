import { getLykanInstance } from '../myAxios';

export const fetchQuerySelectStock = async function (isSocalLogin, token, selectId) {
    try {
        const reqUrl = isSocalLogin ? '/social/querySelectStock' : '/select/querySelectStock';
        const res = await getLykanInstance().post(reqUrl, {
            selectId,
            token,
        });
        if (res.data.success != null && res.data.success === true) {
            return res.data.result;
        } else {
            return {};
        }
    } catch (error) {
        return '伺服器錯誤';
    }
};
