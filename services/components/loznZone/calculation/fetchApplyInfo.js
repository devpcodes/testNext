import { getA8StpInstance } from '../../../myAxios';
import moment from 'moment';
export const fetchApplyInfo = async function (token, branch, account) {
    try {
        const url = '/loan/api/applyInfo';
        const res = await getA8StpInstance(false).get(url, {
            headers: { token: `${token}` },
            params: {
                branch,
                account,
                applyDate: moment().format('YYYYMMDD'),
            },
        });

        if (res.data.success) {
            return res.data.result;
        } else {
            throw '伺服器錯誤';
        }
    } catch (error) {
        throw error;
    }
};
