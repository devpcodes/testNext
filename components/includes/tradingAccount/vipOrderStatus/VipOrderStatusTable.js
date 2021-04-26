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
    mappingCommissionedCodeTradingAcc,
    mappingShowChangeBtn,
    mappingStatusMsg,
} from '../../../../services/components/goOrder/dataMapping';
import ControlBtns from './ControlBtns';
import { usePlatform } from '../../../../hooks/usePlatform';
import { delOrderList } from '../../../../services/components/tradingAccount/delOrderList';
import DropFilterSearch from '../vipInventory/DropFilterSearch';
import { formatPrice } from '../../../../services/numFormat';
import { setModal } from '../../../../store/components/layouts/action';
const VipOrderStatusTable = ({ showDelBtn, controlReload, getSearchVal, getPageInfoText }) => {
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [error, setError] = useState('');
    const [reload, setReload] = useState(0);
    const [searchColumns, setSearchColumns] = useState([]);
    const [filterSearchVal, setFilterSearchVal] = useState('');
    const [searchWords, setSearchWords] = useState('');

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
            return {
                account,
                action,
                broker_id,
                stock_id,
                token,
                user_id,
                pageIndex: currentPage,
                pageSize,
            };
        } else {
            return {};
        }
    }, [userInfo, currentPage, pageSize, searchWords]);
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
            newData = fetchData.data.sort((a, b) => {
                if (a.ord_time.length <= 6) {
                    a.ord_time += '000';
                }
                if (b.ord_time.length <= 6) {
                    b.ord_time += '000';
                }
                return Number(b.ord_time) - Number(a.ord_time);
            });
            newData = newData.map((item, index) => {
                item.key = index;
                item.platform = platform;
                return item;
            });
            setSelectedRowKeys([]);
            setData(newData);
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
        } else {
            return {
                filterDropdown: ({ confirm }) => (
                    <></>
                    // <DropfilterCheckBox
                    //     type={''}
                    //     onSubmit={onFdSubmit.bind(null, confirm)}
                    //     onReset={onFdReset.bind(null, confirm)}
                    //     value={searchTtype === 'A' ? [] : searchTtype}
                    //     data={[
                    //         { text: '現股', value: '0' },
                    //         { text: '融資', value: '1' },
                    //         { text: '融券', value: '2' },
                    //     ]}
                    // />
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
                render: (text, record) => {
                    return <span style={{ opacity: record.status_code == 4 ? 0.45 : 1 }}>{text}</span>;
                },
            },
            {
                title: '委託價',
                dataIndex: 'price',
                key: 'price',
                align: 'right',
                render: (text, record) => {
                    return <span style={{ opacity: record.status_code == 4 ? 0.45 : 1 }}>{formatPrice(text)}</span>;
                },
            },
            {
                title: '委託量',
                dataIndex: 'qty',
                key: 'qty',
                align: 'right',
                render: (text, record) => {
                    return <span style={{ opacity: record.status_code == 4 ? 0.45 : 1 }}>{text}</span>;
                },
            },
            {
                title: '取消量',
                dataIndex: 'cancel_qty',
                key: 'cancel_qty',
                align: 'right',
                render: (text, record) => {
                    return <span style={{ opacity: record.status_code == 4 ? 0.45 : 1 }}>{text}</span>;
                },
            },
            {
                title: '成交價',
                dataIndex: 'match_price',
                key: 'match_price',
                align: 'right',
                render: (text, record) => {
                    return <span style={{ opacity: record.status_code == 4 ? 0.45 : 1 }}>{text}</span>;
                },
            },
            {
                title: '成交量',
                dataIndex: 'match_qty',
                key: 'match_qty',
                align: 'right',
                render: (text, record) => {
                    return <span style={{ opacity: record.status_code == 4 ? 0.45 : 1 }}>{text}</span>;
                },
            },
            {
                title: '剩餘量',
                dataIndex: 'last_qty',
                key: 'last_qty',
                align: 'right',
                render: (text, record) => {
                    return (
                        <span style={{ opacity: record.status_code == 4 ? 0.45 : 1 }}>
                            {record.qty - record.cancel_qty}
                        </span>
                    );
                },
            },
            {
                title: '委託書號',
                dataIndex: 'ord_no',
                key: 'ord_no',
                align: 'center',
                render: (text, record) => {
                    return <span style={{ opacity: record.status_code == 4 ? 0.45 : 1 }}>{text}</span>;
                },
            },
            {
                title: '網路單號',
                dataIndex: 'sord_seq',
                key: 'sord_seq',
                align: 'center',
                render: (text, record) => {
                    return <span style={{ opacity: record.status_code == 4 ? 0.45 : 1 }}>{text}</span>;
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
        setCurrentPage(page);
        setSelectedRowKeys([]);
    };

    const getCheckboxProps = useCallback(
        record => {
            return { disabled: !mappingShowChangeBtn(record.status_code) };
        },
        [data, currentPage],
    );

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
                            getPageInfoText(`${range[0]}-${range[1]} 檔個股 (共${total}檔個股)`);
                        }

                        return `${range[0]}-${range[1]} 檔個股 (共${total}檔個股)`;
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
