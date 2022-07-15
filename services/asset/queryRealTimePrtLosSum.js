import { getDivoInstance } from '../myAxios';

export const fetchQueryRealTimePrtLosSum = async function (token, asset_type, modal = true) {
    try {
        const url = `/assets/queryRealTimePrtLosSum`;
        const res = await getDivoInstance(undefined, modal).post(url, {
            token,
            asset_type: asset_type ? asset_type : null,
            isR6: true,
        });
        if (res.data.success != null && res.data.success === true) {
            return res.data.result;
        } else {
            return [];
        }
    } catch (error) {
        return '伺服器錯誤';
    }
};
