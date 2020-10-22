
import axios from '../../myAxios';
export const submit = async function (A8_trust) {
    axios.defaults.withCredentials = true;
    const res = await axios({
        method: 'post',
        url: '/lykan/api/v1/auth/trustLogin', 
        data: {
            A8_trust
        },
    });
    return res;
};
