import { useState, useEffect } from 'react';
import AccountTable from '../../tradingAccount/vipInventory/AccountTable';
const data = [];
const AmountTable = () => {
    const [columns, setColumns] = useState([]);
    useEffect(() => {
        const newColumns = [
            {
                title: '日期',
                dataIndex: 'date',
                key: 'date',
                width: 100,
                render: (text, record) => {
                    return text;
                },
            },
            {
                title: '明細',
                dataIndex: 'detail',
                key: 'detail',
                width: 300,
            },
            {
                title: '金額',
                dataIndex: 'amount',
                key: 'amount',
                width: 100,
            },
        ];
        setColumns(newColumns);
    }, []);
    return (
        <>
            <AccountTable columns={columns} dataSource={data} />
        </>
    );
};

export default AmountTable;
