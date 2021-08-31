import { getLykanInstance } from '../myAxios';

export const fetchUpdateSelectStock = async function (selectList, isSocalLogin, token, selectId) {
    try {
        const reqUrl = isSocalLogin ? '/social/updateSelectStock' : '/select/updateSelectStock';
        const res = await getLykanInstance().post(reqUrl, { selectList, token, selectId });

        if (res.data.success != null && res.data.success === true) {
            return res.data;
        } else {
            return {};
        }
    } catch (error) {
        return '伺服器錯誤';
    }
};
