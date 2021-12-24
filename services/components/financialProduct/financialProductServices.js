import axios from '../../myAxios';

export const getFinancialProductCategories = async () => {
    const reqUrl = 'https://servicerd.sinotrade.com.tw/lykan/api/v1/service/financialProductCategories';
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

export const getFinancialProductCategoriesAndProduct = async categoryCode => {
    const reqUrl = `https://servicerd.sinotrade.com.tw/lykan/api/v1/service/financialProductCategory/${categoryCode}`;
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

export const getFinancialProductDetail = async productCode => {
    const reqUrl = `https://servicerd.sinotrade.com.tw/lykan/api/v1/service/financialProduct/${productCode}`;
    const params = {
        appCode: productCode,
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
