import axios from 'axios';
import { Modal } from 'antd';

axios.interceptors.response.use(res => {
    return res;
}, error=>{
    if(error.response == null){
        Modal.error({content: '伺服器錯誤，請稍後再試'});
    }else{
        if(error.response.data != null){
            Modal.error({content: error.response.data.message});
        }else{
            Modal.error({content: '伺服器錯誤，請稍後再試'});
        }
    }
    return Promise.reject(error)
});

export default axios;