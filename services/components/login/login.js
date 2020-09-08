// import axios from 'axios';
import axios from '../../myAxios'
export const submit = async function(account, password){
    axios.defaults.withCredentials = true;
    const res = await axios({
        method: 'post',
        // baseURL: 'https://1b096c12038e.ngrok.io/api',//process.env.NEXT_PUBLIC_LYKAN http://128.110.38.69:5500/api
        url: '/lykan/api/v1/auth/login',///lykan/api
        data: {
            user_id: account,
            password,
            domain: "NewWeb"
        }
    })
    return res;
}
