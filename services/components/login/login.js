import axios from 'axios';

export const submit = async function(account, password){
    const res = await axios({
        method: 'post',
        baseURL: process.env.NEXT_PUBLIC_LYKAN,
        url: '/v1/auth/login',
        data: {
            user_id: account,
            password,
            domain: "NewWeb"
        }
    })
    return res;
}
