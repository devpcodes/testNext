import axios from '../../../services/myAxios';
export const getCommonQuestionCategories = async count => {
    const reqUrl = 'https://servicerd.sinotrade.com.tw/lykan/api/v1/service/commonQuestionCategories';
    const params = {
        questionCount: count,
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

export const getCommonQuestions = async params => {
    const reqUrl = 'https://servicerd.sinotrade.com.tw/lykan/api/v1/service/commonQuestions';
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
