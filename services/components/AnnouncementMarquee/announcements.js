import axios from '../../myAxios';

export const getAnnounce = async slotCode => {
    const reqUrl = `${process.env.NEXT_PUBLIC_LYKAN}/v1/service/announcements`;
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
