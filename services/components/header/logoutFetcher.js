import axios from '../../myAxios';

export const logout = async function () {
    // https://servicerd.sinotrade.com.tw/lykan/api/v1/auth/logout
    const url = '/lykan/api/v1/auth/logout';
    const res = await axios.post(url);
    return res.data;
};
