import { getLykanInstance } from '../../myAxios';

export const fetchCheckTradingDate = async function (currentDate) {
    const reqUrl = '/service/checkTradingDate';
    const res = await getLykanInstance().post(reqUrl, {
        date: currentDate,
    });
    return res.data;
};
