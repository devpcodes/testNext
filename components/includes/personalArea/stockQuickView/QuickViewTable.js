import { Table } from 'antd';
const dataSource = [
    {
        key: '1',
        date: '2020.10.02',
        amount: -315,
        cruuency: 'USD',
    },
    {
        key: '2',
        date: '2020.10.03',
        amount: 435100,
        cruuency: 'NTD',
    },
    {
        key: '3',
        date: '2020.10.04',
        amount: -117,
        cruuency: 'CNY',
    },
];
  
const columns = [
    {
        title: '日期',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: '交割金額',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: '幣別',
        dataIndex: 'cruuency',
        key: 'cruuency',
    },
];
export const QuickViewTable = () => {
    return (
        <>
            <div className="stockQuickView__table">
                <Table pagination={false} dataSource={dataSource} columns={columns} />
            </div>
            
            <style jsx global>{`
                .stockQuickView__table .ant-table-tbody>tr>td, .ant-table-thead>tr>th, .ant-table tfoot>tr>td, .ant-table tfoot>tr>th {
                    padding: 0;
                }
                .stockQuickView__table .ant-table-thead>tr>th {
                    font-weight: bold;
                    color: #a9b6cb;
                }
                .stockQuickView__table .ant-table-thead>tr>th {
                    background: white;
                }
                .stockQuickView__table .ant-table-tbody>tr>td {
                    border: none;
                    color: #0d1623;
                }
                .stockQuickView__table .ant-table-tbody>tr>td :nth-child(2){
                    font-weight: bold;
                }
                .stockQuickView__table {
                    margin-bottom: 10px;
                }
            `}</style>
        </>
    );
};
