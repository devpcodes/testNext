import axios from '../../../myAxios';
export const fetchPs = async (code, token) => {
    const reqUrl = `/lykan/api/v1/labci/sinopacwidget/data/ps?k=${code}&e=ALL&l=1&lang=zh_TW&token=___token___`;
    try {
        const res = await axios.get(reqUrl);
        const data = res.data.substr(res.data.indexOf('['), res.data.indexOf(']') - res.data.indexOf('[') + 1);
        return JSON.parse(data)[0];
    } catch (error) {
        throw '伺服器錯誤';
    }
};
