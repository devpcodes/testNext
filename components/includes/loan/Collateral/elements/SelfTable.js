import { useEffect, useState } from 'react';
import { InputNumber } from 'antd';
import AccountTable from '../../../tradingAccount/vipInventory/AccountTable';
import { useDispatch, useSelector } from 'react-redux';
import { useUser } from '../../../../../hooks/useUser';
import { fetchApplyInfo } from '../../../../../services/components/loznZone/calculation/fetchApplyInfo';
import { getToken } from '../../../../../services/user/accessToken';
import { formatNum } from '../../../../../services/formatNum';
import closeIcon from '../../../../../resources/images/components/loanZone/menu-close-small.svg';

const SelfTable = ({ currentKey, setCurrentData, reset }) => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [overviewTable, setOverviewTable] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const { isLogin } = useUser();

    useEffect(() => {
        if (isLogin && currentKey === 'inventory') {
            getAccountOverview();
            setOverviewTable(true);
        }
    }, [isLogin, currentKey, currentAccount]);

    useEffect(() => {
        let nowData = [];
        selectedRowKeys.forEach(element => {
            data.forEach(item => {
                if (item.key === element) {
                    nowData.push(item);
                }
            });
        });
        setCurrentData(nowData);
        console.log('--------------', nowData);
    }, [data, selectedRowKeys]);

    useEffect(() => {
        if (reset) {
            const selectedKeys = [];
            data.forEach((item, index) => {
                item.expectedCollateralShare = 0;
                item.canLoanMoney = canLoanMoneyHandler(item);
                // selectedKeys.push(item.key);
            });
            setSelectedRowKeys(selectedKeys);
        }
    }, [reset]);

    useEffect(() => {
        if (currentKey === 'inventory') {
            getInventoryColumn();
        }
        if (currentKey === 'self') {
            getSelfColumn();
        }
    }, [overviewTable, data, currentKey]);

    const getSelfColumn = () => {
        const newColumns = [
            {
                title: '商品',
                dataIndex: 'stockName',
                key: 'stockName',
                width: 100,
                render: (text, record) => {
                    return record.stockId + ' ' + text;
                },
            },
            {
                title: '擔保張數',
                dataIndex: 'expectedCollateralShare',
                key: 'expectedCollateralShare',
                align: 'right',
                width: 105,
                render: (text, record) => {
                    return (
                        <InputNumber
                            value={record.expectedCollateralShare}
                            min={0}
                            max={999}
                            onChange={inputChangeHandler.bind(null, record)}
                        />
                    );
                },
            },
            {
                title: '利率',
                width: 60,
                dataIndex: 'loanYearRate',
                key: 'loanYearRate',
                align: 'right',
                render: text => {
                    return Number(text) * 100 + '%';
                },
            },
            {
                title: '可借款金額',
                dataIndex: 'canLoanMoney',
                key: 'canLoanMoney',
                width: 100,
                align: 'right',
                render: (text, record) => {
                    return formatNum(text);
                },
            },
            {
                title: '可貸款成數',
                width: 70,
                dataIndex: 'stockPercent',
                key: 'stockPercent',
                align: 'right',
                render: text => {
                    return Number(text) * 10 + '成';
                },
            },
            {
                title: '移除',
                width: 50,
                dataIndex: 'del',
                key: 'del',
                align: 'rigth',
                render: (text, record) => {
                    return (
                        <a
                            style={{
                                display: 'inline-block',
                                marginLeft: '2px',
                            }}
                            onClick={delHandler.bind(null, record)}
                        >
                            <img src={closeIcon} />
                        </a>
                    );
                },
            },
        ];
        setColumns(newColumns);
    };

    const getInventoryColumn = () => {
        const newColumns = [
            {
                title: '商品',
                dataIndex: 'stockName',
                key: 'stockName',
                width: 100,
                render: (text, record) => {
                    return record.stockId + ' ' + text;
                },
            },
            {
                title: '可擔保張數',
                dataIndex: 'stockQty',
                key: 'stockQty',
                width: 90,
                align: 'right',
                render: (text, record) => {
                    return Number(text);
                },
            },
            {
                title: '預計擔保張數',
                dataIndex: 'expectedCollateralShare',
                key: 'expectedCollateralShare',
                align: 'center',
                width: 105,
                render: (text, record) => {
                    return (
                        <InputNumber
                            value={record.expectedCollateralShare}
                            min={0}
                            max={record.stockQty}
                            onChange={inputChangeHandler.bind(null, record)}
                        />
                    );
                },
            },
            {
                title: '利率',
                width: 60,
                dataIndex: 'loanYearRate',
                key: 'loanYearRate',
                align: 'right',
                render: text => {
                    return Number(text) * 100 + '%';
                },
            },
            {
                title: '可借款金額',
                dataIndex: 'canLoanMoney',
                key: 'canLoanMoney',
                width: 100,
                align: 'right',
                sorter: (a, b) => {
                    console.log('a', 'b', a, b);
                    return Number(a.canLoanMoney) - Number(b.canLoanMoney);
                },
                render: (text, record) => {
                    return formatNum(text);
                },
            },
            {
                title: '融通成數',
                width: 70,
                dataIndex: 'stockPercent',
                key: 'stockPercent',
                align: 'right',
                render: text => {
                    return Number(text) * 10 + '成';
                },
            },
            {
                title: '內部人',
                width: 70,
                dataIndex: 'insider',
                key: 'insider',
                align: 'center',
                render: text => {
                    return text ? '是' : '否';
                },
            },
        ];

        setColumns(newColumns);
    };

    const getAccountOverview = async () => {
        console.log('currentAccount', currentAccount);
        const token = getToken();
        try {
            setLoading(true);
            const result = await fetchApplyInfo(token, currentAccount.broker_id, currentAccount.account);
            setLoading(false);
            const selectedKeys = [];
            result.forEach((item, index) => {
                item.key = index;
                item.expectedCollateralShare = item.stockQty;
                item.canLoanMoney = canLoanMoneyHandler(item);
                console.log(Number(item.closePrice), Number(item.stockQty), Number(item.stockPercent));
                selectedKeys.push(item.key);
            });
            console.log('result..............', result);
            setSelectedRowKeys(selectedKeys);
            setData(result);
        } catch (error) {
            setSelectedRowKeys([]);
            setData([]);
            setLoading(false);
        }
    };

    const delHandler = record => {
        let newCloanData = [...data];
        newCloanData = newCloanData.filter(item => {
            if (item.key === record.key) {
                return false;
            }
            return true;
        });
        setData(newCloanData);
    };

    const changeSelectedHandler = (selectedRowKeys, selectedRows) => {
        setSelectedRowKeys(selectedRowKeys);
        console.log('selected', selectedRows);
    };

    const inputChangeHandler = (record, val) => {
        console.log(record, val);
        record.expectedCollateralShare = val;
        let newCloanData = [...data];
        newCloanData = newCloanData.map(item => {
            if (item.key === record.key) {
                record.canLoanMoney = canLoanMoneyHandler(record);
                item = record;
                return item;
            }
            return item;
        });
        setData(newCloanData);
    };

    const canLoanMoneyHandler = record => {
        return (
            Math.floor(
                Number(record.closePrice) * Number(record.expectedCollateralShare) * Number(record.stockPercent),
            ) + '000'
        );
    };
    return (
        <>
            <AccountTable
                noDataSetting={{
                    text:
                        currentKey === 'self'
                            ? '目前還沒加入個股請使用上方搜尋列新增擔保品'
                            : '此帳號無庫存股票，請選擇其他帳號或自選試算。',
                    tStyle: {
                        width: '215px',
                        margin: '0 auto 20px auto',
                        whiteSpace: 'pre-wrap',
                        color: '#3f5372',
                    },
                }}
                columns={columns}
                dataSource={data}
                pagination={false}
                rowSelection={{
                    type: 'checkbox',
                    onChange: changeSelectedHandler,
                    selectedRowKeys,
                }}
                scroll={{ x: 650 }}
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
        </>
    );
};

export default SelfTable;
