import { getLykanInstance } from '../myAxios';

export const fetchDeletSelectGroup = async function (selectId, token) {
    try {
        const reqUrl = '/select/deleteSelectGroup';
        const res = await getLykanInstance().post(reqUrl, {
            selectId,
            token,
        });
        if (res.data.success != null && res.data.success === true) {
            return res.data;
        } else {
            return {};
        }
    } catch (error) {
        return '伺服器錯誤';
    }
};
