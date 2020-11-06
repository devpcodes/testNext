import { getLykanInstance } from '../../myAxios';

export const getNav = async function ({ token = '', domain = '', isMobile = false } = {}) {
    const url = '/service/getMenu';
    const res = await getLykanInstance().post(url, {
        token,
        domain,
        isMobile,
    });
    return res.data;
};
