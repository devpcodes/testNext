import { getLykanInstance } from '../myAxios';

export const fetchAddSelectMember = async function ({ selectId, selectList, token }) {
    try {
        const reqUrl = '/select/addSelectMember';
        const res = await getLykanInstance().post(reqUrl, {
            selectId,
            selectList,
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
