import axios from '../../../services/myAxios';
import { getCommonQuestionCategories } from './customerSupportService';

export const getCommonQuestion = async (page, pageSize, categoryId) => {
    let id;

    if (!categoryId) {
        const data = await getCommonQuestionCategories();
        id = data[0].id;
    }

    const reqUrl = 'https://servicerd.sinotrade.com.tw/lykan/api/v1/service/commonQuestions';
    const params = {
        page: page,
        pageSize: pageSize,
        categoryId: categoryId || id,
    };
    try {
        const res = await axios.get(reqUrl, { params: params });
        if (res.status === 200) {
            console.log('res.data', res.data.result);
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

export const getCommonQuestionArticle = async uuid => {
    const reqUrl = `https://servicerd.sinotrade.com.tw/lykan/api/v1/service/commonQuestion/${uuid}`;
    const params = {
        uuid,
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

export const getCommonQuestionSubcategories = async activeKey => {
    let id;

    if (!activeKey) {
        const data = await getCommonQuestionCategories();
        id = data[0].id;
    }

    const reqUrl = `https://servicerd.sinotrade.com.tw/lykan/api/v1/service/commonQuestionSubcategories`;

    const params = {
        categoryId: activeKey || id,
    };

    try {
        const res = await axios.get(reqUrl, { params: params });
        if (res.status === 200) {
            console.log('res.data', res.data);
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
