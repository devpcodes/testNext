import axios from '../../myAxios';

export const getNav = async function () {
    // https://servicerd.sinotrade.com.tw/lykan/api/v1/service/getMenu
    const url = '/lykan/api/v1/service/getMenu';
    const res = await axios.post(url);
    return res.data;
};
