import { getLykanInstance } from '../myAxios';

export const fetchUpdateSelectGroup = async function (selectItems, isSocalLogin, token) {
    try {
        const reqUrl = isSocalLogin ? '/social/updateSelectGroup' : '/select/updateSelectGroup';
        const res = await getLykanInstance().post(reqUrl, {
            selectList: selectItems,
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
