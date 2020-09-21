import axios from 'axios';
import { Modal } from 'antd';

axios.interceptors.response.use(res => {
    return res;
}, error=>{
    const isServer = typeof window === 'undefined';
    const defaultErrorMsg = '伺服器錯誤，請稍後再試';

    if(error.response == null){
        !isServer && Modal.error({content: defaultErrorMsg});
    }else{
        if(error.response.data != null){
            !isServer && Modal.error({content: error.response.data.message || defaultErrorMsg});
        }else{
            !isServer && Modal.error({content: defaultErrorMsg});
        }
    }
    return Promise.reject(error)
});

export default axios;