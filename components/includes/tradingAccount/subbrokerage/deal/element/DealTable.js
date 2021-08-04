import { useState, useMemo, useEffect, useCallback } from 'react';
import { BigNumber } from 'bignumber.js';
import { useSelector } from 'react-redux';
import { Modal } from 'antd';
import useSWR from 'swr';
import { postMatchWithSwr } from '../../../../../../services/components/tradingAccount/subBrokerage/postMatch';
import { getToken } from '../../../../../../services/user/accessToken';
import AccountTable from '../../../vipInventory/AccountTable';
import {
    currencyChName,
    getPriceType,
    goOrderMapping,
    marketName,
} from '../../../../../../services/components/goOrder/sb/dataMapping';
import { postSbcoCodeWithSwr } from '../../../../../../services/components/goOrder/sb/postSbcoCode';
import { themeColor } from '../../../../goOrder_SB/panel/PanelTabs';
import { formatNum } from '../../../../../../services/formatNum';
import { timeFormatter } from '../../../../../../services/timeFormatter';
import DropfilterCheckBox from '../../../vipInventory/DropfilterCheckBox';
import DropFilterSearch from '../../../vipInventory/DropFilterSearch';

const DealTable = ({ type }) => {
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [error, setError] = useState([]);
    const [symbolList, setSymbolList] = useState([]);
    const currentAccount = useSelector(store => store.user.currentAccount);
    // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [searchColumns, setSearchColumns] = useState([]);
    const [marketFilterValue, setMarketFilterValue] = useState('');
    const [filterSearchVal, setFilterSearchVal] = useState('');
    const [searchWords, setSearchWords] = useState('');
    const postData = useMemo(() => {
        if (currentAccount.account != null) {
            const postData = {
                AID: currentAccount.broker_id + currentAccount.account,
                orderID: '',
                orderNo: '',
                sort: '2',
                token: getToken(),
            };
            return postData;
        } else {
            return null;
        }
    }, [currentAccount]);

    const { data: fetchData } = useSWR([JSON.stringify(postData)], postMatchWithSwr, {
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
                title: '市場',
                dataIndex: 'market',
                key: 'market',
                align: 'left',
                width: 100,
                ...getColumnSearchProps('market'),
                render: (text, record) => {
                    const marketID = record.StockID.split('.').slice(-1).pop();
                    const market = marketName(marketID).name;
                    return <div style={{ opacity: record.State === '99' ? 0.45 : 1 }}>{market}</div>;
                },
            },
            {
                title: '代碼',
                dataIndex: 'StockID',
                key: 'StockID',
                align: 'center',
                width: 100,
                render: (text, record) => {
                    const symbol = text.substring(0, text.lastIndexOf('.'));
                    return <div style={{ opacity: record.State === '99' ? 0.45 : 1 }}>{symbol}</div>;
                },
            },
            {
                title: '商品',
                dataIndex: 'name',
                key: 'name',
                width: 200,
                ...getColumnSearchProps('name'),
                render: (text, record) => {
                    return (
                        <span style={{ whiteSpace: 'pre-wrap', opacity: record.State === '99' ? 0.45 : 1 }}>
                            {text}
                        </span>
                    );
                },
            },
            {
                title: '買賣',
                dataIndex: 'BS',
                key: 'BS',
                width: 100,
                align: 'center',
                render: (text, record) => {
                    return (
                        <span
                            style={{
                                color: text === 'B' ? '#f45a4c' : '#22a16f',
                                opacity: record.State === '99' ? 0.45 : 1,
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
                        <span style={{ opacity: record.State === '99' ? 0.45 : 1 }}>
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
                title: '成交量',
                dataIndex: 'Qmatched',
                key: 'Qmatched',
                align: 'right',
                width: 100,
                render: (text, record) => {
                    return (
                        <span style={{ opacity: record.State === '99' ? 0.45 : 1 }}>{parseFloat(text) || '--'}</span>
                    );
                },
            },
            {
                title: '成交價',
                dataIndex: 'Price',
                key: 'Price',
                align: 'right',
                width: 100,
                render: (text, record) => {
                    return (
                        <span style={{ opacity: record.State === '99' ? 0.45 : 1 }}>
                            {!isNaN(text) ? formatNum(parseFloat(text)) : 0}
                        </span>
                    );
                },
            },
            {
                title: '成交價金',
                dataIndex: 'Price',
                key: 'Price',
                align: 'right',
                width: 100,
                render: (text, record) => {
                    let amont = new BigNumber(record.Qmatched).multipliedBy(new BigNumber(record.Price));
                    // detailTrData.dealGoal = goOrder.utility.digitsFormat(amont.toString());
                    return (
                        <span style={{ opacity: record.State === '99' ? 0.45 : 1 }}>
                            {!isNaN(text) ? formatNum(parseFloat(amont)) : 0}
                        </span>
                    );
                },
            },
            {
                title: '概算手續費',
                dataIndex: 'Fee',
                key: 'Fee',
                align: 'right',
                width: 100,
                render: (text, record) => {
                    return <span style={{ opacity: record.State === '99' ? 0.45 : 1 }}>{text}</span>;
                },
            },
            {
                title: '委託書號',
                dataIndex: 'OrderNo',
                key: 'OrderNo',
                width: 100,
                align: 'center',
                render: (text, record) => {
                    return <span style={{ opacity: record.State === '99' ? 0.45 : 1 }}>{text || '--'}</span>;
                },
            },
            {
                title: '成交時間',
                dataIndex: 'MatchTime',
                key: 'MatchTime',
                width: 100,
                align: 'center',
                render: (text, record) => {
                    const timeStr = timeFormatter(text, false);
                    return <span style={{ opacity: record.State === '99' ? 0.45 : 1 }}>{timeStr || '--'}</span>;
                },
            },
            {
                title: '幣別',
                dataIndex: 'Currency',
                key: 'Currency',
                align: 'center',
                width: 80,
                render: (text, record) => {
                    return <span style={{ opacity: record.State === '99' ? 0.45 : 1 }}>{currencyChName(text)}</span>;
                },
            },
        ];

        const newColumns2 = [
            {
                title: '市場',
                dataIndex: 'market',
                key: 'market',
                align: 'left',
                width: 100,
                ...getColumnSearchProps('market'),
                render: (text, record) => {
                    const marketID = record.StockID.split('.').slice(-1).pop();
                    const market = marketName(marketID).name;
                    return <div style={{ opacity: record.State === '99' ? 0.45 : 1 }}>{market}</div>;
                },
            },
            {
                title: '代碼',
                dataIndex: 'StockID',
                key: 'StockID',
                align: 'center',
                width: 100,
                render: (text, record) => {
                    const symbol = text.substring(0, text.lastIndexOf('.'));
                    return <div style={{ opacity: record.State === '99' ? 0.45 : 1 }}>{symbol}</div>;
                },
            },
            {
                title: '商品',
                dataIndex: 'name',
                key: 'name',
                width: 200,
                ...getColumnSearchProps('name'),
                render: (text, record) => {
                    return (
                        <span style={{ whiteSpace: 'pre-wrap', opacity: record.State === '99' ? 0.45 : 1 }}>
                            {text}
                        </span>
                    );
                },
            },
            {
                title: '買賣',
                dataIndex: 'BS',
                key: 'BS',
                width: 100,
                align: 'center',
                render: (text, record) => {
                    return (
                        <span
                            style={{
                                color: text === 'B' ? '#f45a4c' : '#22a16f',
                                opacity: record.State === '99' ? 0.45 : 1,
                            }}
                        >
                            {text === 'B' ? '買' : '賣'}
                        </span>
                    );
                },
            },
            {
                title: '成交量',
                dataIndex: 'Qmatched',
                key: 'Qmatched',
                align: 'right',
                width: 100,
                render: (text, record) => {
                    return (
                        <span style={{ opacity: record.State === '99' ? 0.45 : 1 }}>{parseFloat(text) || '--'}</span>
                    );
                },
            },
        ];
        if (type === 'detail') {
            setColumns(newColumns);
        } else {
            setColumns(newColumns2);
        }
    }, [data, searchColumns, marketFilterValue, searchWords, type]);

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
        if (dataIndex === 'name') {
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
                        const symbol = record.StockID.substring(0, record.StockID.lastIndexOf('.'));
                        if (symbol === symbolVal || record.name === nameVal) {
                            return true;
                        }
                    }
                },
            };
        }
    };

    const searchHandler = useCallback(
        (confirm, val) => {
            confirm();
            // getUnRealPrtlos(currentAccount, { stock: val });
            setSearchColumns(columns => {
                if (!columns.includes('name')) {
                    columns.push('name');
                }
                return columns;
            });
            // 因為送出的資料，和ui顯示不同，所以新增變數儲存
            setFilterSearchVal(val);
            console.log('val', val);
            // const submitVal = val.split(' ')[0];
            setSearchWords(val);
        },
        [currentAccount],
    );

    const searchResetHandler = useCallback(confirm => {
        confirm();
        if (searchColumns.indexOf('name') !== -1) {
            setSearchColumns(columns => {
                const index = searchColumns.indexOf('name');
                columns.splice(index, 1);
                return columns;
            });
            setSearchWords('');
            setFilterSearchVal('');
        }
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
    return (
        <>
            <AccountTable
                filterColumns={searchColumns}
                scroll={{ x: 780, y: 600 }}
                columns={columns}
                dataSource={data}
                pagination={false}
                // loading={{
                //     indicator: (
                //         <div
                //             style={{
                //                 marginTop: '20px',
                //                 color: 'black',
                //                 fontSize: '1.6rem',
                //                 width: '100%',
                //                 transform: 'translateX(-49%) translateY(-54px)',
                //             }}
                //         >
                //             資料加載中...
                //         </div>
                //     ),
                //     spinning: (fetchData == null && !error) || controlReload != 0 ? true : false,
                // }}
            />
            <style jsx global>{`
                .sino__table .ant-table-tbody > tr > td:last-child {
                    padding-right: 12px !important;
                }
            `}</style>
        </>
    );
};
export default DealTable;
