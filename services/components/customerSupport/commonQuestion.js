import axios from '../../../services/myAxios';
import { getCommonQuestionCategories } from './customerSupportService';

export const getCommonQuestion = async (categoryId, keywords, page, pageSize, category2ndIds, category3rdIds) => {
    /* let id;

    if (!categoryId) {
        const data = await getCommonQuestionCategories();
        id = data[0].id;
    } */

    const reqUrl = `${process.env.NEXT_PUBLIC_LYKAN}/v1/service/commonQuestions`;
    let params = {
        categoryId,
        keywords,
        page,
        pageSize: pageSize,
        category2ndIds,
        category3rdIds,
    };
    console.log('params', params);
    if (categoryId) {
        params = { ...params, categoryId: categoryId /* || id */ };
    }
    try {
        const res = await axios.get(reqUrl, { params: params });
        if (res.status === 200) {
            let data = res.data.result;
            console.log('res.data', res.data.result);
            data.dataList.forEach(ele => {
                ele.categoryId = ele.category.id;
                ele.category2ndId = ele.category2nd.id;
                ele.category3rdId = ele.category3rd.id;
                ele.category = ele.category.categoryName;
                ele.category2nd = ele.category2nd.categoryName;
                ele.category3rd = ele.category3rd.categoryName;
            });

            return data;
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
    const reqUrl = `${process.env.NEXT_PUBLIC_LYKAN}/v1/service/commonQuestion/${uuid}`;
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
    /* let id;

    if (!activeKey) {
        const data = await getCommonQuestionCategories();
        id = data[0].id;
    } */

    const reqUrl = `${process.env.NEXT_PUBLIC_LYKAN}/v1/service/commonQuestionSubcategories`;

    const params = {
        categoryId: activeKey,
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

export const putCommonQuestionIsLike = async (uuid, isLike) => {
    const params = {
        uuid,
        isLike,
    };

    const reqUrl = `${process.env.NEXT_PUBLIC_LYKAN}/v1/service/commonQuestion`;

    try {
        const res = await axios.put(reqUrl, params);
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
