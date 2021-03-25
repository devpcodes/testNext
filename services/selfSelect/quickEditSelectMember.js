import { getLykanInstance } from '../myAxios';

export const fetchQuickEditSelectMember = async function (selectList, token) {
    console.log();
    try {
        const reqUrl = '/select/quickEditSelectMember';
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
