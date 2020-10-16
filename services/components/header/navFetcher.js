import axios from '../../myAxios';

export const getNav = async function ({ token = '', domain = '' } = {}) {
    // https://servicerd.sinotrade.com.tw/lykan/api/v1/service/getMenu
    const url = '/lykan/api/v1/service/getMenu';
    const res = await axios.post(url, {
        token,
        domain,
    });
    return res.data;
};
