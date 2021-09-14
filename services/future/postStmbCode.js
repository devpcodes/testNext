import { getA8Instance } from '../myAxios';

export const postStmbCode = async stockList => {
    var url = `/codeList/stmb_code`;
    try {
        const res = await getA8Instance('v1', undefined, true).post(url, {
            code: 'F',
            type: 'contract',
        });
        if (res.data.success === 'True') {
            return res.data.result;
        } else {
            throw 'error';
        }
    } catch (error) {
        throw '伺服器錯誤';
    }
};
