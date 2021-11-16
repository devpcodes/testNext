import { getA8Instance } from '../../../myAxios';
export const postSbcoCodeWithSwr = async strObj => {
    if (JSON.parse(strObj).length > 0) {
        return await postSbcoCode(JSON.parse(strObj));
    }
};
// stockList = [{exchange: "SEHK", code: "00001"}]
export const postSbcoCode = async stockList => {
    var url = `/codeList/sbco_code`;
    try {
        const res = await getA8Instance('v1', undefined, true).post(url, {
            stockList,
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
