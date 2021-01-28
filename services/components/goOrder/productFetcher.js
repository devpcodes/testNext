import { getLykanInstance } from '../../myAxios';

export const fetchProducts = async function (value) {
    console.log(`value:`, value);

    const url = `/product/searchItem`;
    const res = await getLykanInstance().post(url, {
        query: value,
        marketType: ['S'],
        limit: 30,
        isOrder: false,
    });
    return res.data;
};
