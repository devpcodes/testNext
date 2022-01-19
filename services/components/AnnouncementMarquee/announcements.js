import axios from '../../myAxios';

export const getAnnounce = async slotCode => {
    const reqUrl = `https://servicerd.sinotrade.com.tw/lykan/api/v1/service/announcements`;
    try {
        const res = await axios.get(reqUrl);
        if (res.status === 200) {
            return res.data.result;
        } else {
            console.log('error inside:', res.data.message);
            return res.data.message;
        }
    } catch (error) {
        console.log('error outside: ', error.message);
        return error.message;
    }
};
