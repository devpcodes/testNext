import { getLykanInstance } from '../myAxios';

export const fetchUserSettings = async function (token, market = 'ALL') {
    const url = `/service/getAccountSettings`;
    const res = await getLykanInstance().post(url, {
        token,
        market,
    });
    return res.data;
};
