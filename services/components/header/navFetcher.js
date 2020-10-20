import axios from '../../myAxios';

export const getNav = async function ({ token = '', domain = '', isMobile = false } = {}) {
    // https://servicerd.sinotrade.com.tw/lykan/api/v1/service/getMenu
    const url = '/lykan/api/v1/service/getMenu';
    const res = await axios.post(url, {
        token,
        domain,
        isMobile,
    });
    return res.data;
};
