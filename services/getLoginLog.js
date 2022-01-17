import { getA8Instance } from '../services/myAxios';

export const fetchLoginLog = async function (dataCount, token, modal = true) {
    try {
        const url = `/checkLoginHistory`;
        const res = await getA8Instance(undefined, undefined, modal).post(url, {
            dataCount,
            token,
        });
        if (res.data.success != null && res.data.success === 'True') {
            return res.data.result;
        } else {
            return [];
        }
    } catch (error) {
        return '伺服器錯誤';
    }
};
