import { useEffect, useState } from 'react';
import useSWR from 'swr';
import AccountTable from '../vipInventory/AccountTable';

const VipOrderStatusTable = () => {
    const [columns, setColumns] = useState([]);
    useEffect(() => {
        const newColumns = [
            {
                title: '動作',
                dataIndex: 'active',
                key: 'active',
            },
            {
                title: '狀態',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: '商品',
                dataIndex: 'product',
                key: 'product',
            },
            {
                title: '買賣',
                dataIndex: 'buySell',
                key: 'buySell',
            },
            {
                title: '條件',
                dataIndex: 'rod',
                key: 'rod',
            },
            {
                title: '委託價',
                dataIndex: 'orderPrice',
                key: 'orderPrice',
            },
            {
                title: '委託量',
                dataIndex: 'orderQty',
                key: 'orderQty',
            },
            {
                title: '取消量',
                dataIndex: 'cancelQty',
                key: 'cancelQty',
            },
            {
                title: '成交價',
                dataIndex: 'matchPrice',
                key: 'matchPrice',
            },
            {
                title: '成交量',
                dataIndex: 'matchQty',
                key: 'matchQty',
            },
            {
                title: '剩餘量',
                dataIndex: 'qty',
                key: 'qty',
            },
            {
                title: '委託書號',
                dataIndex: 'orderID',
                key: 'orderID',
            },
            {
                title: '網路單號',
                dataIndex: 'webID',
                key: 'webID',
            },
        ];
        setColumns(newColumns);
    }, []);
    return (
        <>
            <AccountTable scroll={{ x: 780 }} columns={columns} dataSource={[]} />
        </>
    );
};

export default VipOrderStatusTable;
