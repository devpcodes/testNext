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
                <div className="rectangle"></div>
            </div>
            <style jsx>{`
                @media (max-width: 768px) {
                }
            `}</style>
            <style jsx global>{`
                .stockQuickView__table .ant-table-tbody > tr > td,
                .ant-table-thead > tr > th,
                .ant-table tfoot > tr > td,
                .ant-table tfoot > tr > th {
                    padding: 0;
                }
                .stockQuickView__table .ant-table-thead > tr > th {
                    font-weight: bold;
                    color: #a9b6cb;
                }
                .stockQuickView__table .ant-table-thead > tr > th {
                    background: white;
                }
                .stockQuickView__table .ant-table-tbody > tr > td {
                    border: none;
                    color: #0d1623;
                }
                .stockQuickView__table .ant-table-tbody > tr > td :nth-child(2) {
                    font-weight: bold;
                    text-align: right;
                }
                .stockQuickView__table .ant-table-tbody > tr > td :nth-child(3) {
                    text-align: right;
                }
                .ant-table-cell :nth-child(2) {
                    text-align: right;
                }
                .ant-table-cell :nth-child(3) {
                    text-align: right;
                }
                .stockQuickView__table {
                    margin-bottom: 10px;
                }
                .stockQuickView__table .ant-empty-normal {
                    margin: 10px 0;
                }
                @media (max-width: 768px) {
                    .ant-table-thead {
                        background: none;
                    }
                    .stockQuickView__table .ant-table-thead > tr > th {
                        background: none;
                    }
                    .ant-table-container {
                        background-image: linear-gradient(to top, #0d1623, #080e16);
                        padding: 0 35px;
                        min-height: 65px;
                    }
                    .ant-table-thead > tr > th {
                        border-bottom: solid 1.1px #121f32;
                        padding: 8px 0;
                        font-size: 1.6rem;
                        padding-top: 15px;
                    }
                    .ant-table-thead > tr > td {
                        padding: 8px 0;
                    }
                    .stockQuickView__table .ant-table-tbody > tr > td {
                        color: white;
                        font-size: 1.6rem;
                    }
                    .stockQuickView__table .ant-table-tbody > tr > td :nth-child(2) {
                        font-weight: normal;
                    }
                    .ant-table {
                        border-top: 1px solid #17273d;
                    }
                    .stockQuickView__table .ant-table-tbody > tr > td {
                        padding: 8px 0;
                    }
                    .rectangle {
                        transform: rotate(-180deg);
                        background-image: linear-gradient(to top, #0d1623, #080e16);
                        width: 99%;
                        height: 10px;
                    }
                }
            `}</style>
        </>
    );
};

QuickViewTable.propTypes = {
    dataSource: PropTypes.array,
};
