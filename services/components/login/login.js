import axios from '../../myAxios';
import { setToken } from '../../user/accessToken';

export const submit = async function (account, password, reCAPTCHAToken, captcha) {
    // login 有設置 cookie 的作用。因同源政策，由 nginx 將 lykan 設為同源，待舊站完全下架 (不再採用 cookie) 時，改發 https://servicerd.sinotrade.com.tw/lykan/api/v1/auth/login
    const data = {
        user_id: account,
        password,
        // 'g-recaptcha-response': reCAPTCHAToken,
        platform: 'newweb',
    };
    if (reCAPTCHAToken != null) {
        data['g-recaptcha-response'] = reCAPTCHAToken;
    }
    if (captcha != null) {
        data['captcha'] = captcha;
    }

    const res = await axios({
        method: 'post',
        url: '/lykan/api/v1/auth/login',
        data,
    });
    // 儲存 token 在 localStorage
    if (res.data?.result?.token) {
        setToken(res.data.result.token);
    }

    return res;
};
