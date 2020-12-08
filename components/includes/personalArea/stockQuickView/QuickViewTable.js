import PropTypes from 'prop-types';
import { Table } from 'antd';

// const dataSource = [
//     {
//         key: '1',
//         date: '2020.10.02',
//         amount: -315,
//         currency: 'USD',
//     },
//     {
//         key: '2',
//         date: '2020.10.03',
//         amount: 435100,
//         currency: 'NTD',
//     },
//     {
//         key: '3',
//         date: '2020.10.04',
//         amount: -117,
//         currency: 'CNY',
//     },
// ];

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
        dataIndex: 'currency',
        key: 'currency',
    },
];

export const QuickViewTable = ({ dataSource }) => {
    return (
        <>
            <div className="stockQuickView__table">
                <Table pagination={false} dataSource={dataSource} columns={columns} />
            </div>
            <style jsx global>{`
                .stockQuickView__table .ant-table-tbody > tr > td,
                .stockQuickView__table .ant-table-thead > tr > th,
                .stockQuickView__table .ant-table tfoot > tr > td,
                .stockQuickView__table .ant-table tfoot > tr > th {
                    padding: 0;
                }
                .stockQuickView__table .ant-table-thead > tr > th {
                    font-weight: bold;
                    color: #a9b6cb;
                    padding: 0 0 4px 0;
                }
                .stockQuickView__table .ant-table-thead > tr > th {
                    background: white;
                }
                .stockQuickView__table .ant-table-tbody > tr > td {
                    border: none;
                    color: #0d1623;
                    padding: 4px 0 0 0;
                }
                .stockQuickView__table .ant-table-tbody > tr > td :nth-child(2) {
                    font-weight: bold;
                    text-align: right;
                }
                .stockQuickView__table .ant-table-tbody > tr > td :nth-child(3) {
                    text-align: right;
                }
                .stockQuickView__table .ant-table-cell :nth-child(2) {
                    text-align: right;
                }
                .stockQuickView__table .ant-table-cell :nth-child(3) {
                    text-align: right;
                }
                .stockQuickView__table {
                    margin-bottom: 10px;
                }
                .stockQuickView__table .ant-empty-normal {
                    margin: 10px 0;
                }
                .stockQuickView__table .ant-table-tbody > tr.ant-table-row:hover > td {
                    background: unset;
                }
                @media (max-width: 768px) {
                    .stockQuickView__table .ant-table {
                        background: #0d1623;
                    }
                    .stockQuickView__table .ant-table-thead {
                        background: #0d1623;
                    }
                    .stockQuickView__table .ant-table-thead > tr > th {
                        background: #0d1623;
                    }
                    .stockQuickView__table .ant-table-container {
                        padding: 0 35px;
                        min-height: 65px;
                    }
                    .stockQuickView__table .ant-table-thead > tr > th {
                        border-bottom: solid 1.1px #121f32;
                        padding: 4px 0;
                        font-size: 1.6rem;
                    }
                    .stockQuickView__table .ant-table-tbody > tr > td {
                        color: white;
                        font-size: 1.6rem;
                    }
                    .stockQuickView__table .ant-table-tbody > tr > td :nth-child(2) {
                        font-weight: normal;
                    }
                    .stockQuickView__table .ant-table-tbody > tr > td {
                        padding: 4px 0 0 0;
                    }
                }
            `}</style>
        </>
    );
};

QuickViewTable.propTypes = {
    dataSource: PropTypes.array,
};
