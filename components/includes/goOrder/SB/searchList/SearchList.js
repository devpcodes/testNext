import { useEffect, useState } from 'react';
import SearchListTable from './SearchListTable';
const SearchList = () => {
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    useEffect(() => {
        const newColumns = [
            {
                title: '時間',
                dataIndex: 'ord_time',
                key: 'ord_time',
            },
            {
                title: '商品',
                dataIndex: 'name_zh',
                key: 'name_zh',
            },
            {
                title: '委託價/量',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: '成交價/量',
                dataIndex: 'match_price',
                key: 'match_price',
            },
            {
                title: '狀態',
                dataIndex: 'status_code',
                key: 'status_code',
            },
        ];
        const newData = [
            {
                ord_time: '03.25',
                name_zh: 'AAPL',
                price: 1000,
                match_price: 1000,
                status_code: '完全成交',
            },
            {
                ord_time: '03.26',
                name_zh: '00001',
                price: 1000,
                match_price: 1000,
                status_code: '部份成交',
            },
            {
                ord_time: '03.26',
                name_zh: '00001',
                price: 1000,
                match_price: 1000,
                status_code: '部份成交',
            },
        ];
        setColumns(newColumns);
        setData(newData);
    }, []);
    return (
        <>
            <SearchListTable data={data} columns={columns} />
        </>
    );
};

export default SearchList;
