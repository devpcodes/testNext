import axios from '../../myAxios';
export const verifyMenu = async function (url, token) {
    axios.defaults.withCredentials = true;
    const res = await axios({
        method: 'post',
        url: '/lykan/api/v1/service/verifyMenu',
        data: {
            url,
            token,
        },
    });
    return res;
};
