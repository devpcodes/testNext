import { getLykanInstance } from '../myAxios';

export const fetchUpdateSelectGroupName = async function (selectId, selectName, isSocalLogin, token) {
    try {
        const reqUrl = isSocalLogin ? '/social/updateSelectGroupName' : '/select/updateSelectGroupName';
        const res = await getLykanInstance().post(reqUrl, {
            selectId,
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
