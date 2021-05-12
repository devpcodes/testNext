import { useEffect, useState, useMemo, useCallback } from 'react';
import { Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import useSWR from 'swr';
import { useSelector, useDispatch } from 'react-redux';
import { orderStatusQueryFetcherWithSWR } from '../../../../services/components/goOrder/orderStatusQueryFetcher';
import AccountTable from '../vipInventory/AccountTable';
import { getToken } from '../../../../services/user/accessToken';
import {
    mappingCommissionedCode,
    mappingPriceMsg,
    mappingCommissionedCodeTradingAcc,
    mappingShowChangeBtn,
    mappingStatusMsg,
} from '../../../../services/components/goOrder/dataMapping';
import ControlBtns from './ControlBtns';
import { usePlatform } from '../../../../hooks/usePlatform';
import { delOrderList } from '../../../../services/components/tradingAccount/delOrderList';
import DropFilterSearch from '../vipInventory/DropFilterSearch';
import DropfilterCheckBox from '../vipInventory/DropfilterCheckBox';
import { formatPrice, formatPriceByUnit } from '../../../../services/numFormat';
import { setModal } from '../../../../store/components/layouts/action';
import { formatNum } from '../../../../services/formatNum';
import { timeFormatter } from '../../../../services/timeFormatter';

const VipOrderStatusTable = ({ showDelBtn, controlReload, getSearchVal, getPageInfoText, getData, getFilterStock }) => {
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [pageSize, setPageSize] = useState(50);
    const [total, setTotal] = useState(0);
    const [error, setError] = useState('');
    const [reload, setReload] = useState(0);
    const [searchColumns, setSearchColumns] = useState([]);
    const [filterSearchVal, setFilterSearchVal] = useState('');
    const [searchWords, setSearchWords] = useState('');
    const [searchStatus, setSearchStatus] = useState([]);
    const [searchBuySell, setSearchBuySell] = useState('');

    const userInfo = useSelector(store => store.user.currentAccount);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const platform = usePlatform();
    const dispatch = useDispatch();
    const postData = useMemo(() => {
        if (userInfo.account != null) {
            const account = userInfo.account;
            const action = 'account';
            const broker_id = userInfo.broker_id;
            const stock_id = searchWords;
            const token = getToken();
            const user_id = userInfo.idno;
            const postData = {
                account,
                action,
                broker_id,
                stock_id,
                token,
                user_id,
                pageIndex: currentPage,
                pageSize,
                status: searchStatus,
                bs: searchBuySell,
            };
            if (!searchBuySell) {
                delete postData.bs;
            }
            return postData;
        } else {
            return {};
        }
    }, [userInfo, currentPage, pageSize, searchWords, searchStatus, searchBuySell]);
    const { data: fetchData } = useSWR(
        [JSON.stringify(postData), reload, controlReload],
        orderStatusQueryFetcherWithSWR,
        {
            onError: (error, key) => {
                Modal.error({
                    title: '伺服器錯誤',
                });
                setError('伺服器錯誤');
            },
            errorRetryCount: 3,
            focusThrottleInterval: 10000,
            errorRetryInterval: 10000,
        },
    );

    useEffect(() => {
        if (fetchData?.totalCount != null) {
            setTotal(fetchData.totalCount);
        }
        let newData = [];
        if (Array.isArray(fetchData?.data)) {
            setError('');
            // newData = fetchData.data.sort((a, b) => {
            //     if (a.ord_time.length <= 6) {
            //         a.ord_time += '000';
            //     }
            //     if (b.ord_time.length <= 6) {
            //         b.ord_time += '000';
            //     }
            //     return Number(b.ord_time) - Number(a.ord_time);
            // });
            newData = fetchData.data;
            newData = newData.map((item, index) => {
                item.key = index;
                item.platform = platform;
                return item;
            });
            setSelectedRowKeys([]);
            setData(newData);
            if (getData != null) {
                getData(fetchData);
            }
        }
    }, [fetchData]);

    const delClickHandler = useCallback(id => {
        dispatch(
            setModal({
                visible: true,
                title: '刪單確認',
                content: '確認刪除1筆資料嗎？',
                type: 'confirm',
                onOk: async () => {
                    dispatch(setModal({ visible: false }));
                    const delData = data.filter(item => {
                        if (item.key === id) {
                            return true;
                        }
                    });
                    let res = await delOrderList(userInfo, delData);
                    // Modal.info({
                    //     content: res[0],
                    // });
                    dispatch(setModal({ visible: true, content: res[0], type: 'info', title: '系統訊息' }));
                    setReload(prev => {
                        return (prev += 1);
                    });
                },
            }),
        );
    });

    const searchHandler = useCallback(
        (confirm, val) => {
            confirm();
            // getUnRealPrtlos(currentAccount, { stock: val });
            setSearchColumns(columns => {
                if (!columns.includes('name_zh')) {
                    columns.push('name_zh');
                }
                return columns;
            });
            // 因為送出的資料，和ui顯示不同，所以新增變數儲存
            setFilterSearchVal(val);
            if (getFilterStock != null) {
                getFilterStock(val);
            }

            const submitVal = val.split(' ')[0];
            setSearchWords(submitVal);
            setCurrentPage(1);
        },
        [userInfo],
    );

    useEffect(() => {
        if (getSearchVal != null) {
            getSearchVal(searchWords);
        }
        if (showDelBtn != null) {
            showDelBtn([]);
        }
    }, [searchWords]);

    const searchResetHandler = useCallback(confirm => {
        confirm();
        if (searchColumns.indexOf('name_zh') !== -1) {
            setSearchColumns(columns => {
                const index = searchColumns.indexOf('name_zh');
                columns.splice(index, 1);
                return columns;
            });
            setSearchWords('');
            setFilterSearchVal('');
        }
    });

    const onStatusFilterSubmit = useCallback((confirm, val) => {
        if (val.length === 0) {
            onStatusFilterReset(confirm);
            return;
        }
        confirm();
        setSearchColumns(columns => {
            if (!columns.includes('status_code')) {
                columns.push('status_code');
            }
            return columns;
        });
        setSearchStatus(val);
        setCurrentPage(1);
    });

    const onStatusFilterReset = useCallback(confirm => {
        confirm();
        if (searchColumns.indexOf('status_code') !== -1) {
            setSearchColumns(columns => {
                const index = searchColumns.indexOf('status_code');
                columns.splice(index, 1);
                return columns;
            });
            setSearchStatus([]);
            setCurrentPage(1);
        }
    });

    const onBuySellFilterSubmit = useCallback((confirm, val) => {
        confirm();
        setSearchColumns(columns => {
            if (!columns.includes('buySell')) {
                columns.push('buySell');
            }
            return columns;
        });
        setSearchBuySell(val[0]);
        setCurrentPage(1);
    });
    const onBuySellFilterReset = useCallback(confirm => {
        confirm();
        if (searchColumns.indexOf('buySell') !== -1) {
            setSearchColumns(columns => {
                const index = searchColumns.indexOf('buySell');
                columns.splice(index, 1);
                return columns;
            });
            setSearchBuySell('');
            setCurrentPage(1);
        }
    });

    const getColumnSearchProps = dataIndex => {
        if (dataIndex === 'name_zh') {
            return {
                filterDropdown: ({ confirm }) => (
                    <DropFilterSearch
                        onSubmit={searchHandler.bind(null, confirm)}
                        onReset={searchResetHandler.bind(null, confirm)}
                        value={filterSearchVal}
                    />
                ),
                render: text =>
                    searchColumns.includes(dataIndex) ? (
                        <Highlighter
                            highlightStyle={{ padding: 0, color: '#daa360', backgroundColor: 'rgba(255,255,255,0)' }}
                            searchWords={[searchWords]}
                            autoEscape
                            textToHighlight={text ? text.toString() : ''}
                        />
                    ) : (
                        text
                    ),
            };
        } else if (dataIndex === 'status_code') {
            return {
                filterDropdown: ({ confirm }) => (
                    <DropfilterCheckBox
                        type={''}
                        onSubmit={onStatusFilterSubmit.bind(null, confirm)}
                        onReset={onStatusFilterReset.bind(null, confirm)}
                        value={searchStatus}
                        data={[
                            { text: '委託成功', value: '0' },
                            { text: '完全成交', value: '2' },
                            { text: '部分成交', value: '3' },
                        ]}
                    />
                ),
            };
        } else if (dataIndex === 'buySell') {
            return {
                filterDropdown: ({ confirm }) => (
                    <DropfilterCheckBox
                        type={'radio'}
                        onSubmit={onBuySellFilterSubmit.bind(null, confirm)}
                        onReset={onBuySellFilterReset.bind(null, confirm)}
                        value={searchBuySell}
                        data={[
                            { text: '買進', value: 'B' },
                            { text: '賣出', value: 'S' },
                        ]}
                    />
                ),
            };
        }
    };

    const submitSuccessHandler = useCallback(() => {
        setReload(prev => {
            return (prev += 1);
        });
    });

    useEffect(() => {
        const newColumns = [
            {
                title: '動作',
                dataIndex: 'active',
                key: 'active',
                // width: 100,
                render: (text, record) => {
                    return (
                        <ControlBtns
                            data={record}
                            delClickHandler={delClickHandler}
                            submitSuccess={submitSuccessHandler}
                        />
                    );
                },
            },
            {
                title: '狀態',
                dataIndex: 'status_code',
                key: 'status_code',
                // width: 100,
                ...getColumnSearchProps('status_code'),
                render: (text, record) => {
                    return (
                        <span style={{ opacity: record.status_code == 4 ? 0.45 : 1 }}>{mappingStatusMsg(text)}</span>
                    );
                },
            },
            {
                title: '商品',
                dataIndex: 'name_zh',
                key: 'name_zh',
                // width: '200px',
                ...getColumnSearchProps('name_zh'),
                render: (text, record) => {
                    return (
                        <span style={{ fontWeight: 'bold', opacity: record.status_code == 4 ? 0.45 : 1 }}>
                            {record.stock_id + ' ' + (record.name_zh || '')}
                        </span>
                    );
                },
            },
            {
                title: '買賣',
                dataIndex: 'buySell',
                key: 'buySell',
                // width: 100,
                ...getColumnSearchProps('buySell'),
                render: (text, record) => {
                    return (
                        <span
                            style={{
                                color: record.ord_bs === 'B' ? '#f45a4c' : '#22a16f',
                                opacity: record.status_code == 4 ? 0.45 : 1,
                            }}
                        >
                            {mappingCommissionedCodeTradingAcc(
                                record.ord_bs,
                                record.ord_type2,
                                record.market_id,
                                record.ord_type1,
                            )}
                        </span>
                    );
                },
            },
            {
                title: '條件',
                dataIndex: 'time_in_force',
                key: 'time_in_force',
                // width: 100,
                render: (text, record) => {
                    return <span style={{ opacity: record.status_code == 4 ? 0.45 : 1 }}>{text}</span>;
                },
            },
            {
                title: '委託價',
                dataIndex: 'price',
                key: 'price',
                align: 'right',
                // width: 100,
                render: (text, record) => {
                    return (
                        <span style={{ opacity: record.status_code == 4 ? 0.45 : 1 }}>
                            {formatPriceByUnit(
                                record.stock_id,
                                mappingPriceMsg(record.price, record.price_type, record.price_flag, record.ord_type1),
                            )}
                        </span>
                    );
                },
            },
            {
                title: '委託量',
                dataIndex: 'qty',
                key: 'qty',
                // width: 100,
                align: 'right',
                render: (text, record) => {
                    return <span style={{ opacity: record.status_code == 4 ? 0.45 : 1 }}>{formatNum(text)}</span>;
                },
            },
            {
                title: '取消量',
                dataIndex: 'cancel_qty',
                key: 'cancel_qty',
                // width: 100,
                align: 'right',
                render: (text, record) => {
                    return <span style={{ opacity: record.status_code == 4 ? 0.45 : 1 }}>{formatNum(text)}</span>;
                },
            },
            {
                title: '成交價',
                dataIndex: 'match_price',
                key: 'match_price',
                width: 100,
                align: 'right',
                render: (text, record) => {
                    return <span style={{ opacity: record.status_code == 4 ? 0.45 : 1 }}>{text}</span>;
                },
            },
            {
                title: '成交量',
                // width: 100,
                dataIndex: 'match_qty',
                key: 'match_qty',
                align: 'right',
                render: (text, record) => {
                    return <span style={{ opacity: record.status_code == 4 ? 0.45 : 1 }}>{formatNum(text)}</span>;
                },
            },
            {
                title: '剩餘量',
                // width: 100,
                dataIndex: 'last_qty',
                key: 'last_qty',
                align: 'right',
                render: (text, record) => {
                    return (
                        <span style={{ opacity: record.status_code == 4 ? 0.45 : 1 }}>
                            {formatNum(record.qty - record.cancel_qty - record.match_qty)}
                        </span>
                    );
                },
            },
            {
                title: '委託書號',
                // width: 100,
                dataIndex: 'ord_no',
                key: 'ord_no',
                align: 'center',
                render: (text, record) => {
                    return <span style={{ opacity: record.status_code == 4 ? 0.45 : 1 }}>{text}</span>;
                },
            },
            {
                title: '網路單號',
                // width: 100,
                dataIndex: 'sord_seq',
                key: 'sord_seq',
                align: 'center',
                render: (text, record) => {
                    return <span style={{ opacity: record.status_code == 4 ? 0.45 : 1 }}>{text}</span>;
                },
            },
            {
                title: '委託時間',
                // width: 100,
                dataIndex: 'ord_time',
                key: 'ord_time',
                align: 'center',
                render: (text, record) => {
                    return <span style={{ opacity: record.status_code == 4 ? 0.45 : 1 }}>{timeFormatter(text)}</span>;
                },
            },
            {
                title: '原因',
                dataIndex: 'errmsg',
                key: 'errmsg',
                align: 'center',
                // width: 100,
                render: (text, record) => {
                    return <span style={{ opacity: record.status_code == 4 ? 0.45 : 1 }}>{text.trim()}</span>;
                },
            },
        ];
        setColumns(newColumns);
    }, [data, currentPage, searchColumns, searchWords]);

    const changeSelectedHandler = useCallback((selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys, selectedRows);
        setSelectedRowKeys(selectedRowKeys);
        if (showDelBtn != null) {
            showDelBtn(selectedRows);
        }
    });

    const pageChangeHandler = (page, pageSize) => {
        window.scrollTo(0, 0);
        setCurrentPage(page);
        setSelectedRowKeys([]);
    };

    const getCheckboxProps = useCallback(
        record => {
            return { disabled: !mappingShowChangeBtn(record.status_code) };
        },
        [data, currentPage],
    );

    // const getScrollX = data => {
    //     if (data?.length == 0) {
    //         return { x: 780 };
    //     } else {
    //         return { x: 780, y: 600 };
    //     }
    // };

    return (
        <>
            <AccountTable
                scroll={{ x: 780 }}
                columns={columns}
                dataSource={data}
                filterColumns={searchColumns}
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
                    spinning: fetchData == null && !error ? true : false,
                }}
                pagination={{
                    total: total,
                    showTotal: (total, range) => {
                        if (getPageInfoText != null) {
                            getPageInfoText(`${range[0]}-${range[1]} 筆委託 (共${total}筆委託)`);
                        }

                        return `${range[0]}-${range[1]} 筆委託 (共${total}筆委託)`;
                    },
                    defaultPageSize: pageSize,
                    defaultCurrent: 1,
                    showSizeChanger: false,
                    onChange: pageChangeHandler,
                    responsive: true,
                    current: currentPage,
                }}
                rowSelection={{
                    type: 'checkbox',
                    getCheckboxProps,
                    onChange: changeSelectedHandler,
                    selectedRowKeys,
                }}
            />
        </>
    );
};

export default VipOrderStatusTable;
