import { useState, useEffect } from 'react';
import AccountTable from '../../tradingAccount/vipInventory/AccountTable';
const data = [
    {
        date: 12,
        key: 0,
    },
    {
        date: 1203,
        detail: '123456',
        amount: 10000,
        key: 1,
    },
    {
        date: 11,
        key: 2,
    },
    {
        date: 1103,
        detail: '123456',
        amount: 1000000,
        key: 3,
    },
    {
        date: 1101,
        detail: '123456',
        amount: 1000000,
        key: 4,
    },
];
const AmountTable = () => {
    const [columns, setColumns] = useState([]);
    useEffect(() => {
        const newColumns = [
            {
                title: '日期',
                dataIndex: 'date',
                key: 'date',
                width: 150,
                render: (text, record, index) => {
                    var obj = {
                        children: text,
                        props: {},
                    };
                    if (record.detail == null) {
                        obj.props.colSpan = 3;
                        obj.props.style = {
                            backgroundColor: '#f2f5fa',
                            height: '23px',
                            padding: 0,
                            fontSize: '14px',
                            color: '#3f5372',
                            paddingLeft: '27px',
                        };
                        obj.children += '月';
                        // return obj
                    } else {
                        obj.props.colSpan = 1;
                    }
                    return obj;
                    // const obj = {
                    //     children: text,
                    //     props: {}
                    //   };
                    //   console.log(obj.children, index);
                    //   if (index % 3 === 0) {
                    //     obj.props.colSpan = 3;
                    //   }
                    //   // These two are merged into above cell
                    //   if (index % 3 === 1) {
                    //     obj.props.colSpan = 3;
                    //   }
                    //   if (index % 3 === 2) {
                    //     obj.props.colSpan = 3;
                    //   }
                    //   return obj;
                },
            },
            {
                title: '明細',
                dataIndex: 'detail',
                key: 'detail',
                width: 300,
                render: (text, record, index) => {
                    var obj = {
                        children: text,
                        props: {},
                    };
                    if (record.detail == null) {
                        obj.props.colSpan = 0;
                    } else {
                        obj.props.colSpan = 1;
                    }
                    return obj;
                },
            },
            {
                title: '金額',
                dataIndex: 'amount',
                key: 'amount',
                width: 180,
                align: 'right',
                render: (text, record, index) => {
                    var obj = {
                        children: text,
                        props: {},
                    };
                    if (record.amount == null) {
                        obj.props.colSpan = 0;
                    } else {
                        obj.props.colSpan = 1;
                    }
                    return obj;
                },
            },
        ];
        setColumns(newColumns);
    }, []);
    return (
        <div className="amount__table">
            <AccountTable columns={columns} dataSource={data} pagination={false} scroll={{ x: 650 }} />
            <style jsx global>{`
                .amount__table .sino__table .ant-table-tbody > tr > td:last-child {
                    padding-right: 12px;
                }
                .amount__table .sino__table .ant-table-thead > tr > th:last-child {
                    padding-right: 12px;
                }
            `}</style>
        </div>
    );
};

export default AmountTable;
