import { getLykanInstance } from '../myAxios';

export const fetchupdateSelectStock = async function (selectList, token) {
    try {
        const reqUrl = '/select/updateSelectStock';
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
