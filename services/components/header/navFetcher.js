import { getLykanInstance } from '../../myAxios';

export const getNav = async function ({ token = '', platform = '', isMobile = false } = {}) {
    const url = '/service/getMenu';
    const res = await getLykanInstance().post(url, {
        token,
        platform,
        isMobile,
    });
    return res.data;
};
