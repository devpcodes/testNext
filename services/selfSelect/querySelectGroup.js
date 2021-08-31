import { getLykanInstance } from '../myAxios';

export const fetchQuerySelectGroup = async function (isSocalLogin, token) {
    try {
        const reqUrl = isSocalLogin ? '/social/querySelectGroup' : '/select/querySelectGroup';
        const res = await getLykanInstance().post(reqUrl, {
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
