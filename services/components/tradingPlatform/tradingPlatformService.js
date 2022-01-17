import axios from '../../myAxios';

export const getTradingAppCategories = async () => {
    const reqUrl = 'https://servicerd.sinotrade.com.tw/lykan/api/v1/service/tradingAppCategories';
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

export const getTradingAppCategoriesAndProduct = async categoryCode => {
    const reqUrl = `https://servicerd.sinotrade.com.tw/lykan/api/v1/service/tradingAppCategory/${categoryCode}`;
    const params = {
        categoryCode,
    };
    try {
        const res = await axios.get(reqUrl, { params });
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

export const getTradingAppDetail = async appCode => {
    const reqUrl = `https://servicerd.sinotrade.com.tw/lykan/api/v1/service/tradingApp/${appCode}`;
    const params = {
        appCode: appCode,
    };
    try {
        const res = await axios.get(reqUrl, { params });
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

export const getAnnouncement = async (keywords, counts) => {
    const reqUrl = `https://servicerd.sinotrade.com.tw/lykan/api/v1/service/announcements`;
    const params = {
        keywords,
        counts,
    };
    try {
        const res = await axios.get(reqUrl, { params });
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
