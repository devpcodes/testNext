import { getLykanInstance } from '../myAxios';

export const fetchupdateSelectStock = async function (selectList, isSocalLogin, token) {
    try {
        const reqUrl = isSocalLogin ? '/social/updateSelectStock' : '/select/updateSelectStock';
        const res = await getLykanInstance().post(reqUrl, { selectList, token });

        if (res.data.success != null && res.data.success === true) {
            return res.data;
        } else {
            return {};
        }
    } catch (error) {
        return '伺服器錯誤';
    }
};
