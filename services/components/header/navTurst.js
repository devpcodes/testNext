import axios from '../../myAxios';
import { getToken } from '../../../services/user/getToken';

export const trust = async function (trustUrl, trustBody) {
    trustBody.token = getToken();
    const res = await axios({
        method: 'post',
        url: trustUrl,
        data: trustBody,
    });
    return res;
};
