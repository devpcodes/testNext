import { getA8StpInstance } from '../../../myAxios';

export const fetchAccountStatus = async function (token) {
    try {
        const url = '/loan/api/accountStatus';
        const res = await getA8StpInstance(false).get(url, {
            headers: { token: `${token}` },
        });

        return res.data;
    } catch (error) {
        throw error;
    }
};
