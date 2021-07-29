import { getLykanInstance } from '../../myAxios';

export const fetchCheckTradingDate = async function (currentDate, type) {
    const reqUrl = '/service/checkTradingDate';
    let obj = {};
    if (type != null) {
        obj = {
            date: currentDate,
            type,
        };
    } else {
        obj = {
            date: currentDate,
        };
    }
    const res = await getLykanInstance().post(reqUrl, obj);
    return res.data;
};
