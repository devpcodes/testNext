import axios from '../../myAxios';
import { getCookie } from '../../../services/components/layouts/cookieController';
export const trust = async function (trustUrl, trustBody) {
    axios.defaults.withCredentials = true;
    trustBody.token = getCookie('token');
    const res = await axios({
        method: 'post',
        url: trustUrl,
        data: trustBody,
    });
    return res;
};
