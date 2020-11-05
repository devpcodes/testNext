import axios from 'axios';
import { Modal } from 'antd';

const lykanDefaultVersion = 'v1';
const a8DefaultVersion = 'v1';
const a8Auth = {
    username: 'nweb',
    password: 'Nweb123',
};

const errorHandler = error => {
    const isServer = typeof window === 'undefined';
    const defaultErrorMsg = '伺服器錯誤，請稍後再試';

    if (error.response == null) {
        !isServer && Modal.error({ content: defaultErrorMsg });
    } else {
        if (error.response.data != null) {
            if (!isServer) {
                const showConfirm = () => {
                    Modal.error({
                        content: '帳號逾時，請重新登入。',
                        onOk() {
                            return location.reload();
                        },
                    });
                };

                switch (error.response.status) {
                    case 401:
                        return showConfirm();
                    default:
                        Modal.error({ content: error.response.data.message || defaultErrorMsg });
                        break;
                }
            }
        } else {
            !isServer && Modal.error({ content: defaultErrorMsg });
        }
    }
    return Promise.reject(error);
};

axios.interceptors.response.use(res => {
    return res;
}, errorHandler);

// A8 instance：設置 call A8 server 的最低配置
const createA8Instance = (version = a8DefaultVersion, auth = a8Auth) =>
    axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_A8}/${version}/`,
        timeout: 7000,
        withCredentials: true,
        auth,
        validateStatus: function (status) {
            return status >= 200 && status < 300;
        },
    });

export const getA8Instance = (version = a8DefaultVersion, auth = a8Auth) => {
    const a8Ins = createA8Instance(version, auth);

    a8Ins.interceptors.response.use(response => {
        return response;
    }, errorHandler);

    return a8Ins;
};

// lykan instance：設置 call lykan server 的最低配置
const createLykanInstance = (version = lykanDefaultVersion) =>
    axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_LYKAN}/${version}/`,
        timeout: 7000,
        withCredentials: true,
        validateStatus: function (status) {
            return status >= 200 && status < 300;
        },
    });

export const getLykanInstance = (version = lykanDefaultVersion) => {
    const LykanIns = createLykanInstance(version);

    LykanIns.interceptors.response.use(response => {
        return response;
    }, errorHandler);

    return LykanIns;
};

export default axios;
