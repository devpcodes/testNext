import { Modal } from 'antd';
import { getA8Instance } from '../myAxios';

export const fetchSnapshot = async codes => {
    try {
        const res = await getA8Instance(undefined, undefined, false).post('/Quotes/Snapshot', {
            codes,
        });
        if (res.data?.success === 'True') {
            return res.data?.result;
        } else {
            throw '伺服器錯誤';
        }
    } catch (error) {
        Modal.error({
            title: error,
        });
        throw error;
    }
};
