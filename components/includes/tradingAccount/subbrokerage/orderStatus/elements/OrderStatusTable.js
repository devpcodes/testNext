import { useEffect, useMemo, useState, useCallback } from 'react';
import { Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import useSWR from 'swr';
import moment from 'moment';
import { postQuickSearchWithSwr } from '../../../../../../services/components/goOrder/sb/postQuickSearch';
import { getToken } from '../../../../../../services/user/accessToken';
import AccountTable from '../../../vipInventory/AccountTable';
import {
    currencyChName,
    getPriceType,
    goOrderMapping,
    marketName,
} from '../../../../../../services/components/goOrder/sb/dataMapping';
import { postSbcoCode, postSbcoCodeWithSwr } from '../../../../../../services/components/goOrder/sb/postSbcoCode';
import { themeColor } from '../../../../goOrder_SB/panel/PanelTabs';
import { formatNum } from '../../../../../../services/formatNum';
import { useCheckMobile } from '../../../../../../hooks/useCheckMobile';
import { timeFormatter } from '../../../../../../services/timeFormatter';
import ControlBtns from './ControlBtns';
import DropfilterCheckBox from '../../../vipInventory/DropfilterCheckBox';
const OrderStatusTable = ({ touchPriceFilterValue, controlReload }) => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [symbolList, setSymbolList] = useState([]);
    const isMobile = useCheckMobile();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [searchColumns, setSearchColumns] = useState([]);
    const [marketFilterValue, setMarketFilterValue] = useState('');
    const [stateMsgFilterValue, setStateMsgFilterValue] = useState('');
    // useEffect(() => {
    //     reload.current += 1;
    // }, [])
    const postData = useMemo(() => {
        if (currentAccount.account != null) {
            const postData = {
                AID: currentAccount.broker_id + currentAccount.account,
                orderID: '',
                sort: '-1',
                stockID: '',
                token: getToken(),
            };
            return postData;
        } else {
            return {};
        }
    }, [currentAccount]);

    const { data: fetchData } = useSWR([JSON.stringify(postData)], postQuickSearchWithSwr, {
        onError: (error, key) => {
            Modal.error({
                title: error,
            });
            setError('伺服器錯誤');
        },
        errorRetryCount: 3,
        focusThrottleInterval: 10000,
        errorRetryInterval: 10000,
    });

    const { data: nameData } = useSWR([JSON.stringify(symbolList)], postSbcoCodeWithSwr, {
        onError: (error, key) => {
            Modal.error({
                title: error,
            });
            setError('伺服器錯誤');
        },
        errorRetryCount: 3,
        focusThrottleInterval: 10000,
        errorRetryInterval: 10000,
    });

    useEffect(() => {
        if (Array.isArray(fetchData)) {
            setError('');
            const newSymbolList = [];
            const newData = fetchData.map((item, index) => {
                item.key = index;
                const symbol = item.StockID.substring(0, item.StockID.lastIndexOf('.'));
                const marketID = item.StockID.split('.').slice(-1).pop();
                item.name = symbol;
                newSymbolList.push({ exchange: marketID, code: symbol });
                setSymbolList(newSymbolList);
                return item;
            });
            // setData(newData);
        }
    }, [fetchData]);

    useEffect(() => {
        if (nameData?.length > 0) {
            let newData = fetchData?.map(item => {
                const symbol = item.StockID.substring(0, item.StockID.lastIndexOf('.'));
                item.name = symbol;
                for (let index = 0; index < nameData.length; index++) {
                    const element = nameData[index];
                    if (element.code === symbol) {
                        item.name = element.name || symbol;
                        break;
                    }
                }
                return item;
            });
            setData(newData);
        }
    }, [nameData, fetchData]);

    useEffect(() => {
        const newColumns = [
            {
                title: '動作',
                dataIndex: 'active',
                key: 'active',
                fixed: !isMobile ? 'left' : 'auto',
                width: 100,
                render: (text, record) => {
                    return (
                        <>
                            <ControlBtns BS={record.BS} CanModify={record.CanModify} CanCancel={record.CanCancel} />
                        </>
                    );
                },
            },
            {
                title: '狀態',
                dataIndex: 'StateMsg',
                key: 'StateMsg',
                fixed: !isMobile ? 'left' : 'auto',
                width: 100,
                ...getColumnSearchProps('StateMsg'),
                render: (text, record) => {
                    return <>{text}</>;
                },
            },
            {
                title: '市場',
                dataIndex: 'market',
                key: 'market',
                fixed: !isMobile ? 'left' : 'auto',
                width: 100,
                ...getColumnSearchProps('market'),
                render: (text, record) => {
                    const marketID = record.StockID.split('.').slice(-1).pop();
                    const market = marketName(marketID).name;
                    return <>{market}</>;
                },
            },
            {
                title: '代碼',
                dataIndex: 'StockID',
                key: 'StockID',
                fixed: !isMobile ? 'left' : 'auto',
                width: 100,
                render: (text, record) => {
                    const symbol = text.substring(0, text.lastIndexOf('.'));
                    return <>{symbol}</>;
                },
            },
            {
                title: '商品',
                dataIndex: 'name',
                key: 'name',
                width: 200,
                render: (text, record) => {
                    return <span style={{ whiteSpace: 'pre-wrap' }}>{text}</span>;
                },
            },
            {
                title: '買賣',
                dataIndex: 'BS',
                key: 'BS',
                width: 100,
                render: (text, record) => {
                    return (
                        <span
                            style={{
                                color: text === 'B' ? '#f45a4c' : '#22a16f',
                                opacity: record.status_code == 4 ? 0.45 : 1,
                            }}
                        >
                            {text === 'B' ? '買' : '賣'}
                        </span>
                    );
                },
            },
            {
                title: '類別',
                dataIndex: 'PriceType',
                key: 'PriceType',
                width: 100,
                render: (text, record) => {
                    const priceType = getPriceType(record.PriceType);
                    const icons = goOrderMapping(priceType, record.GTCDate);
                    const marketID = record.StockID.split('.').slice(-1).pop();
                    return (
                        <span>
                            {marketID === 'US' && (
                                <>
                                    {icons.map((icon, index) => {
                                        return icon !== 'AON' && icon !== 'ANY' ? (
                                            <p
                                                key={index}
                                                className="item--down2"
                                                style={{
                                                    display: 'inline-block',
                                                    fontSize: '1rem',
                                                    background:
                                                        icon === '長'
                                                            ? '#6c7b94'
                                                            : record.BS === 'B'
                                                            ? themeColor.buyTabColor
                                                            : themeColor.sellTabColor,
                                                    color: 'white',
                                                    padding: '0 3px',
                                                    borderRadius: '2px',
                                                    marginRight: '4px',
                                                    marginBottom: 0,
                                                }}
                                            >
                                                {icon}
                                            </p>
                                        ) : (
                                            <p
                                                key={'B' + index}
                                                className="item--down2"
                                                style={{
                                                    display: 'inline-block',
                                                    marginBottom: 0,
                                                }}
                                            >
                                                {icon}
                                            </p>
                                        );
                                    })}
                                </>
                            )}
                        </span>
                    );
                },
            },
            {
                title: '價格',
                dataIndex: 'Price',
                key: 'Price',
                align: 'right',
                width: 100,
                render: (text, record) => {
                    return <span>{!isNaN(text) ? formatNum(parseFloat(text)) : 0}</span>;
                },
            },
            {
                title: '數量',
                dataIndex: 'Qoriginal',
                key: 'Qoriginal',
                align: 'right',
                width: 100,
                render: (text, record) => {
                    return <span>{text}</span>;
                },
            },
            {
                title: '取消',
                dataIndex: 'cancel',
                key: 'cancel',
                align: 'right',
                width: 100,
                render: (text, record) => {
                    let cancel;
                    if (record.hasOwnProperty('Qcurrent') && record['Qmatched'] != null && !isNaN(record['Qmatched'])) {
                        record.cancel = parseFloat((record.Qoriginal - parseFloat(record['Qnext'])).toPrecision(12));
                        cancel = parseFloat((record.Qoriginal - parseFloat(record['Qnext'])).toPrecision(12));
                    }
                    return <span>{cancel}</span>;
                },
            },
            {
                title: '成交量',
                dataIndex: 'Qmatched',
                key: 'Qmatched',
                align: 'right',
                width: 100,
                render: (text, record) => {
                    return <span>{parseFloat(text) || '--'}</span>;
                },
            },
            {
                title: '成交均價',
                dataIndex: 'AvgPrice',
                key: 'AvgPrice',
                align: 'right',
                width: 100,
                render: (text, record) => {
                    return <span>{parseFloat(text) || '--'}</span>;
                },
            },
            {
                title: '委託書號',
                dataIndex: 'OrderNo',
                key: 'OrderNo',
                width: 100,
                align: 'center',
                render: (text, record) => {
                    return <span>{text || '--'}</span>;
                },
            },
            {
                title: '觸發價格',
                dataIndex: 'TouchedPrice',
                key: 'TouchedPrice',
                ...getColumnSearchProps('TouchedPrice'),
                align: 'center',
                width: 100,
                render: (text, record) => {
                    return <span>{getTouchPrice(record)}</span>;
                },
            },
            {
                title: '來源',
                dataIndex: 'Source',
                key: 'Source',
                align: 'center',
                width: 100,
                render: (text, record) => {
                    return <span>{text || '--'}</span>;
                },
            },
            {
                title: '委託時間',
                dataIndex: 'CreateTime',
                key: 'CreateTime',
                align: 'center',
                width: 100,
                render: (text, record) => {
                    const time = getTimerHandler(record);
                    const timeArr = time.split(' ');
                    return (
                        <div>
                            <p style={{ marginBottom: 0 }}>{timeArr[0]}</p>
                            <p style={{ marginBottom: 0 }}>{timeArr[1]}</p>
                        </div>
                    );
                },
            },
            {
                title: '原因',
                dataIndex: 'CodeMsg',
                key: 'CodeMsg',
                align: 'center',
                width: 150,
                render: (text, record) => {
                    return <span>{text}</span>;
                },
            },
            {
                title: '幣別',
                dataIndex: 'Currency',
                key: 'Currency',
                align: 'center',
                width: 150,
                render: (text, record) => {
                    return <span>{currencyChName(text)}</span>;
                },
            },
        ];
        setColumns(newColumns);
    }, [data, isMobile, searchColumns, marketFilterValue, stateMsgFilterValue, touchPriceFilterValue]);

    const getColumnSearchProps = dataIndex => {
        if (dataIndex === 'market') {
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
                    // console.log('record.........',value, record);
                    const marketID = record.StockID.split('.').slice(-1).pop();
                    const market = marketName(marketID).name;
                    if (value === 'ALL' || value === '') {
                        return true;
                    } else {
                        return market === value;
                    }
                },
            };
        }
        if (dataIndex === 'StateMsg') {
            return {
                filterDropdown: ({ confirm }) => (
                    <DropfilterCheckBox
                        type={'radio'}
                        onSubmit={onStateFilterSubmit.bind(null, confirm)}
                        onReset={onStateFilterReset.bind(null, confirm)}
                        // value={searchStatus}
                        data={[
                            { text: '全部', value: 'ALL' },
                            { text: '未完全成交', value: '未完全成交' },
                            { text: '委託傳送中', value: '委託傳送中' },
                        ]}
                    />
                ),
                filteredValue: [stateMsgFilterValue] || null,
                onFilter: (value, record) => {
                    // console.log('record.........',value, record);
                    if (value === 'ALL' || value === '') {
                        return true;
                    } else {
                        return record.StateMsg.includes(value);
                    }
                },
            };
        }

        if (dataIndex === 'TouchedPrice') {
            return {
                filteredValue: [touchPriceFilterValue] || null,
                onFilter: (value, record) => {
                    if (!value) {
                        return true;
                    } else {
                        return parseFloat(record.TouchedPrice) != 0 ? true : false;
                    }
                },
            };
        }
    };

    const getTouchPrice = info => {
        const marketID = info.StockID.split('.').slice(-1).pop();
        if (info.hasOwnProperty('TouchedPrice')) {
            if (info.hasOwnProperty('PriceType') && marketID == 'US') {
                if (info['PriceType'] == '60' || info['PriceType'] == '66') {
                    if (info['BS'] === 'B') {
                        return '≥' + parseFloat(info['TouchedPrice']);
                    } else if (info['BS'] === 'S') {
                        return '≤' + parseFloat(info['TouchedPrice']);
                    }
                }
            }
        }
    };

    const getTimerHandler = info => {
        const timeArr = info.CreateTime.split(' ');
        const d = moment(timeArr[0]).format('YYYY/MM/DD');
        const timeStr = timeFormatter(timeArr[1], false);
        return d + ' ' + timeStr;
    };

    const getCheckboxProps = useCallback(
        record => {
            return { disabled: record.CanCancel !== 'Y' && record.CanModify !== 'Y' };
        },
        [data],
    );

    const changeSelectedHandler = useCallback((selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys, selectedRows);
        setSelectedRowKeys(selectedRowKeys);
    });

    const onMarketFilterSubmit = useCallback((confirm, val) => {
        confirm();
        setSearchColumns(columns => {
            if (!columns.includes('market')) {
                columns.push('market');
            }
            return columns;
        });
        setMarketFilterValue(val[0]);
    });

    const onMarketFilterReset = useCallback((confirm, val) => {
        confirm();
        if (searchColumns.indexOf('market') !== -1) {
            setSearchColumns(columns => {
                const index = searchColumns.indexOf('market');
                columns.splice(index, 1);
                return columns;
            });
            setMarketFilterValue('');
        }
    });

    const onStateFilterSubmit = useCallback((confirm, val) => {
        confirm();
        setSearchColumns(columns => {
            if (!columns.includes('StateMsg')) {
                columns.push('StateMsg');
            }
            return columns;
        });
        setStateMsgFilterValue(val[0]);
    });

    const onStateFilterReset = useCallback((confirm, val) => {
        confirm();
        if (searchColumns.indexOf('StateMsg') !== -1) {
            setSearchColumns(columns => {
                const index = searchColumns.indexOf('StateMsg');
                columns.splice(index, 1);
                return columns;
            });
            setStateMsgFilterValue('');
        }
    });

    console.log('searchColumns', searchColumns);
    return (
        <div>
            <AccountTable
                filterColumns={searchColumns}
                scroll={{ x: 780 }}
                dataSource={data}
                pagination={false}
                columns={columns}
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
                sticky={true}
                rowSelection={{
                    type: 'checkbox',
                    getCheckboxProps,
                    onChange: changeSelectedHandler,
                    selectedRowKeys,
                }}
            />
        </div>
    );
};

export default OrderStatusTable;
