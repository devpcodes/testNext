import axios from '../../myAxios';

export const fetchGetRichClubReport = async function ({ code }) {
    try {
        const reqUrl = `${process.env.NEXT_PUBLIC_RICHCLUB}/api/article/list`;

        const res = await axios({
            method: 'post',
            url: reqUrl,
            data: {
                stockCode: code,
            },
        });

        if (res.data.err != null && res.data.err === false) {
            return res.data.err.data;
        } else {
            return '伺服器錯誤';
        }
    } catch (error) {
        return '伺服器錯誤';
    }
};
