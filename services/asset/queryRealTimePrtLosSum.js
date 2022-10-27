import { getDivoInstance } from '../myAxios';

export const fetchQueryRealTimePrtLosSum = async function (token, asset_type, modal = true) {
    try {
        const url = `/assets/queryRealTimePrtLosSum`;
        const res = await getDivoInstance(undefined, modal).post(url, {
            token,
            asset_type: asset_type ? asset_type : null,
            isR6: true,
        });
        return res.data;
    } catch (error) {
        return '伺服器錯誤';
    }
};
