import axios from '../../myAxios';

const isServer = typeof window === 'undefined';

export const getNav = async function ({ token = '', domain = '', isMobile = false } = {}) {
    const url = isServer ? `${process.env.NEXT_PUBLIC_LYKAN}/v1/service/getMenu` : '/lykan/api/v1/service/getMenu';
    const res = await axios.post(url, {
        token,
        domain,
        isMobile,
    });
    return res.data;
};
