import { getLykanInstance } from '../myAxios';

export const fetchDeletSelectStock = async function (data, isSocalLogin) {
    console.log(data);
    try {
        const reqUrl = isSocalLogin ? '/social/deleteSelectStock' : '/select/deleteSelectStock';
        const res = await getLykanInstance().post(reqUrl, data);
        if (res.data.success != null && res.data.success === true) {
            return res.data;
        } else {
            return {};
        }
    } catch (error) {
        return '伺服器錯誤';
    }
};
