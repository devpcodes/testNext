import { useEffect, useState } from 'react';
import { Input, Button, Space } from 'antd';
import AccountTable from './AccountTable';

const VipInventoryComp = () => {
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([
        {
            category: '現股',
            product: '台積電',
            close: 633,
            yes: 10,
            todayBuy: 5,
            todaySell: 2,
        },
        {
            category: '現股',
            product: '永豐金',
            close: 12.5,
            yes: 2,
            todayBuy: 1,
            todaySell: 1,
        },
    ]);
    const getColumnSearchProps = dataIndex => {
        return {
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input value={''} style={{ width: 188, marginBottom: 8, display: 'block' }} />
                    <Space>
                        <Button type="primary" onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}>
                            Search
                        </Button>
                        <Button onClick={() => this.handleReset(clearFilters)} style={{ width: 90 }}>
                            Reset
                        </Button>
                        <Button type="link" size="small" onClick={() => {}}>
                            Filter
                        </Button>
                    </Space>
                </div>
            ),
        };
    };
    useEffect(() => {
        const newColumns = [
            {
                title: '類別',
                dataIndex: 'category',
                key: 'category',
                // sortOrder: sortKey === 'ord_time' && sortOrder,
            },
            {
                title: '商品',
                dataIndex: 'product',
                key: 'product',
                ...getColumnSearchProps('name'),
            },
            {
                title: '現價',
                dataIndex: 'close',
                key: 'close',
                sinoFilter: true,
                sinoFilterRender: (
                    <div
                        style={{ color: 'black' }}
                        onClick={() => {
                            alert('888');
                        }}
                    >
                        1234567888
                    </div>
                ),
            },
            {
                title: '昨餘',
                dataIndex: 'yes',
                key: 'yes',
            },
            {
                title: '今買成',
                dataIndex: 'todayBuy',
                key: 'todayBuy',
            },
            {
                title: '今賣成',
                dataIndex: 'todaySell',
                key: 'todaySell',
            },
        ];

        setColumns(newColumns);
    }, []);
    console.log('parent render');
    return (
        <div>
            <h2>庫存查詢</h2>
            <AccountTable columns={columns} dataSource={data} />
            <style jsx>
                {`
                    h2 {
                        font-size: 2.8rem;
                        color: #0d1623;
                        margin-top: -30px;
                        margin-bottom: 20px;
                    }
                `}
            </style>
            <style global jsx>{`
                .page__container {
                    background-color: #f9fbff;
                }
            `}</style>
        </div>
    );
};

export default VipInventoryComp;
