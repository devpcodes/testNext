import { getDivoInstance } from '../../myAxios';

export const getProfitLoss = async function ({ token = '', branch = '', account = '' } = {}) {
    const url = '/assets/getUnrealPrtlosSum';
    const res = await getDivoInstance().post(url, {
        token,
        branch,
        account,
    });
    return res.data;
};
