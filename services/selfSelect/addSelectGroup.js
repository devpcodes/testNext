import { getLykanInstance } from '../myAxios';

export const fetchAddSelectGroup = async function (selectName, token) {
    try {
        const reqUrl = '/select/addSelectGroup';
        const res = await getLykanInstance().post(reqUrl, {
            selectName,
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
