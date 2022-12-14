import axios from '../myAxios';
import { removeToken } from './accessToken';

export const logout = async function () {
    // logout 有清除 cookie 的作用。因同源政策，由 nginx 將 lykan 設為同源，待舊站完全下架 (不再採用 cookie) 時，改發 https://servicerd.sinotrade.com.tw/lykan/api/v1/auth/logout
    const url = '/lykan/api/v1/auth/logout';
    const res = await axios.post(url);
    // 清除 localStorage 裡的 token
    removeToken();
    // 清除 sessionStorage 裡與來源別相關的值
    sessionStorage.removeItem('newweb_platform');
    sessionStorage.removeItem('source'); // 舊站下架後可移除這行
    sessionStorage.removeItem('platform'); // 舊站下架後可移除這行
    sessionStorage.removeItem('newweb_modal');
    // localStorage.setItem('INCB', false);
    return res;
};
