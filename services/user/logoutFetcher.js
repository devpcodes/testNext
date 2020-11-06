import axios from '../myAxios';

export const logout = async function () {
    // logout 有清除 cookie 的作用。因同源政策，由 nginx 將 lykan 設為同源，待舊站完全下架 (不再採用 cookie) 時，改發 https://servicerd.sinotrade.com.tw/lykan/api/v1/auth/logout
    const url = '/lykan/api/v1/auth/logout';
    const res = await axios.post(url);
    return res.data;
};
