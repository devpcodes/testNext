import axios from '../../myAxios';

export const submit = async function (account, password) {
    // login 有設置 cookie 的作用。因同源政策，由 nginx 將 lykan 設為同源，待舊站完全下架 (不再採用 cookie) 時，改發 https://servicerd.sinotrade.com.tw/lykan/api/v1/auth/login
    const res = await axios({
        method: 'post',
        url: '/lykan/api/v1/auth/login',
        data: {
            user_id: account,
            password,
            domain: 'NewWeb',
        },
    });
    return res;
};
