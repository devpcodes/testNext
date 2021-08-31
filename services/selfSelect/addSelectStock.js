import { getLykanInstance } from '../myAxios';

export const fetchAddSelectStock = async function (stockData, isSocalLogin) {
    try {
        const reqUrl = isSocalLogin ? '/social/addSelectStock' : '/select/addSelectStock';
        const res = await getLykanInstance().post(reqUrl, stockData);

        if (res.data.success != null && res.data.success === true) {
            return res.data;
        } else {
            return {};
        }
    } catch (error) {
        return '伺服器錯誤';
    }
};
