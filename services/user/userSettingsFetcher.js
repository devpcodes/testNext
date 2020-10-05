import axios from '../myAxios';

export const fetchUserSettings = async function (userId, type = '') {
    const url = `/SinoTrade-Service/rest/service/v0/accountSettings/${userId}?filter=${type}`; // ?filter=stock | recommissioned | option
    const res = await axios.get(url);
    return res.data;
};
