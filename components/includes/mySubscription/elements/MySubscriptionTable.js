import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { fetchOrderStatus } from '../../../../services/components/mySubscription/fetchOrderStatus';
// import { fetchLoginSubscriptionList } from '../../../../services/components/subscription/getLoginSubScriptionList';
import { getToken } from '../../../../services/user/accessToken';
import AccountTable from '../../tradingAccount/vipInventory/AccountTable';
import { formatNum } from '../../../../services/formatNum';
import TimeLine from './TimeLine';
import DropfilterCheckBox from '../../tradingAccount/vipInventory/DropfilterCheckBox';
import { message } from 'antd';
import { debounce } from '../../../../services/throttle';
import SubscriptionBtn from './SubscriptionBtn';
import { checkSignCA, sign } from '../../../../services/webCa';
import { getCookie } from '../../../../services/components/layouts/cookieController';
import { postCancel } from '../../../../services/components/mySubscription/postCancel';
const MySubscriptionTable = ({ refresh, payableHandler }) => {
    const pageSize = 5;
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [searchColumns, setSearchColumns] = useState([]);

    const [statusFilterValue, setStatusFilterValue] = useState('');
    const [orderAmountSorter, setOrderAmountSorter] = useState('');
    const [lotDateSorter, setLotDateSorter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        if (currentAccount.broker_id != null && currentAccount.broker_id !== '') {
            // alert('0')
            debounce(getOrderStatus, 500);
            // getOrderStatus();
        }
    }, [currentAccount]);
    useEffect(() => {
        if (refresh) {
            getOrderStatus();
        }
    }, [refresh]);
    useEffect(() => {
        const myColumns = [
            {
                title: '動作',
                width: '100px',
                dataIndex: 'action',
                key: 'action',
                render(text, record, idx) {
                    return (
                        <>
                            {/* <SubscriptionBtn text="賣出" colorType="green" width={'49%'} style={{marginRight: 10}}/>
                            <SubscriptionBtn text="抵押" colorType="yellow" width={'49%'}/> */}
                            <SubscriptionBtn
                                text="取消申購"
                                colorType="blue"
                                width={'100%'}
                                onClick={clickHandler.bind(null, record, 'cancel')}
                            />
                        </>
                    );
                },
            },
            {
                title: '申購狀態',
                width: '100px',
                dataIndex: 'statusMessage',
                key: 'statusMessage',
                ...getColumnSearchProps('statusMessage'),
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
                sorter: true,
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
                sorter: true,
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

    useEffect(() => {
        console.log(currentPage, orderAmountSorter, statusFilterValue);
    }, [currentPage, orderAmountSorter, statusFilterValue]);

    const clickHandler = (record, type) => {
        console.log(record, type);
        if (type === 'cancel') cancelHandler(record);
    };

    const cancelHandler = async record => {
        const token = getToken();
        const ca_content = sign(
            {
                idno: currentAccount.idno,
                broker_id: currentAccount.broker_id,
                account: currentAccount.account,
            },
            true,
            token,
        );
        //branch, account, stockId, status, ca_content, client_ip
        if (checkSignCA(ca_content)) {
            const res = await postCancel({
                branch: currentAccount.broker_id,
                account: currentAccount.account,
                stockId: record.stockId,
                status: record.status,
                ca_content,
                client_ip: getCookie('client_ip'),
                token,
            });
        }
    };

    const getColumnSearchProps = dataIndex => {
        if (dataIndex === 'statusMessage') {
            return {
                filterDropdown: ({ confirm }) => (
                    <DropfilterCheckBox
                        type={'checkbox'}
                        onSubmit={onStatusFilterSubmit.bind(null, confirm)}
                        onReset={onStatusFilterReset.bind(null, confirm)}
                        // value={searchStatus}
                        data={[
                            { text: '委託預約中', value: 'S1' },
                            { text: '委託處理中', value: 'S2' },
                            { text: '委託已送出', value: 'Y' },
                            { text: '不合格件', value: 'N' },
                            { text: '未中籤', value: 'N1' },
                            { text: '已中籤', value: 'W1' },
                        ]}
                    />
                ),
                // filteredValue: [statusFilterValue] || null,
                // onFilter: (value, record) => {
                //     console.log('===', value);
                //     // handleTableChange(record, value);
                //     if (value === 'ALL' || value === '') {
                //         return true;
                //     } else {
                //         return record['status'].includes(value);
                //     }
                // },
            };
        }
    };

    const onStatusFilterSubmit = (confirm, val) => {
        confirm();
        setSearchColumns(columns => {
            if (!columns.includes('statusMessage')) {
                columns.push('statusMessage');
            }
            return columns;
        });

        setStatusFilterValue(val.toString());
    };

    const onStatusFilterReset = (confirm, val) => {
        confirm();
        if (searchColumns.indexOf('statusMessage') !== -1) {
            setSearchColumns(columns => {
                const index = searchColumns.indexOf('statusMessage');
                columns.splice(index, 1);
                return columns;
            });
            setStatusFilterValue('');
        }
    };

    const handleTableChange = (pagination, filters, sorter) => {
        console.log('------------.-', pagination, statusFilterValue, sorter);
        if (sorter.columnKey === 'orderAmount') {
            setLotDateSorter('');
            if (sorter.order == null) {
                setOrderAmountSorter('');
                return;
            }
            setOrderAmountSorter(sorter.order === 'ascend' ? '1' : '2');
        }
        if (sorter.columnKey === 'lotDate') {
            setOrderAmountSorter('');
            if (sorter.order == null) {
                setLotDateSorter('');
                return;
            }
            setLotDateSorter(sorter.order === 'ascend' ? '1' : '2');
        }
    };

    const pageChangeHandler = val => {
        console.log('vvv', val);
        setCurrentPage(val);
    };

    useEffect(() => {
        // console.log('************', orderAmountSorter)
        debounce(getOrderStatus, 500);
    }, [statusFilterValue, currentPage, orderAmountSorter, lotDateSorter]);

    const getOrderStatus = async () => {
        const token = getToken();
        if (token && currentAccount.broker_id) {
            setLoading(true);
            try {
                const res = await fetchOrderStatus({
                    token,
                    branch: currentAccount.broker_id,
                    account: currentAccount.account,
                    page: currentPage,
                    pageSize,
                    statusFilter: statusFilterValue,
                    orderAmountSort: orderAmountSorter,
                    lotDateSort: lotDateSorter,
                });
                setLoading(false);
                setTotal(res.count);
                payableHandler(res.payable, res.receivable);
                if (res?.dataList?.length >= 0) {
                    const newData = res?.dataList?.map((element, index) => {
                        element.key = index;
                        element.currentDate != null ? element.currentDate : moment().format('YYYYMMDD');
                        return element;
                    });
                    setData(newData);
                }
            } catch (error) {
                setLoading(false);
                message.error('伺服器錯誤');
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
            pagination={{
                onChange: pageChangeHandler,
                responsive: true,
                defaultPageSize: pageSize,
                current: currentPage,
                total,
            }}
            columns={columns}
            dataSource={data}
            expandable={{
                expandedRowRender: expandRender,
                rowExpandable: record => record.name !== 'Not Expandable',
            }}
            scroll={{ x: 780 }}
            onChange={handleTableChange}
            loading={{
                indicator: (
                    <div
                        style={{
                            marginTop: '20px',
                            color: 'black',
                            fontSize: '1.6rem',
                            width: '100%',
                            transform: 'translateX(-49%) translateY(-54px)',
                        }}
                    >
                        資料加載中...
                    </div>
                ),
                spinning: loading,
            }}
        />
    );
};

export default MySubscriptionTable;
