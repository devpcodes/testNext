import axios from '../../../services/myAxios';
export const getCommonQuestionCategories = async count => {
    const reqUrl = `${process.env.NEXT_PUBLIC_LYKAN}/v1/service/commonQuestionCategories`;
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
    const reqUrl = `${process.env.NEXT_PUBLIC_LYKAN}/v1/service/commonQuestions`;
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
