import { useState, useEffect } from 'react';
import moment from 'moment';
import { fetchAppropriationDetail } from '../../../../services/components/subscriptionOverview/fetchAppropriationDetail';
import { getToken } from '../../../../services/user/accessToken';
import AccountTable from '../../tradingAccount/vipInventory/AccountTable';
import _ from 'lodash';
import { formatNum } from '../../../../services/formatNum';
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
const mockData = [
    {
        tradeDate: '20210302',
        valueDate: '20210302',
        accountNo: '10806200000016',
        memo: 'string',
        reversal: 'string',
        amount: '5000.0000',
        balance: 'string',
        exgRate: 'string',
        remarkS: '還款',
        remarkF: '還款',
        chqNo: 'string',
        tradeTime: '17:12',
        oactno: 'string',
    },
    {
        tradeDate: '20220303',
        valueDate: '20220303',
        accountNo: '10806200000016',
        memo: 'string',
        reversal: 'string',
        amount: '5000.0000',
        balance: 'string',
        exgRate: 'string',
        remarkS: '還款',
        remarkF: '還款',
        chqNo: 'string',
        tradeTime: '17:12',
        oactno: 'string',
    },
    {
        tradeDate: '20220303',
        valueDate: '20220303',
        accountNo: '10806200000016',
        memo: 'string',
        reversal: 'string',
        amount: '5000.0000',
        balance: 'string',
        exgRate: 'string',
        remarkS: '還款',
        remarkF: '還款',
        chqNo: 'string',
        tradeTime: '17:12',
        oactno: 'string',
    },
    {
        tradeDate: '20220304',
        valueDate: '20220304',
        accountNo: '10806200000016',
        memo: 'string',
        reversal: 'string',
        amount: '5000.0000',
        balance: 'string',
        exgRate: 'string',
        remarkS: '還款',
        remarkF: '還款',
        chqNo: 'string',
        tradeTime: '17:12',
        oactno: 'string',
    },
    {
        tradeDate: '20220307',
        valueDate: '20220307',
        accountNo: '10806200000016',
        memo: 'string',
        reversal: 'string',
        amount: '5000.0000',
        balance: 'string',
        exgRate: 'string',
        remarkS: '還款',
        remarkF: '還款',
        chqNo: 'string',
        tradeTime: '17:12',
        oactno: 'string',
    },
    {
        tradeDate: '20220102',
        valueDate: '20220102',
        accountNo: '10806200000016',
        memo: 'string',
        reversal: 'string',
        amount: '5000.0000',
        balance: 'string',
        exgRate: 'string',
        remarkS: '還款',
        remarkF: '還款',
        chqNo: 'string',
        tradeTime: '17:12',
        oactno: 'string',
    },
    {
        tradeDate: '20211202',
        valueDate: '20211202',
        accountNo: '10806200000016',
        memo: 'string',
        reversal: 'string',
        amount: '5000.0000',
        balance: 'string',
        exgRate: 'string',
        remarkS: '還款',
        remarkF: '還款',
        chqNo: 'string',
        tradeTime: '17:12',
        oactno: 'string',
    },
];
const AmountTable = () => {
    const [columns, setColumns] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const getData = async () => {
        try {
            const res = await fetchAppropriationDetail({
                token: getToken(),
                startDate: moment().add(-1, 'y').format('YYYYMMDD'),
                endDate: moment().format('YYYYMMDD'),
            });
            console.log('res', res);
            sortData(res);
        } catch (error) {
            setDataSource([]);
            //TODO MOCK
            sortData([]);
        }
    };
    const sortData = data => {
        var data = data.sort(function (a, b) {
            return Number(a.tradeDate) - Number(b.tradeDate);
        });
        data = data.reverse();
        let newData = [];
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            newData.push({ groupDate: moment(element.tradeDate).format('YYYYMM') });
            newData.push(element);
        }
        newData.map((item, index) => {
            item.key = index;
            return item;
        });
        // newData = _.uniqBy(newData, 'tradeDate');
        newData = _.uniqBy(newData, i => {
            if (i.groupDate != null) {
                return i.groupDate;
            } else {
                return i;
            }
        });
        newData.map((item, index) => {
            if (item.groupDate != null) {
                item.tradeDate = item.groupDate;
            }
            return item;
        });
        console.log('newData', newData);
        setDataSource(newData);
    };
    useEffect(() => {
        getData();
    }, []);
    useEffect(() => {
        const newColumns = [
            {
                title: '日期',
                dataIndex: 'tradeDate',
                key: 'tradeDate',
                width: 100,
                render: (text, record, index) => {
                    var obj = {
                        children: text,
                        props: {},
                    };
                    if (record.amount == null) {
                        obj.props.colSpan = 3;
                        obj.props.style = {
                            backgroundColor: '#f2f5fa',
                            height: '23px',
                            padding: 0,
                            fontSize: '14px',
                            color: '#3f5372',
                            paddingLeft: '27px',
                        };
                        obj.children = moment(obj.children).format('MM') + '月';
                        // return obj
                    } else {
                        obj.children = moment(obj.children).format('YYYY/MM/DD');
                        obj.props.colSpan = 1;
                    }
                    return obj;
                },
            },
            {
                title: '明細',
                dataIndex: 'remarkF',
                key: 'remarkF',
                width: 200,
                render: (text, record, index) => {
                    var obj = {
                        children: text,
                        props: {},
                    };
                    if (record.remarkF == null) {
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
                width: 100,
                align: 'right',
                render: (text, record, index) => {
                    var obj = {
                        children: formatNum(text),
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
            <AccountTable columns={columns} dataSource={dataSource} pagination={false} scroll={{ x: 375 }} />
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
