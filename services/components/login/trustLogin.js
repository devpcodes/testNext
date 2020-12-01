import axios from '../../myAxios';
import { setToken } from '../../user/accessToken';

export const submit = async function (A8_trust) {
    // trustLogin 有設置 cookie 的作用。因同源政策，由 nginx 將 lykan 設為同源，待舊站完全下架 (不再採用 cookie) 時，改發 https://servicerd.sinotrade.com.tw/lykan/api/v1/auth/trustLogin
    const res = await axios({
        method: 'post',
        url: '/lykan/api/v1/auth/trustLogin',
        data: {
            A8_trust,
        },
    });
    // 儲存 token 在 localStorage
    setToken(res.data.result.token);
    return res;
};
