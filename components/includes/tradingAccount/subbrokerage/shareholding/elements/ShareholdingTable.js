import { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Input, Select, Switch, message } from 'antd';
import moment from 'moment';
import useSWR, { cache } from 'swr';
import AccountTable from '../../../vipInventory/AccountTable';
import { postInventoryWithSwr, postInventory } from '../../../../../../services/components/goOrder/sb/postInventory';
import { getToken } from '../../../../../../services/user/accessToken';
import { postQuerySubBrokerageQuoteWithSwr } from '../../../../../../services/components/tradingAccount/subBrokerage/postQuerySubBrokerageQuote';
import { marketName } from '../../../../../../services/components/goOrder/sb/dataMapping';
import DropfilterCheckBox from '../../../vipInventory/DropfilterCheckBox';
import { submitService } from '../../../../../../services/components/goOrder/sb/submitService';
import { usePlatform } from '../../../../../../hooks/usePlatform';
import { getWebId } from '../../../../../../services/components/goOrder/getWebId';
import { setModal } from '../../../../../../store/components/layouts/action';
// import DateSelectBox from '../../../../goOrder/SB/sbPanel/DateSelectBox';

const { Option } = Select;
const ShareholdingTable = ({ showSellBtn, controlReload, submitSuccess, parentSelectedRowKeys, submitListLoading }) => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [stockList, setStockList] = useState([]);
    const [error, setError] = useState('');
    const [searchColumns, setSearchColumns] = useState([]);
    const [marketFilterValue, setMarketFilterValue] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const platform = usePlatform();
    const dispatch = useDispatch();

    useEffect(() => {
        if (controlReload != 0) {
            cache.clear();
        }
    }, [controlReload]);

    useEffect(() => {
        setSelectedRowKeys(parentSelectedRowKeys);
    }, [parentSelectedRowKeys]);

    useEffect(() => {
        setLoading(submitListLoading);
    }, [submitListLoading]);

    const postData = useMemo(() => {
        if (currentAccount.account != null) {
            const postData = {
                AID: currentAccount.broker_id + currentAccount.account,
                token: getToken(),
            };
            return postData;
        } else {
            return {};
        }
    }, [currentAccount]);

    const { data: fetchData } = useSWR([JSON.stringify(postData), controlReload], postInventoryWithSwr, {
        onError: (error, key) => {
            Modal.error({
                title: error,
            });
        },
        errorRetryCount: 3,
        focusThrottleInterval: 10000,
        errorRetryInterval: 10000,
        revalidateOnFocus: false,
    });

    // const { data: fetchData } = useSWR(() => {
    //     if(postData.AID != null){
    //         return JSON.stringify(postData);
    //     }else{
    //         return null;
    //     }
    // }, postInventoryWithSwr, {
    //     onError: (error, key) => {
    //         Modal.error({
    //             title: error,
    //         });
    //     },
    //     errorRetryCount: 3,
    //     focusThrottleInterval: 10000,
    //     errorRetryInterval: 10000,
    //     revalidateOnFocus: false,
    // });

    const { data: quoteData } = useSWR([JSON.stringify(stockList), controlReload], postQuerySubBrokerageQuoteWithSwr, {
        onError: (error, key) => {
            Modal.error({
                title: error,
            });
            setError('伺服器錯誤');
        },
        errorRetryCount: 3,
        focusThrottleInterval: 10000,
        errorRetryInterval: 10000,
        revalidateOnFocus: false,
    });

    useEffect(() => {
        if (Array.isArray(fetchData)) {
            if (fetchData?.length == 0) {
                setStockList([]);
                return;
            }
            setError('');
            const newStockList = [];
            for (const obj of fetchData) {
                const symbol = obj.StockID.substring(0, obj.StockID.lastIndexOf('.'));
                const exchange = obj.StockID.split('.').slice(-1).pop();
                newStockList.push({
                    exchange,
                    symbol,
                });
            }
            setStockList(newStockList);
        }
    }, [fetchData]);

    useEffect(() => {
        const newData = [];
        if (quoteData && fetchData) {
            console.log(quoteData, Object.keys(quoteData));
            Object.keys(quoteData).forEach(key => {
                newData.push(quoteData[key]);
                const symbol = key.substring(0, key.lastIndexOf('.'));
                quoteData[key].StockID = symbol;
                // quoteData[key].UseQty =
            });
            if (newData?.length > 0) {
                newData.map((item, index) => {
                    if (fetchData[index] != null) {
                        item.useQty = fetchData[index]?.UseQty;
                        item.zIndex = 0;
                        item.price = parseFloat(item.refPrice) || parseFloat(item.preClose);
                        item.qty = item.useQty;
                        item.aon = 'ANY';
                        item.useGtc = false;
                        item.gtcDate = moment().add(6, 'months').format('YYYY-MM-DD');
                        item.key = index;
                    }
                });
            }
        }
        console.log('newData', newData);
        setData(newData);
    }, [quoteData, fetchData]);

    useEffect(() => {
        console.log('rerander...');
        const newColumns = [
            {
                title: '動作',
                dataIndex: 'active',
                key: 'active',
                width: 100,
                align: 'center',
                render: (text, record) => {
                    return (
                        <div>
                            <Button onClick={confirmHandler.bind(null, record)}>賣出</Button>
                        </div>
                    );
                },
            },
            {
                title: '市場別',
                dataIndex: 'exch',
                key: 'exch',
                ...getColumnSearchProps('exch'),
                width: 100,
                render: (text, record) => {
                    const market = marketName(text).name;
                    return <div>{market}</div>;
                },
            },
            {
                title: '股票名稱',
                dataIndex: 'StockID',
                key: 'StockID',
                width: 100,
                render: (text, record) => {
                    return <div>{text}</div>;
                },
            },
            {
                title: '可用庫存',
                dataIndex: 'useQty',
                key: 'useQty',
                align: 'center',
                width: 80,
                render: (text, record) => {
                    return <div>{text}</div>;
                },
            },
            {
                title: '委託股數',
                dataIndex: 'qty',
                key: 'qty',
                width: 100,
                render: (text, record) => {
                    return (
                        <Input
                            defaultValue={record.useQty}
                            value={record.qty === 0 ? record.useQty : record.qty}
                            onChange={qtyChangeHandler.bind(null, record, data)}
                        />
                    );
                },
            },
            {
                title: '價格',
                dataIndex: 'price',
                key: 'price',
                width: 100,
                render: (text, record) => {
                    return (
                        <Input
                            onChange={priceChangeHandler.bind(null, record, data)}
                            defaultValue={parseFloat(record.refPrice) || parseFloat(record.preClose)}
                            value={
                                record.price === 0
                                    ? parseFloat(record.refPrice) || parseFloat(record.preClose)
                                    : record.price
                            }
                        />
                    );
                },
            },
            {
                title: '類別',
                dataIndex: 'aon',
                key: 'aon',
                width: 100,
                render: (text, record) => {
                    return record.exch === 'US' ? (
                        <Select
                            defaultValue="ANY"
                            onChange={aonChangeHandler.bind(null, record, data)}
                            value={record.aon === '' ? 'ANY' : record.aon}
                        >
                            <Option value="ANY">ANY</Option>
                            <Option value="AON">AON</Option>
                        </Select>
                    ) : null;
                },
            },
            {
                title: '長效單',
                dataIndex: 'gtcDate',
                key: 'gtcDate',
                width: 190,
                render: (text, record) => {
                    // console.log('....record', record.zIndex);
                    return record.exch === 'US' ? (
                        <div>
                            <Switch
                                size="small"
                                style={{ marginRight: '4px' }}
                                onChange={gtcChangeHandler.bind(null, record, data)}
                                value={record?.useGtc}
                            />
                            <Input
                                type="date"
                                style={{
                                    border: '1px solid #d9d9d9',
                                    height: '33px',
                                    paddingLeft: '8px',
                                    width: '150px',
                                }}
                                value={record?.gtcDate || moment().add(6, 'months').format('YYYY-MM-DD')}
                                max={moment().add(6, 'months').format('YYYY-MM-DD')}
                                onChange={dateChangeHandler.bind(null, record, data)}
                            />

                            {/* <DateSelectBox 
                            style={{
                                width: '150px',
                                position: record.zIndex == 0 ? 'static' : 'fixed',
                                zIndex: record.zIndex,
                            }}
                            onChange={dateChangeHandler}
                            width={'150px'}
                            onCalendarOpen={handleCalendarOpen.bind(null, record, data, 'open')}
                            onCalendarClose={handleCalendarOpen.bind(null, record, data, 'close')}
                        /> */}
                        </div>
                    ) : null;
                },
            },
            {
                title: '幣別',
                dataIndex: 'chCurrency',
                key: 'chCurrency',
                width: 80,
                render: (text, record) => {
                    return <div>{text}</div>;
                },
            },
        ];
        setColumns(newColumns);
    }, [data, searchColumns, marketFilterValue]);

    const getColumnSearchProps = dataIndex => {
        if (dataIndex === 'exch') {
            return {
                filterDropdown: ({ confirm }) => (
                    <DropfilterCheckBox
                        type={'radio'}
                        onSubmit={onMarketFilterSubmit.bind(null, confirm)}
                        onReset={onMarketFilterReset.bind(null, confirm)}
                        // value={searchStatus}
                        data={[
                            { text: '全部', value: 'ALL' },
                            { text: '香港', value: '香港' },
                            { text: '美國', value: '美國' },
                            { text: '滬股通', value: '滬股通' },
                            { text: '深股通', value: '深股通' },
                            { text: '日本', value: '日本' },
                        ]}
                    />
                ),
                filteredValue: [marketFilterValue] || null,
                onFilter: (value, record) => {
                    const market = marketName(record.exch).name;
                    if (value === 'ALL' || value === '') {
                        return true;
                    } else {
                        return market === value;
                    }
                },
            };
        }
    };

    const onMarketFilterSubmit = useCallback((confirm, val) => {
        confirm();
        setSearchColumns(columns => {
            if (!columns.includes('exch')) {
                columns.push('exch');
            }
            return columns;
        });
        setMarketFilterValue(val[0]);
    });

    const onMarketFilterReset = useCallback((confirm, val) => {
        confirm();
        if (searchColumns.indexOf('exch') !== -1) {
            setSearchColumns(columns => {
                const index = searchColumns.indexOf('exch');
                columns.splice(index, 1);
                return columns;
            });
            setMarketFilterValue('');
        }
    });

    const dateChangeHandler = (record, data, e) => {
        const newData = data.map(item => {
            if (item.key === record.key) {
                item.gtcDate = e.target.value;
            }
            return item;
        });
        setData(newData);
    };

    const gtcChangeHandler = (record, data, value) => {
        const newData = data.map(item => {
            if (item.key === record.key) {
                item.useGtc = value;
            }
            return item;
        });
        console.log('newData..', newData);
        setData(newData);
    };

    const changeSelectedHandler = useCallback((selectedRowKeys, selectedRows) => {
        setSelectedRowKeys(selectedRowKeys);
        if (showSellBtn != null) {
            showSellBtn(selectedRows);
        }
    });

    const qtyChangeHandler = (record, data, e) => {
        const newData = data.map(item => {
            if (item.key === record.key) {
                item.qty = e.target.value;
            }
            return item;
        });
        setData(newData);
    };

    const priceChangeHandler = (record, data, e) => {
        const newData = data.map(item => {
            if (item.key === record.key) {
                item.price = e.target.value;
            }
            return item;
        });
        setData(newData);
    };

    const aonChangeHandler = (record, data, value) => {
        const newData = data.map(item => {
            if (item.key === record.key) {
                item.aon = value;
            }
            return item;
        });
        setData(newData);
    };

    // const getCheckboxProps = useCallback(
    //     record => {
    //         return { disabled: record.CanCancel !== 'Y' && record.CanModify !== 'Y' };
    //     },
    //     [data],
    // );
    // const handleCalendarOpen = (record, data, type) => {
    //     const newData = data.map((item) => {
    //         if(type === 'open'){
    //             if(item.key === record.key){
    //                 item.zIndex = 1;
    //             }
    //         }else{
    //             item.zIndex = 0
    //         }
    //         return item;
    //     })
    //     setData(newData);
    // }
    const loadingHandler = (fetchData, quoteData) => {
        if (loading) return true;
        if (fetchData?.length == 0 && quoteData == null) {
            return false;
        }
        if ((fetchData == null || quoteData == null) && !error) {
            return true;
        } else {
            return false;
        }
    };

    const confirmHandler = record => {
        dispatch(
            setModal({
                title: '委託確認',
                content: `確認送出此筆委託嗎？`,
                visible: true,
                type: 'confirm',
                onOk: () => {
                    setLoading(true);
                    dispatch(setModal({ visible: false }));
                    submitHandler(record);
                },
            }),
        );
    };

    const submitHandler = async record => {
        try {
            const obj = {
                CID: getWebId(platform, 'recommisiioned'),
                StockID: record.StockID,
                Price: record.price,
                Qty: record.qty,
                BS: 'S',
                GTCDate: record.useGtc ? record.gtcDate : '',
                aon: record.aon,
                Exchid: record.exch,
                Creator: currentAccount.idno,
                token: getToken(),
                currentAccount,
            };
            console.log('obj----------', obj);
            const res = await submitService(obj);
            setLoading(false);
            submitSuccess();
            message.success({
                content: '委託已送出',
            });
        } catch (error) {
            setLoading(false);
            message.info({
                content: typeof error === 'string' ? error : '伺服器錯誤',
            });
        }
    };

    return (
        <div>
            <AccountTable
                filterColumns={searchColumns}
                scroll={{ x: 780, y: 600 }}
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
                            {loading === true ? '資料送出中...' : '資料加載中...'}
                        </div>
                    ),
                    spinning: loadingHandler.call(null, fetchData, quoteData),
                }}
            />
            <style jsx global>{`
                // .ant-table-cell .date__container .react-datepicker__input-container input {
                //     font-size: 14px;
                //     font-weight: normal;
                //     height: 33px;
                // }
                // .ant-table-cell .date__container .icon {
                //     top: 4px;
                // }
            `}</style>
        </div>
    );
};

export default ShareholdingTable;
