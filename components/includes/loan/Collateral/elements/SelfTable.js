import { useEffect, useState, useRef } from 'react';
import { InputNumber, message, Tooltip } from 'antd';
import moment from 'moment';
import AccountTable from '../../../tradingAccount/vipInventory/AccountTable';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useUser } from '../../../../../hooks/useUser';
import { fetchApplyInfo } from '../../../../../services/components/loznZone/calculation/fetchApplyInfo';
import { fetchPopularStocks } from '../../../../../services/components/loznZone/calculation/fetchPopularStocks';
import { getToken } from '../../../../../services/user/accessToken';
import { formatNum } from '../../../../../services/formatNum';
import closeIcon from '../../../../../resources/images/components/loanZone/menu-close-small.svg';
import cricleIcon from '../../../../../resources/images/components/loanZone/basic-help-circle.svg';
import _ from 'lodash';
import { setModal } from '../../../../../store/components/layouts/action';
import { fetchApplyRecord } from '../../../../../services/components/loznZone/calculation/getApplyRecord';
const SelfTable = ({ currentKey, setCurrentData, reset, stockData, canLoanHandler, reload }) => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [overviewTable, setOverviewTable] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const { isLogin } = useUser();
    const userSettings = useSelector(store => store.user.userSettings);
    const nowAccount = useRef('');
    const nowKey = useRef('');
    const router = useRouter();
    const [applyDate, setApplyDate] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        if (reload) {
            getAccountOverview();
        }
    }, [reload]);

    useEffect(() => {
        if (router.query.applyDate) {
            setApplyDate(router.query.applyDate);
        }
    }, [router]);

    useEffect(() => {
        if (stockData?.stockId != null && currentKey === 'self') {
            const cloneData = [...data];
            const result = cloneData.find(item => {
                return item.stockId === stockData.stockId;
            });
            if (result == null) {
                cloneData.push(stockData);
                sortSelfData(cloneData);
                setData(cloneData);
            } else {
                dispatch(
                    setModal({
                        visible: true,
                        type: 'info',
                        title: '??????',
                        content: '?????????????????????????????????',
                        okText: '??????',
                        noCloseIcon: true,
                        noTitleIcon: true,
                    }),
                );
            }
        }
    }, [stockData]);

    useEffect(() => {
        if (isLogin && (currentKey === 'inventory' || currentKey === 'notGuaranteed' || currentKey === 'guaranteed')) {
            getAccountOverview();
            setOverviewTable(true);
        }
        if (currentKey === 'self') {
            getPopularStocks();
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
            if (currentKey === 'self') {
                setData([]);
                return;
            }
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
        if (currentKey === 'inventory' || currentKey === 'notGuaranteed' || currentKey === 'guaranteed') {
            getInventoryColumn();
        }
        if (currentKey === 'self') {
            getSelfColumn();
        }
    }, [overviewTable, data, currentKey]);

    const getSelfColumn = () => {
        const newColumns = [
            {
                title: '??????',
                dataIndex: 'stockName',
                key: 'stockName',
                width: 100,
                render: (text, record) => {
                    return record.stockId + ' ' + text;
                },
            },
            {
                title: '????????????',
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
                title: '??????',
                width: 60,
                dataIndex: 'groupRate',
                key: 'groupRate',
                align: 'right',
                render: text => {
                    return text != null ? Number(text) * 100 + '%' : '--';
                },
            },
            {
                title: '???????????????',
                dataIndex: 'canLoanMoney',
                key: 'canLoanMoney',
                width: 100,
                align: 'right',
                render: (text, record) => {
                    return formatNum(text);
                },
            },
            {
                title: '???????????????',
                width: 70,
                dataIndex: 'loanRate',
                key: 'loanRate',
                align: 'right',
                render: text => {
                    return text != null ? Number(text) * 10 + '???' : '--';
                },
            },
            {
                title: '??????',
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
        let newColumns = [];
        newColumns = [
            {
                title: '??????',
                dataIndex: 'stockName',
                key: 'stockName',
                width: 100,
                render: (text, record) => {
                    return record.stockId + ' ' + text;
                },
            },
            {
                title: '???????????????',
                dataIndex: 'canCollateralQty',
                key: 'canCollateralQty',
                width: 90,
                align: 'right',
                render: (text, record) => {
                    return text != null ? Number(text) : '--';
                },
            },
            {
                title: '??????????????????',
                dataIndex: 'expectedCollateralShare',
                key: 'expectedCollateralShare',
                align: 'center',
                width: 105,
                render: (text, record) => {
                    return (
                        <InputNumber
                            value={record.expectedCollateralShare}
                            min={0}
                            max={record.canCollateralQty}
                            onChange={inputChangeHandler.bind(null, record)}
                        />
                    );
                },
            },
            {
                title: '??????',
                width: 60,
                dataIndex: 'loanYearRate',
                key: 'loanYearRate',
                align: 'right',
                render: text => {
                    return text != null ? Number(text) * 100 + '%' : '--';
                },
            },
            {
                title: '???????????????',
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
                title: '????????????',
                width: 70,
                dataIndex: 'stockPercent',
                key: 'stockPercent',
                align: 'right',
                render: text => {
                    return text != null ? Number(text) * 10 + '???' : '--';
                },
            },
            {
                title: (
                    <span
                        style={{
                            marginRight: '7px',
                            display: 'inline-block',
                        }}
                    >
                        ?????????
                        <Tooltip
                            placement="bottom"
                            title={
                                '??????/??????/????????????????????????/?????????????????????/?????????/???????????????????????????????????????????????????????????????????????????'
                            }
                        >
                            <img
                                style={{
                                    display: 'inline-block',
                                    marginLeft: '2px',
                                    marginTop: '-2px',
                                    filter: 'opacity(0.7)',
                                    cursor: 'pointer',
                                }}
                                src={cricleIcon}
                            />
                        </Tooltip>
                    </span>
                ),
                width: 70,
                dataIndex: 'insider',
                key: 'insider',
                align: 'center',
                render: text => {
                    return text ? '???' : '???';
                },
            },
        ];
        if (currentKey === 'notGuaranteed') {
            newColumns = notGuaranteedHandler();
        }
        if (currentKey === 'guaranteed') {
            newColumns = guaranteedHandler();
        }
        setColumns(newColumns);
    };

    const guaranteedHandler = () => {
        return [
            {
                title: '????????????',
                dataIndex: 'stockName',
                key: 'stockName',
                width: 100,
                render: (text, record) => {
                    return record.stockId + ' ' + text;
                },
            },
            {
                title: '???????????????',
                dataIndex: 'collateralQty',
                key: 'collateralQty',
                width: 100,
                align: 'center',
                render: (text, record) => {
                    return text != null ? Number(text) / 1000 : '--';
                },
            },
            {
                title: '???????????????',
                dataIndex: 'close',
                key: 'close',
                width: 100,
                align: 'center',
                render: (text, record) => {
                    return text != null ? formatNum(Math.ceil(Number(record.collateralQty) * Number(text))) : '--';
                },
            },
        ];
    };

    const notGuaranteedHandler = () => {
        return [
            {
                title: '??????',
                dataIndex: 'stockName',
                key: 'stockName',
                width: 100,
                render: (text, record) => {
                    return record.stockId + ' ' + text;
                },
            },
            {
                title: '???????????????',
                dataIndex: 'canCollateralQty',
                key: 'canCollateralQty',
                width: 100,
                align: 'center',
                render: (text, record) => {
                    return text != null ? Number(text) : '--';
                },
            },
            {
                title: '??????',
                width: 100,
                dataIndex: 'loanYearRate',
                key: 'loanYearRate',
                align: 'center',
                render: text => {
                    return text != null ? Number(text) * 100 + '%' : '--';
                },
            },
            {
                title: '????????????',
                width: 100,
                dataIndex: 'stockPercent',
                key: 'stockPercent',
                align: 'center',
                render: text => {
                    return text != null ? Number(text) * 10 + '???' : '--';
                },
            },
            {
                title: '???????????????',
                dataIndex: 'canLoanMoney',
                key: 'canLoanMoney',
                width: 100,
                align: 'right',
                // sorter: (a, b) => {
                //     console.log('a', 'b', a, b);
                //     return Number(a.canLoanMoney) - Number(b.canLoanMoney);
                // },
                render: (text, record) => {
                    return formatNum(text);
                },
            },
        ];
    };

    const getPopularStocks = async () => {
        try {
            setLoading(true);
            const res = await fetchPopularStocks();
            setLoading(false);
            sortSelfData(res);
            // const selectedKeys = [];
            // res.forEach((item, index) => {
            //     item.key = index;
            //     item.expectedCollateralShare = 1;
            //     item.closePrice = item.reference;
            //     item.stockPercent = item.loanRate;
            //     item.canLoanMoney = canLoanMoneyHandler(item);
            //     // console.log(Number(item.closePrice), Number(item.stockQty), Number(item.loanRate));
            //     selectedKeys.push(item.key);
            // });
            // setSelectedRowKeys(selectedKeys);
            setData(res);
        } catch (error) {
            setSelectedRowKeys([]);
            setData([]);
            setLoading(false);
        }
    };

    const sortSelfData = nowData => {
        const selectedKeys = [];
        nowData = nowData.forEach((item, index) => {
            item.key = index;
            item.expectedCollateralShare = 1;
            item.closePrice = item.prevClose > 0 ? item.prevClose : item.reference;
            // item.closePrice = item.close;
            item.stockPercent = item.loanRate;
            item.canLoanMoney = canLoanMoneyHandler(item);
            // console.log(Number(item.closePrice), Number(item.stockQty), Number(item.loanRate));
            selectedKeys.push(item.key);
        });
        setSelectedRowKeys(selectedKeys);
        return nowData;
    };

    const allCanLoanHandler = data => {
        let allCanLoan = 0;
        data.forEach(item => {
            allCanLoan += Number(item.canLoanMoney);
        });
        if (canLoanHandler != null && currentKey === 'notGuaranteed') {
            console.log('allcanloan', allCanLoan);
            canLoanHandler(allCanLoan);
        }
    };

    const getApplyDateHandler = async () => {
        const token = getToken();
        const date = new Date();
        const startDate = moment(date).add(-3, 'Y').format('YYYYMMDD');
        try {
            const res = await fetchApplyRecord(token, currentAccount.broker_id, currentAccount.account, startDate);
            res.sort(function (a, b) {
                return Number(b.applyDate) - Number(a.applyDate);
            });
            console.log('res_applydate', res);
            return res[0].applyDate;
        } catch (error) {
            // message.error('???????????????')
        }
    };

    const getAccountOverview = async () => {
        console.log('currentAccount', currentAccount);
        if (currentAccount.account == null) return;
        const token = getToken();
        try {
            setLoading(true);
            let date = applyDate;

            // if(currentKey === 'guaranteed'){
            //     const overViewApplyDate = await getApplyDateHandler();
            //     date = overViewApplyDate;
            // }

            let result = await fetchApplyInfo(
                token,
                currentAccount.broker_id,
                currentAccount.account,
                date,
                currentKey,
            );
            setLoading(false);
            const selectedKeys = [];
            result.forEach((item, index) => {
                item.key = index;
                console.log('[applyDate]', applyDate, item.stockQty, item.collateralQty);
                if (applyDate !== '') {
                    item.expectedCollateralShare = item.collateralQty;
                    item.canCollateralQty = item.stockQty;
                } else {
                    item.expectedCollateralShare = item.stockQty - item.collateralQty;
                    item.canCollateralQty = item.stockQty - item.collateralQty;
                }
                item.canLoanMoney = canLoanMoneyHandler(item);
                console.log(Number(item.closePrice), Number(item.stockQty), Number(item.stockPercent));
                selectedKeys.push(item.key);
            });
            console.log('result..............', result);
            allCanLoanHandler(result);
            if (currentKey === 'notGuaranteed') {
                result = result.filter(element => {
                    return element.canCollateralQty != 0;
                });
            }
            if (currentKey === 'guaranteed') {
                result = result.filter(element => {
                    return element.collateralQty != 0;
                });
            }
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
            {currentKey !== 'notGuaranteed' && currentKey !== 'guaranteed' ? (
                <AccountTable
                    noDataSetting={{
                        text:
                            currentKey === 'self'
                                ? '???????????????????????????????????????????????????????????????'
                                : '???????????????????????????????????????????????????????????????????????????',
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
                    scroll={{ x: 650, y: 600 }}
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
                                ???????????????...
                            </div>
                        ),
                        spinning: loading,
                    }}
                />
            ) : (
                <AccountTable
                    noDataSetting={{
                        text:
                            currentKey === 'self'
                                ? '???????????????????????????????????????????????????????????????'
                                : currentKey === 'guaranteed' || currentKey === 'notGuaranteed'
                                ? '????????????'
                                : '??????????????????????????????????????????????????????????????????',
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
                    // rowSelection={{
                    //     type: 'checkbox',
                    //     onChange: changeSelectedHandler,
                    //     selectedRowKeys,
                    // }}
                    scroll={{ x: 650, y: 600 }}
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
                                ???????????????...
                            </div>
                        ),
                        spinning: loading,
                    }}
                />
            )}
        </>
    );
};

export default SelfTable;
