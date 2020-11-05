import { getLykanInstance } from '../../myAxios';

export const verifyMenu = async function (url, token) {
    const reqUrl = '/service/verifyMenu';
    const res = await getLykanInstance().post(reqUrl, {
        url,
        token,
    });
    return res;
};
