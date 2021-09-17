import { useState, useEffect, useCallback } from 'react';
import { Button, InputNumber, Select, Checkbox, Input, Tooltip } from 'antd';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import AccountTable from '../../../vipInventory/AccountTable';
import Btn from './Btn';
import OrderSelect from '../../../../goOrder/SB/sbPanel/OrderSelect';
import { themeColor } from '../../../../goOrder/panel/PanelTabs';
import { setOrderList } from '../../../../../../store/subBrokerage/action';
import { postQuerySubBrokerageQuote } from '../../../../../../services/components/tradingAccount/subBrokerage/postQuerySubBrokerageQuote';
import { getToken } from '../../../../../../services/user/accessToken';
import { setModal } from '../../../../../../store/components/layouts/action';
import DropFilterSearch from '../../../vipInventory/DropFilterSearch';

const { Option } = Select;
const BatchTable = ({ selectItemHandler, submitHandler, refresh, parentLoading, parentSelectedRowKeys }) => {
    const orderList = useSelector(store => store.subBrokerage.orderList);
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const [searchColumns, setSearchColumns] = useState([]);
    const [filterSearchVal, setFilterSearchVal] = useState('');
    const [searchWords, setSearchWords] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (refresh !== 0) {
            updatePriceHandler();
        }
    }, [refresh]);

    useEffect(() => {
        setSelectedRowKeys(parentSelectedRowKeys);
    }, [parentSelectedRowKeys]);

    useEffect(() => {
        if (orderList.length > 0) {
            let newOrderList = orderList.map((item, index) => {
                item.key = index;
                if (item?.GTCDate) {
                    item.gtcCheck = true;
                } else {
                    item.gtcCheck = false;
                }
                return item;
            });
            setData(newOrderList);
        } else {
            setData([]);
        }
    }, [orderList]);

    useEffect(() => {
        const newColumns = [
            {
                title: '項次',
                dataIndex: 'index',
                key: 'index',
                width: 100,
                align: 'center',
                render: (text, record) => {
                    return <span>{record.key + 1}</span>;
                },
            },
            {
                title: '動作',
                dataIndex: 'active',
                key: 'active',
                width: 100,
                align: 'left',
                render: (text, record) => {
                    return (
                        <div>
                            <Btn text={'刪'} BS={record.BS} clickHandler={delHandler.bind(null, record, data)} />
                            <Btn
                                text={'送'}
                                BS={record.BS}
                                clickHandler={submitHandler.bind(null, [record], 'signle')}
                            />
                        </div>
                    );
                },
            },
            {
                title: '商品',
                dataIndex: 'StockID',
                key: 'StockID',
                width: 100,
                align: 'left',
                ...getColumnSearchProps('StockID'),
                render: (text, record) => {
                    return (
                        <Tooltip title={record.StockName} placement={'topLeft'}>
                            <div>{text}</div>
                        </Tooltip>
                    );
                },
            },
            {
                title: '買賣',
                dataIndex: 'BS',
                key: 'BS',
                width: 100,
                align: 'left',
                render: (text, record) => {
                    return (
                        <div>
                            <OrderSelect
                                width="80px"
                                height="32px"
                                data={[
                                    { txt: '買進', val: 'B' },
                                    { txt: '賣出', val: 'S' },
                                ]}
                                color={record.BS === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor}
                                value={record.BS}
                                onChange={changeBS.bind(null, record, data)}
                            />
                        </div>
                    );
                },
            },
            {
                title: '股數',
                dataIndex: 'Qty',
                key: 'Qty',
                width: 105,
                align: 'left',
                render: (text, record) => {
                    return (
                        <div>
                            <InputNumber
                                step={record.lotSize}
                                onChange={changeQty.bind(null, record, data)}
                                value={parseInt(text)}
                            />
                        </div>
                    );
                },
            },
            {
                title: '價格',
                dataIndex: 'Price',
                key: 'Price',
                width: 108,
                align: 'left',
                render: (text, record) => {
                    return (
                        <div>
                            <InputNumber
                                value={parseFloat(text)}
                                step={record.priceJumpPoint}
                                onChange={changePrice.bind(null, record, data)}
                            />
                        </div>
                    );
                },
            },
            {
                title: '類別',
                dataIndex: 'aon',
                key: 'aon',
                width: 100,
                align: 'left',
                render: (text, record) => {
                    return (
                        <Select value={record.aon} onChange={changeAON.bind(null, record, data)}>
                            <Option value="ANY">ANY</Option>
                            <Option value="AON">AON</Option>
                        </Select>
                    );
                },
            },
            {
                title: '長效單',
                dataIndex: 'GTCDate',
                key: 'GTCDate',
                width: 200,
                align: 'left',
                render: (text, record) => {
                    return (
                        <div>
                            <Checkbox onChange={gtcCheck.bind(null, record, data)} checked={record.gtcCheck}></Checkbox>
                            <Input
                                type="date"
                                style={{
                                    border: '1px solid #d9d9d9',
                                    height: '33px',
                                    paddingLeft: '8px',
                                    width: '150px',
                                    marginLeft: '8px',
                                }}
                                value={
                                    text != null
                                        ? moment(text).format('YYYY-MM-DD')
                                        : moment().add(6, 'months').format('YYYY-MM-DD')
                                }
                                max={moment().add(6, 'months').format('YYYY-MM-DD')}
                                onChange={gtcChange.bind(null, record, data)}
                            />
                        </div>
                    );
                },
            },
            {
                title: '送單後保留',
                dataIndex: 'isKeep',
                key: 'isKeep',
                width: 100,
                align: 'center',
                render: (text, record) => {
                    return (
                        <div>
                            <Checkbox onChange={keepCheck.bind(null, record, data)} checked={text}></Checkbox>
                        </div>
                    );
                },
            },
        ];
        setColumns(newColumns);
    }, [data, searchColumns, searchWords]);

    const getColumnSearchProps = dataIndex => {
        if (dataIndex === 'StockID') {
            return {
                filterDropdown: ({ confirm }) => (
                    <DropFilterSearch
                        onSubmit={searchHandler.bind(null, confirm)}
                        onReset={searchResetHandler.bind(null, confirm)}
                        value={filterSearchVal}
                        marketType={['SB']}
                    />
                ),
                filteredValue: [searchWords] || null,
                onFilter: (value, record) => {
                    if (value === '') {
                        return true;
                    } else {
                        const symbolVal = value.split(' ')[0];
                        const nameVal = value.split(' ')[1];
                        const symbol = record.StockID;
                        if (symbol === symbolVal) {
                            return true;
                        }
                    }
                },
            };
        }
    };

    const searchHandler = useCallback((confirm, val) => {
        confirm();
        // getUnRealPrtlos(currentAccount, { stock: val });
        setSearchColumns(columns => {
            if (!columns.includes('StockID')) {
                columns.push('StockID');
            }
            return columns;
        });
        // 因為送出的資料，和ui顯示不同，所以新增變數儲存
        setFilterSearchVal(val);
        console.log('val', val);
        // const submitVal = val.split(' ')[0];
        setSearchWords(val);
    });

    const searchResetHandler = useCallback(confirm => {
        confirm();
        if (searchColumns.indexOf('StockID') !== -1) {
            setSearchColumns(columns => {
                const index = searchColumns.indexOf('StockID');
                columns.splice(index, 1);
                return columns;
            });
            setSearchWords('');
            setFilterSearchVal('');
        }
    });

    const delHandler = useCallback((record, data) => {
        dispatch(
            setModal({
                visible: true,
                title: '刪除確認',
                content: `確認刪除此筆資料嗎？`,
                onOk: () => {
                    const newData = data.filter(item => {
                        if (item.key !== record.key) {
                            return true;
                        } else {
                            return false;
                        }
                    });
                    console.log('newData', newData);
                    dispatch(setOrderList(newData));
                    dispatch(
                        setModal({
                            visible: false,
                        }),
                    );
                },
            }),
        );
    });

    const changeBS = useCallback((record, data, val) => {
        const newData = data.map(item => {
            if (item.key === record.key) {
                item.BS = val;
            }
            return item;
        });
        dispatch(setOrderList(newData));
    });

    const changeQty = useCallback((record, data, val) => {
        const newData = data.map(item => {
            if (item.key === record.key) {
                item.Qty = val;
            }
            return item;
        });
        dispatch(setOrderList(newData));
    });

    const changePrice = useCallback((record, data, val) => {
        const newData = data.map(item => {
            if (item.key === record.key) {
                item.Price = val;
            }
            return item;
        });
        dispatch(setOrderList(newData));
    });

    const changeAON = useCallback((record, data, val) => {
        const newData = data.map(item => {
            if (item.key === record.key) {
                item.aon = val;
            }
            return item;
        });
        dispatch(setOrderList(newData));
    });

    const gtcCheck = useCallback((record, data, e) => {
        if (e.target.checked) {
            var newData = data.map(item => {
                if (item.key === record.key) {
                    item.gtcCheck = e.target.checked;
                    item.GTCDate = record.GTCDate || moment().add(6, 'months').format('YYYY-MM-DD');
                }
                return item;
            });
        } else {
            var newData = data.map(item => {
                if (item.key === record.key) {
                    if (item.GTCDate != null) {
                        item.gtcCheck = e.target.checked;
                        delete item.GTCDate;
                    }
                }
                return item;
            });
        }
        dispatch(setOrderList(newData));
    });

    const gtcChange = useCallback((record, data, e) => {
        const newData = data.map(item => {
            if (item.key === record.key) {
                item.GTCDate = e.target.value;
            }
            return item;
        });
        dispatch(setOrderList(newData));
    });

    const keepCheck = useCallback((record, data, e) => {
        const newData = data.map(item => {
            if (item.key === record.key) {
                item.isKeep = e.target.checked;
            }
            return item;
        });
        dispatch(setOrderList(newData));
    });

    const changeSelectedHandler = useCallback((selectedRowKeys, selectedRows) => {
        console.log('sssss', selectedRowKeys, selectedRows);
        setSelectedRowKeys(selectedRowKeys);
        if (selectItemHandler != null) {
            selectItemHandler(selectedRows);
        }
    });

    const updatePriceHandler = async () => {
        const stockList = data.map(item => {
            return {
                symbol: item.StockID,
                exchange: item.Exchid,
            };
        });
        try {
            setLoading(true);
            const quoteData = await postQuerySubBrokerageQuote(stockList);
            setLoading(false);
            if (quoteData) {
                setData(updateDate(quoteData));
            }
        } catch (error) {
            dispatch(
                setModal({
                    visible: true,
                    content: error,
                    type: 'info',
                    title: '系統訊息',
                }),
            );
        }
    };

    const updateDate = quoteData => {
        const newData = [];
        Object.keys(quoteData).forEach(key => {
            newData.push(quoteData[key]);
            const symbol = key.substring(0, key.lastIndexOf('.'));
            quoteData[key].StockID = symbol;
            quoteData[key].Price = parseFloat(quoteData[key].refPrice) || parseFloat(quoteData[key].preClose);
        });
        const updData = data.map((item, i) => {
            item.Price = newData[i].Price;
            return item;
        });
        return updData;
    };

    return (
        <div className="batch__table">
            <AccountTable
                scroll={{ x: 780, y: 600 }}
                filterColumns={searchColumns}
                columns={columns}
                dataSource={data}
                pagination={false}
                rowSelection={{
                    type: 'checkbox',
                    // getCheckboxProps,
                    onChange: changeSelectedHandler,
                    selectedRowKeys,
                }}
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
                            {(loading === true || parentLoading === true) && '資料加載中...'}
                        </div>
                    ),
                    spinning: loading || parentLoading,
                }}
            />
            <style global jsx>{`
                .batch__table .ant-table-tbody > tr > td:last-child {
                    padding-right: 0 !important;
                }
            `}</style>
        </div>
    );
};

export default BatchTable;
