import { getLykanInstance } from '../myAxios';

export const fetchQuerySelectInventoryStock = async function (token) {
    try {
        const reqUrl = '/select/querySelectInventoryStock';
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
