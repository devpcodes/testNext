import { getA8Instance } from '../myAxios';
export const fetchSnapshot = async codes => {
    try {
        const res = await getA8Instance(undefined, undefined, false).post('/Quotes/Snapshot', {
            codes,
        });
        if (res.data?.success === 'True') {
            return res.data?.result;
        } else {
            throw 'error';
        }
    } catch (error) {
        throw error;
    }
};
