import { getLykanInstance } from '../../myAxios';

// 商品搜尋
export const fetchProducts = async function ({
    query,
    marketType = ['S', 'SB', 'F', 'O'],
    limit = 30,
    isOrder = false,
}) {
    const url = `/product/searchItem`;
    const res = await getLykanInstance().post(url, {
        query,
        marketType,
        limit,
        isOrder, // 是否查詢可下單的商品
    });
    return res.data;
};

// 台股熱門商品
export const fetchPopularStocks = async () => {
    const url = `/product/getStockPopularItem`;
    const res = await getLykanInstance().get(url);
    return res.data;
};
