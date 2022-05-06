import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { fetchListWithOrderStatus } from '../../../../services/components/mySubscription/fetchListWithOrderStatus';
// import { fetchLoginSubscriptionList } from '../../../../services/components/subscription/getLoginSubScriptionList';
import { getToken } from '../../../../services/user/accessToken';
import AccountTable from '../../tradingAccount/vipInventory/AccountTable';
import { formatNum } from '../../../../services/formatNum';
import TimeLine from './TimeLine';
import DropfilterCheckBox from '../../tradingAccount/vipInventory/DropfilterCheckBox';
const MySubscriptionTable = () => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [statusFilterValue, setStatusFilterValue] = useState('');
    const [searchColumns, setSearchColumns] = useState([]);
    useEffect(() => {
        getOrderStatus();
    }, [currentAccount]);
    useEffect(() => {
        const myColumns = [
            {
                title: '動作',
                width: '100px',
                dataIndex: 'action',
                key: 'action',
                render(text, record, idx) {
                    return '';
                },
            },
            {
                title: '申購狀態',
                width: '100px',
                dataIndex: 'status',
                key: 'status',
                ...getColumnSearchProps('status'),
                render(text, record, idx) {
                    return text;
                },
            },
            {
                title: '商品',
                width: '100px',
                dataIndex: 'stockName',
                key: 'stockName',
                render(text, record, idx) {
                    return record.stockId + ' ' + text;
                },
            },
            {
                title: '預扣款金額',
                width: '100px',
                dataIndex: 'orderAmount',
                key: 'orderAmount',
                align: 'right',
                sorter: (a, b) => {
                    return Number(a.orderAmount) - Number(b.orderAmount);
                },
                render(text, record, idx) {
                    return formatNum(text);
                },
            },
            {
                title: '申購張數',
                width: '100px',
                dataIndex: 'share',
                key: 'share',
                align: 'right',
                render(text, record, idx) {
                    return Number(text) / 1000;
                },
            },
            {
                title: '暫定承銷價',
                width: '100px',
                dataIndex: 'price',
                key: 'price',
                align: 'right',
                render(text, record, idx) {
                    return text;
                },
            },
            {
                title: '抽籤日',
                width: '100px',
                dataIndex: 'lotDate',
                key: 'lotDate',
                render(text, record, idx) {
                    return moment(text).format('YYYY/MM/DD');
                },
            },
            {
                title: '市場別',
                width: '120px',
                dataIndex: 'marketStatus',
                key: 'marketStatus',
                align: 'right',
                render(text, record, idx) {
                    return text;
                },
            },
        ];
        setColumns(myColumns);
    }, [data, searchColumns, statusFilterValue]);

    const getColumnSearchProps = dataIndex => {
        if (dataIndex === 'status') {
            return {
                filterDropdown: ({ confirm }) => (
                    <DropfilterCheckBox
                        type={'radio'}
                        onSubmit={onStatusFilterSubmit.bind(null, confirm)}
                        onReset={onStatusFilterReset.bind(null, confirm)}
                        // value={searchStatus}
                        data={[
                            { text: '全部', value: 'ALL' },
                            { text: '委託預約中', value: '申購期間已過' },
                            { text: '委託處理中', value: '委託處理中' },
                            { text: '委託已送出', value: '委託已送出' },
                            { text: '未中籤', value: '未中籤' },
                            { text: '已中籤', value: '已中籤' },
                        ]}
                    />
                ),
                filteredValue: [statusFilterValue] || null,
                onFilter: (value, record) => {
                    console.log('===', value);
                    if (value === 'ALL' || value === '') {
                        return true;
                    } else {
                        return record['status'].includes(value);
                    }
                },
            };
        }
    };

    const onStatusFilterSubmit = (confirm, val) => {
        confirm();
        setSearchColumns(columns => {
            if (!columns.includes('status')) {
                columns.push('status');
            }
            return columns;
        });
        setStatusFilterValue(val[0]);
    };

    const onStatusFilterReset = (confirm, val) => {
        confirm();
        if (searchColumns.indexOf('status') !== -1) {
            setSearchColumns(columns => {
                const index = searchColumns.indexOf('status');
                columns.splice(index, 1);
                return columns;
            });
            setStatusFilterValue('');
        }
    };

    const getOrderStatus = async () => {
        const token = getToken();
        if (token && currentAccount.broker_id) {
            const res = await fetchListWithOrderStatus(token, currentAccount.broker_id, currentAccount.account);
            if (res.length > 0) {
                const newData = res?.map((element, index) => {
                    element.key = index;
                    return element;
                });
                setData(newData);
            }
        }
    };

    const expandRender = record => {
        return (
            <TimeLine
                style={{
                    marginLeft: '16.5%',
                    width: '344px',
                    marginTop: '5px',
                    marginBottom: '5px',
                }}
                data={record}
            />
        );
    };

    return (
        <AccountTable
            filterColumns={searchColumns}
            pagination={true}
            columns={columns}
            dataSource={data}
            expandable={{
                expandedRowRender: expandRender,
                rowExpandable: record => record.name !== 'Not Expandable',
            }}
            scroll={{ x: 780 }}
        />
    );
};

export default MySubscriptionTable;
