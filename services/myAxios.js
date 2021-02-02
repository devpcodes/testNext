import axios from 'axios';
import { Modal } from 'antd';
import { checkServer } from './checkServer';
import { logout } from './user/logoutFetcher';
import { getCurrentPath } from './getCurrentPath';

const lykanDefaultVersion = 'v1';
const a8DefaultVersion = 'v1';
const a8Auth = {
    username: 'nweb',
    password: 'Nweb123',
};

const reLoginHandler = async () => {
    try {
        await logout();
        Modal.error({
            content: '帳號逾時，請重新登入。',
            onOk() {
                window.location = `${process.env.NEXT_PUBLIC_SUBPATH}/SinoTrade_login?currentPath=${encodeURIComponent(
                    getCurrentPath(),
                )}`;
            },
        });
    } catch (error) {
        console.error(`logout error:`, error);
    }
};

const errorHandler = (error, modal = true) => {
    const isServer = checkServer();
    const defaultErrorMsg = '伺服器錯誤，請稍後再試';

    if (error.response) {
        if (!isServer) {
            switch (error.response.status) {
                case 401:
                    reLoginHandler();
                    break;
                default:
                    modal &&
                        Modal.error({
                            content:
                                error.response.data.message ||
                                (error.response.data.result.msg && JSON.stringify(error.response.data.result.msg)) ||
                                defaultErrorMsg,
                        });
                    break;
            }
        }
    } else if (error.request) {
        !isServer && modal && Modal.error({ content: error.message || defaultErrorMsg });
    } else {
        !isServer && modal && Modal.error({ content: error.message || defaultErrorMsg });
    }

    return Promise.reject(error);
};

// axios 攔截器
axios.interceptors.response.use(
    res => res,
    error => {
        return errorHandler(error);
    },
);

// A8 instance：設置 call A8 server 的最低配置
const createA8Instance = (version = a8DefaultVersion, auth = a8Auth, baseUrl) =>
    axios.create({
        baseURL: baseUrl || `${process.env.NEXT_PUBLIC_A8}/${version}/`,
        timeout: 7000,
        auth,
        validateStatus: function (status) {
            return status >= 200 && status < 300;
        },
    });

export const getA8Instance = (version = a8DefaultVersion, auth = a8Auth, modal = true, baseUrl = '') => {
    const a8Ins = createA8Instance(version, auth, baseUrl);

    a8Ins.interceptors.response.use(
        response => response,
        error => {
            return errorHandler(error, modal);
        },
    );

    return a8Ins;
};

const createA8StpInstance = baseUrl =>
    axios.create({
        baseURL: baseUrl || `${process.env.NEXT_PUBLIC_A8}/${version}/`,
        timeout: 7000,
        validateStatus: function (status) {
            return status >= 200 && status < 300;
        },
    });

export const getA8StpInstance = (modal = false, baseUrl = '') => {
    const a8Ins = createA8StpInstance(baseUrl);
    a8Ins.interceptors.response.use(
        response => response,
        error => {
            return error.response;
            // return errorHandler(error, modal);
        },
    );
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

export const getLykanInstance = (version = lykanDefaultVersion, modal = true) => {
    const LykanIns = createLykanInstance(version);

    LykanIns.interceptors.response.use(
        response => response,
        error => {
            return errorHandler(error, modal);
        },
    );

    return LykanIns;
};

export default axios;
