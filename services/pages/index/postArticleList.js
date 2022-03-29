import axios from '../../myAxios';

export const postArticleList = async function (limit = 4, keyword) {
    const data = {
        limit: limit,
        sort: [
            {
                column: 'createdAt',
                order: 'desc',
            },
        ],
    };
    if (keyword != null) {
        data.keyword = keyword;
    }
    try {
        const res = await axios({
            method: 'post',
            url: '/richclub/api/article/list',
            data,
        });
        if (res.status === 200 && res.data.err === false) {
            return res.data.data.filtered;
        } else {
            throw '伺服器錯誤，請稍後再試';
        }
    } catch (error) {
        throw '伺服器錯誤，請稍後再試';
    }
};
