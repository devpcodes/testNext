import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
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
import { openGoOrder } from '../../../../services/openGoOrder';
import { useCheckMobile } from '../../../../hooks/useCheckMobile';
// import { WindowsOutlined } from '@ant-design/icons';
const mockData = [
    {
        branch: '9A95',
        account: '0685473',
        stockId: '2314s',
        orderNo: '00000000',
        orderDate: '20220321',
        isPreOrder: false,
        method: '2',
        loanStatus: '5',
        status: 'S',
        statusMessage: '存款不足',
        orderStatus: 'N1',
        orderStatusMessage: '委託預約中',
        canCancelOrder: true,
        canAppropriation: false,
        canCancelAppropriation: false,
        canSellStock: false,
        canMortgage: false,
        stockName: '台揚',
        stockFullName: '台揚科技股份有限公司',
        market: 'C',
        marketStatus: '發行後轉上櫃',
        brokerId: '8150',
        brokerName: '台新',
        price: 52,
        share: 850000,
        beginDate: '20220224',
        endDate: '20220301',
        feeDate: '20220302',
        lotDate: '20220303',
        moneyDate: '20220304',
        stkDate: '20220311',
        applyShare: 1000,
        actualShare: 850000,
        tfee: 20,
        bfee: 0,
        amount: 52000,
        mfee: 50,
        orderAmount: 52070,
        exShare: 850000,
        exPrice: 52,
        close: '82.7',
        diffPrice: '16.7',
        diffRatio: '25.30',
        currentDate: '20220305',
        key: '0',
    },
    {
        key: '1',
        branch: '9A95',
        account: '0685473',
        stockId: '2314s',
        orderNo: '00000000',
        orderDate: '20220321',
        isPreOrder: false,
        method: '2',
        loanStatus: '4',
        status: 'S',
        statusMessage: '存款不足',
        orderStatus: 'W1',
        orderStatusMessage: '委託預約中',
        canCancelOrder: true,
        canAppropriation: false,
        canCancelAppropriation: false,
        canSellStock: false,
        canMortgage: false,
        stockName: '台揚',
        stockFullName: '台揚科技股份有限公司',
        market: 'C',
        marketStatus: '發行後轉上櫃',
        brokerId: '8150',
        brokerName: '台新',
        price: 52,
        share: 850000,
        beginDate: '20220224',
        endDate: '20220301',
        feeDate: '20220302',
        lotDate: '20220303',
        moneyDate: '20220304',
        stkDate: '20220311',
        applyShare: 1000,
        actualShare: 850000,
        tfee: 20,
        bfee: 0,
        amount: 52000,
        mfee: 50,
        orderAmount: 52070,
        exShare: 850000,
        exPrice: 52,
        close: '82.7',
        diffPrice: '16.7',
        diffRatio: '25.30',
        currentDate: '20220312',
    },
];
const MySubscriptionTable = ({ refresh, payableHandler, applyStatus }) => {
    const pageSize = 10;
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [searchColumns, setSearchColumns] = useState([]);

    const [statusFilterValue, setStatusFilterValue] = useState('');
    const [methodFilterValue, setMethodFilterValue] = useState('');
    const [loanStatusFilterValue, setLoanStatusFilterValue] = useState('');
    const [cancelLoading, setCancelLoading] = useState(false);
    const [orderAmountSorter, setOrderAmountSorter] = useState('');
    const [lotDateSorter, setLotDateSorter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const isMobile = useCheckMobile();
    const router = useRouter();
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
                    const btnsArr = activeHandler(record);
                    console.log('btnsArr', btnsArr);
                    return (
                        <>
                            {btnsArr.map((element, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        {element === 'canCancelOrder' && (
                                            <SubscriptionBtn
                                                text="取消申購"
                                                colorType="blue"
                                                width={100 / btnsArr.length - 1 + '%'}
                                                onClick={clickHandler.bind(null, record, 'canCancelOrder')}
                                                loading={cancelLoading}
                                            />
                                        )}
                                        {element === 'canSellStock' && (
                                            <SubscriptionBtn
                                                text="賣出"
                                                colorType="green"
                                                width={100 / btnsArr.length - 1 + '%'}
                                                style={{ marginRight: 10 }}
                                                onClick={clickHandler.bind(null, record, 'canSellStock')}
                                            />
                                        )}
                                        {element === 'canMortgage' && (
                                            <SubscriptionBtn
                                                text="抵押"
                                                colorType="yellow"
                                                width={100 / btnsArr.length - 1 + '%'}
                                                style={{ marginRight: 10 }}
                                                onClick={clickHandler.bind(null, record, 'canMortgage')}
                                            />
                                        )}
                                        {element === 'canAppropriation' && (
                                            <SubscriptionBtn
                                                text="申請動用"
                                                colorType="red"
                                                width={100 / btnsArr.length - 1 + '%'}
                                                style={{ marginRight: 10, padding: '3px 5px 3px 5px' }}
                                                onClick={clickHandler.bind(null, record, 'canAppropriation')}
                                            />
                                        )}
                                        {element === 'canCancelAppropriation' && (
                                            <SubscriptionBtn
                                                text="取消動用"
                                                colorType="blue"
                                                width={100 / btnsArr.length - 1 + '%'}
                                                onClick={clickHandler.bind(null, record, 'canCancelAppropriation')}
                                                loading={cancelLoading}
                                                style={{ marginRight: 10, padding: '3px 5px 3px 5px' }}
                                            />
                                        )}
                                    </React.Fragment>
                                );
                            })}
                            {/* <SubscriptionBtn text="賣出" colorType="green" width={'49%'} style={{marginRight: 10}}/>
                            <SubscriptionBtn text="抵押" colorType="yellow" width={'49%'}/> */}
                            {/* <SubscriptionBtn
                                text="取消申購"
                                colorType="blue"
                                width={'100%'}
                                onClick={clickHandler.bind(null, record, 'cancel')}
                            /> */}
                        </>
                    );
                },
            },
            {
                title: '申購狀態',
                width: '100px',
                dataIndex: 'orderStatusMessage',
                key: 'orderStatusMessage',
                ...getColumnSearchProps('orderStatusMessage'),
                render(text, record, idx) {
                    return text;
                },
            },
            {
                title: '方式',
                width: '100px',
                dataIndex: 'method',
                key: 'method',
                ...getColumnSearchProps('method'),
                render(text, record, idx) {
                    return text === '1' ? '一般' : '借款';
                },
            },
            {
                title: '借還狀態',
                width: '100px',
                dataIndex: 'loanStatus',
                key: 'loanStatus',
                ...getColumnSearchProps('loanStatus'),
                render(text, record, idx) {
                    return loanStatusHandler(text);
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
            {
                title: '委託書號',
                width: '100px',
                dataIndex: 'orderNo',
                key: 'orderNo',
                align: 'right',
            },
        ];
        setColumns(myColumns);
    }, [data, searchColumns, statusFilterValue, cancelLoading, methodFilterValue, loanStatusFilterValue]);

    useEffect(() => {
        console.log(currentPage, orderAmountSorter, statusFilterValue);
    }, [currentPage, orderAmountSorter, statusFilterValue]);

    const clickHandler = (record, type) => {
        console.log(record, type);
        if (type === 'canCancelOrder') cancelHandler(record);
        if (type === 'canSellStock') sellHandler(record);
        if (type === 'canMortgage') mortgageHandler(record);
    };

    const loanStatusHandler = text => {
        switch (text) {
            case '0':
                return '待撥款';
            case '1':
                return '撥款成功';
            case '2':
                return '撥款失敗';
            case '3':
                return '待還款';
            case '4':
                return '還款成功';
            case '5':
                return '還款失敗';
            case '6':
                return '須人工還款';
            default:
                return '--';
        }
    };

    const sellHandler = record => {
        openGoOrder(
            {
                stockid: record.stockId,
                bs: 'S',
            },
            isMobile,
            router,
        );
    };

    const mortgageHandler = () => {
        const url =
            location.protocol + '//' + location.host + `${process.env.NEXT_PUBLIC_SUBPATH}` + '/loan-zone/Collateral/';
        window.open(url);
    };

    const activeHandler = record => {
        //TODO MOCK
        record.canAppropriation = true;
        const btnsArr = [];
        if (record.canCancelOrder) {
            btnsArr.push('canCancelOrder');
        }
        if (record.canCancelAppropriation) {
            btnsArr.push('canCancelAppropriation');
        }
        if (record.canSellStock) {
            btnsArr.push('canSellStock');
        }
        if (record.canMortgage) {
            btnsArr.push('canMortgage');
        }
        if (record.canAppropriation) {
            btnsArr.push('canAppropriation');
        }
        return btnsArr;
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
            setCancelLoading(true);
            try {
                const res = await postCancel({
                    branch: currentAccount.broker_id,
                    account: currentAccount.account,
                    stockId: record.stockId,
                    status: record.status,
                    ca_content,
                    client_ip: getCookie('client_ip'),
                    token,
                });
                message.success('取消申購已送出');
                setCancelLoading(false);
                getOrderStatus();
            } catch (error) {
                message.error(error);
                setCancelLoading(false);
            }
        }
    };

    const getColumnSearchProps = dataIndex => {
        if (dataIndex === 'orderStatusMessage') {
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
        if (dataIndex === 'method') {
            return {
                filterDropdown: ({ confirm }) => (
                    <DropfilterCheckBox
                        type={'radio'}
                        onSubmit={onMethodFilterSubmit.bind(null, confirm)}
                        onReset={onMethodFilterReset.bind(null, confirm)}
                        // value={searchStatus}
                        data={[
                            { text: '一般', value: '1' },
                            { text: '借款', value: '2' },
                        ]}
                    />
                ),
            };
        }
        if (dataIndex === 'loanStatus') {
            return {
                filterDropdown: ({ confirm }) => (
                    <DropfilterCheckBox
                        type={'checkbox'}
                        onSubmit={onLoanStatusFilterSubmit.bind(null, confirm)}
                        onReset={onLoanStatusFilterReset.bind(null, confirm)}
                        // value={searchStatus}
                        data={[
                            { text: '待撥款', value: '0' },
                            { text: '撥款成功', value: '1' },
                            { text: '撥款失敗', value: '2' },
                            { text: '待還款', value: '3' },
                            { text: '還款成功', value: '4' },
                            { text: '還款失敗', value: '5' },
                            { text: '須人工還款', value: '6' },
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

    const onLoanStatusFilterSubmit = (confirm, val) => {
        confirm();
        setSearchColumns(columns => {
            if (!columns.includes('loanStatus')) {
                columns.push('loanStatus');
            }
            return columns;
        });

        setLoanStatusFilterValue(val.toString());
    };

    const onLoanStatusFilterReset = (confirm, val) => {
        confirm();
        if (searchColumns.indexOf('loanStatus') !== -1) {
            setSearchColumns(columns => {
                const index = searchColumns.indexOf('loanStatus');
                columns.splice(index, 1);
                return columns;
            });
            setLoanStatusFilterValue('');
        }
    };

    const onMethodFilterSubmit = (confirm, val) => {
        confirm();
        setSearchColumns(columns => {
            if (!columns.includes('method')) {
                columns.push('method');
            }
            return columns;
        });

        setMethodFilterValue(val.toString());
    };

    const onMethodFilterReset = (confirm, val) => {
        confirm();
        if (searchColumns.indexOf('method') !== -1) {
            setSearchColumns(columns => {
                const index = searchColumns.indexOf('method');
                columns.splice(index, 1);
                return columns;
            });
            setMethodFilterValue('');
        }
    };

    const onStatusFilterSubmit = (confirm, val) => {
        confirm();
        setSearchColumns(columns => {
            if (!columns.includes('orderStatusMessage')) {
                columns.push('orderStatusMessage');
            }
            return columns;
        });

        setStatusFilterValue(val.toString());
    };

    const onStatusFilterReset = (confirm, val) => {
        confirm();
        if (searchColumns.indexOf('orderStatusMessage') !== -1) {
            setSearchColumns(columns => {
                const index = searchColumns.indexOf('orderStatusMessage');
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
        // debounce(getOrderStatus, 500);
        getOrderStatus();
    }, [statusFilterValue, currentPage, orderAmountSorter, lotDateSorter, methodFilterValue, loanStatusFilterValue]);

    const getOrderStatus = async () => {
        const token = getToken();
        if (token && currentAccount.broker_id) {
            //TODO MOCK
            // setData(mockData);
            setLoading(true);
            try {
                const res = await fetchOrderStatus({
                    token,
                    branch: currentAccount.broker_id,
                    account: currentAccount.account,
                    page: currentPage,
                    pageSize,
                    methodFilter: methodFilterValue,
                    orderStatusFilter: statusFilterValue,
                    loanStatusFilter: loanStatusFilterValue,
                    orderAmountSort: orderAmountSorter,
                    lotDateSort: lotDateSorter,
                });
                setLoading(false);
                setTotal(res.count);
                payableHandler(res.payable, res.receivable);
                if (res?.dataList?.length >= 0) {
                    const newData = res?.dataList?.map((element, index) => {
                        element.key = index;
                        // element.canSellStock = true;
                        // element.canMortgage = true;
                        // element.canCancelOrder = true;
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
                    // width: record.method === '2' ? '400px' : '344px',
                    marginTop: '5px',
                    marginBottom: '5px',
                }}
                data={record}
                applyStatus={applyStatus}
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
