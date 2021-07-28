import { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Modal } from 'antd';
import StockDragTable from './StockDragTable';
import { fetchQuerySelectGroup } from '../../../services/selfSelect/querySelectGroup';
import { fetchQuerySelectInventoryStock } from '../../../services/selfSelect/querySelectInventoryStock';
import { fetchQuerySelectStock } from '../../../services/selfSelect/querySelectStock';
import { fetchQuerySubBrokerageQuote } from '../../../services/sb/querySubBrokerageQuote';
import { fetchSnapshot } from '../../../services/stock/snapshot';
import { getSocalToken, getToken } from '../../../services/user/accessToken';
import Test from '../Test';
import useSWR from 'swr';

const { TabPane } = Tabs;

const SelfSelectTable = ({
    reloadCount,
    reloadTabkey,
    selectReloadTime,
    inventoryReloadTime,
    setSelectGroupReloadTime,
    tabkey,
}) => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const socalLoginData = useSelector(store => store.user.socalLogin);

    const [selectGroupID, setSelectGroupID] = useState(tabkey);
    const [snapshotInput, setSnapshotInput] = useState([]);
    const [sbInput, setSBInput] = useState([]);
    const [tableData, setTableData] = useState({});
    const [isfirstTimeLoaded, setIsfirstTimeLoaded] = useState(true);
    const isSocalLogin = Object.keys(socalLoginData).length > 0 ? true : false;
    const token = isSocalLogin ? getSocalToken() : getToken();

    // console.log('==========-----------------==============');
    // console.log(isSocalLogin);
    // console.log(token);
    // console.log(currentAccount);
    // console.log(selectGroupID);
    // console.log(inventoryReloadTime);
    // console.log('==========-----------------==============');

    // 查詢自選選單
    const { data: fetchSelectGroupData } = useSWR(
        token ? [isSocalLogin, token, setSelectGroupReloadTime] : null,
        fetchQuerySelectGroup,
        {
            onError: (error, key) => {
                Modal.error({
                    title: '伺服器錯誤',
                });
            },
        },
    );

    // 查詢庫存股票
    const { data: inventoryStockData } = useSWR(
        !isSocalLogin && selectGroupID === '0' && token ? [token, inventoryReloadTime] : null,
        fetchQuerySelectInventoryStock,
        {
            onError: (error, key) => {
                Modal.error({
                    title: '伺服器錯誤',
                });
            },
        },
    );

    // 查詢自選個股
    const { data: selectStocks } = useSWR(
        selectGroupID !== '0' && token ? [isSocalLogin, token, selectGroupID, selectReloadTime] : null,
        fetchQuerySelectStock,
        {
            onError: (error, key) => {
                Modal.error({
                    title: '伺服器錯誤',
                });
            },
        },
    );

    // 查詢個股報價
    const { data: snapshot } = useSWR(snapshotInput.length > 0 ? [snapshotInput] : null, fetchSnapshot, {
        onError: (error, key) => {
            Modal.error({
                title: '伺服器錯誤',
            });
        },
    });

    // 查詢複委託報價 ( 檔第三方登入 )
    const { data: sbQuote } = useSWR(sbInput.length > 0 ? [sbInput, token] : null, fetchQuerySubBrokerageQuote, {
        onError: (error, key) => {
            Modal.error({
                title: '伺服器錯誤',
            });
        },
    });

    const changeSelectGroup = key => {
        setSelectGroupID(key);
    };

    const setRequestData = data => {
        const snapshotInputArray = [];
        const sbInputArray = [];
        if (data && Array.isArray(data) && data.length > 0) {
            data.map((stock, index) => {
                if (['O', 'F', 'S'].includes(stock.market)) {
                    snapshotInputArray.push(stock.symbol);
                } else if (['SB'].includes(stock.market)) {
                    let exchange = '';
                    switch (stock.exchange) {
                        case 'NASDAQ':
                            exchange = 'US';
                            break;
                        case 'HKG':
                            if (stock.symbol.search(/^[8]{1}[0-9]{4}$/) === 0) {
                                exchange = 'HKR';
                            } else {
                                exchange = 'SEHK';
                            }
                            break;
                        case 'SHH':
                            exchange = 'SHSE';
                            break;
                        case 'SHZ':
                            exchange = 'SZSE';
                            break;
                        default:
                            exchange = stock.exchange;
                            break;
                    }
                    sbInputArray.push({ symbol: stock.symbol, exchange: exchange });
                }
            });
        }
        setSnapshotInput(snapshotInputArray);
        setSBInput(sbInputArray);
    };

    useEffect(async () => {
        if (inventoryStockData) {
            setRequestData(inventoryStockData[`${currentAccount.broker_id}${currentAccount.account}`]);
        } else if (selectStocks) {
            setRequestData(selectStocks);
        }
    }, [inventoryStockData, selectStocks]);

    // 第三方登入鎖定第一個選單
    useEffect(() => {
        if (isSocalLogin && isfirstTimeLoaded) {
            setSelectGroupID(fetchSelectGroupData[0].selectId);
            setIsfirstTimeLoaded(false);
        }
    }, [fetchSelectGroupData]);

    useEffect(() => {
        // console.log(selectGroupID);
        if (inventoryStockData || selectStocks) {
            const tableData =
                selectGroupID === '0'
                    ? inventoryStockData[`${currentAccount.broker_id}${currentAccount.account}`]
                    : selectStocks;
            const tableRowData = [];

            if (tableData && Array.isArray(tableData) && tableData.length > 0) {
                tableData.some((stock, index) => {
                    let stockData = {};

                    if (snapshot && ['O', 'F', 'S'].includes(stock.market)) {
                        // 證期權
                        snapshot.some((snapshotData, snapshotIndex) => {
                            console.log(snapshotData.BuyPrice);
                            const isupper =
                                parseFloat(snapshotData.ChangePrice) == 0
                                    ? ''
                                    : parseFloat(snapshotData.ChangePrice) > 0
                                    ? true
                                    : false;
                            if (stock.symbol == snapshotData.Code) {
                                stockData.key = index;
                                stockData.code = snapshotData.Code;
                                stockData.market = stock.market;
                                stockData.exchange = stock.exchange;
                                stockData.name = {
                                    text: `${snapshotData.Code} ${snapshotData.Name}`,
                                    link: ['S'].includes(stock.market)
                                        ? `${process.env.NEXT_PUBLIC_SUBPATH}/TradingCenter_TWStocks_Stock/?mode=0&code=${snapshotData.Code}`
                                        : ['F'].includes(stock.market)
                                        ? `${process.env.NEXT_PUBLIC_SUBPATH}/TradingCenter_TWStocks_Futures/`
                                        : ['O'].includes(stock.market)
                                        ? `${process.env.NEXT_PUBLIC_SUBPATH}/TradingCenter_TWStocks_Option/`
                                        : 'javascript:;',
                                };
                                stockData.close = {
                                    text: snapshotData.Close ? snapshotData.Close.toFixed(2) : '--',
                                    class: isupper === '' ? '' : isupper ? 'upper' : 'lower',
                                };
                                stockData.changePrice = {
                                    text: snapshotData.ChangePrice
                                        ? Math.abs(snapshotData.ChangePrice).toFixed(2)
                                        : '--',
                                    class: isupper === '' ? '' : isupper ? 'upper upper__icon' : 'lower lower__icon',
                                };
                                stockData.changeRate = {
                                    text: snapshotData.ChangeRate
                                        ? `${Math.abs(snapshotData.ChangeRate).toFixed(2)} %`
                                        : '--',
                                    class: isupper === '' ? '' : isupper ? 'upper upper__icon' : 'lower lower__icon',
                                };
                                stockData.buyPrice = {
                                    text: snapshotData.BuyPrice ? snapshotData.BuyPrice.toFixed(2) : '--',
                                    class:
                                        snapshotData.BuyPrice > snapshotData.Reference
                                            ? 'upper'
                                            : snapshotData.BuyPrice < snapshotData.Reference
                                            ? 'lower'
                                            : '',
                                };
                                stockData.sellPrice = {
                                    text: snapshotData.SellPrice ? snapshotData.SellPrice.toFixed(2) : '--',
                                    class:
                                        snapshotData.SellPrice > snapshotData.Reference
                                            ? 'upper'
                                            : snapshotData.BuyPrice < snapshotData.Reference
                                            ? 'lower'
                                            : '',
                                };
                                stockData.totalVolume = {
                                    text: snapshotData.TotalVolume ? snapshotData.TotalVolume : '--',
                                };
                                stockData.reference = {
                                    text: snapshotData.Reference ? snapshotData.Reference.toFixed(2) : '--',
                                };
                                tableRowData.push(stockData);
                                return true;
                            }
                        });
                    } else if (sbQuote && ['SB'].includes(stock.market)) {
                        // 複委託
                        let mk;
                        const sbQuoteData = sbQuote[`${stock.symbol}.${mk}`];

                        switch (stock.exchange) {
                            case 'NASDAQ':
                                mk = 'US';
                                break;
                            case 'SHH':
                                mk = 'SHSE';
                                break;
                            case 'SHZ':
                                mk = 'SZSE';
                                break;
                            default:
                                mk = stock.exchange;
                                break;
                        }

                        console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
                        console.log(sbQuoteData);
                        console.log(sbQuote[`${stock.symbol}.${mk}`]);
                        console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
                        stockData.key = index;
                        stockData.code = stock.symbol;
                        stockData.market = stock.market;
                        stockData.exchange = stock.exchange;
                        stockData.name = {
                            text:
                                sbQuoteData && sbQuoteData.stockName ? sbQuoteData.stockName : `${stock.symbol}.${mk}`,
                            link: `${process.env.NEXT_PUBLIC_SUBPATH}/TradingCenter_TWStocks_SubBrokerage/?tab=2&symbol=${stock.symbol}&exch=${stock.exchange}`,
                        };
                        stockData.close = {
                            text:
                                sbQuoteData && sbQuoteData.refPrice
                                    ? parseFloat(sbQuoteData.refPrice).toFixed(2)
                                    : '--',
                        };
                        stockData.changePrice = {
                            text: '--',
                        };
                        stockData.changeRate = {
                            text: '--',
                        };
                        stockData.buyPrice = {
                            text: '--',
                        };
                        stockData.sellPrice = {
                            text: '--',
                        };
                        stockData.totalVolume = { text: '--' };
                        stockData.reference = {
                            text:
                                sbQuoteData && sbQuoteData.preClose
                                    ? parseFloat(sbQuoteData.preClose).toFixed(2)
                                    : '--',
                        };
                        tableRowData.push(stockData);
                    }
                });
            }

            setTableData(tableRowData);
            reloadCount(tableRowData.length);
        }
    }, [snapshot, sbQuote]);

    useEffect(() => {
        // 遮罩
        reloadTabkey(selectGroupID);
    }, [selectGroupID]);

    useEffect(async () => {
        setSelectGroupID(tabkey);
    }, [tabkey]);

    // 取得庫存檔案 ( 只有證券帳戶 )
    useEffect(() => {
        if (!!inventoryStockData && Object.keys(inventoryStockData).length > 0) {
            const InventoryStocks = inventoryStockData[`${currentAccount.broker_id}${currentAccount.account}`];
            // console.log(InventoryStocks)
        }
    }, [inventoryStockData]);

    return (
        <>
            {/* {console.log(selectStocks)} */}
            <div className="select__group__tab">
                <Tabs onChange={changeSelectGroup} activeKey={selectGroupID}>
                    {!isSocalLogin && <TabPane tab="庫存" key="0" />}
                    {!!fetchSelectGroupData &&
                        fetchSelectGroupData.map((val, key) => {
                            return (
                                <>
                                    <TabPane tab={val.selectName} key={val.selectId} />
                                </>
                            );
                        })}
                </Tabs>
            </div>
            <div className="select__stock__table">
                <StockDragTable
                    tableData={tableData}
                    tabKey={selectGroupID}
                    token={token}
                    isSocalLogin={isSocalLogin}
                />
            </div>

            {/* <Test /> */}
            <style jsx>{`
                .select__group__tab {
                    padding: 0 30px;
                    border: solid 1px #e6ebf5;
                    background: #fff;
                }
                .select__stock__table {
                    overflow: auto;
                }
                .select__list__box {
                    border: solid 1px #e6ebf5;
                }
            `}</style>
            <style jsx global>{`
                .ant-tabs-tab-btn {
                    font-size: 1.6rem;
                }
                .ant-tabs-tab-btn:hover,
                .ant-tabs-tab:hover {
                    color: #daa360;
                }
                .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
                    color: #daa360;
                }
                .ant-tabs-ink-bar {
                    background: #daa360;
                }
                .ant-tabs-bottom > .ant-tabs-nav .ant-tabs-ink-bar,
                .ant-tabs-bottom > div > .ant-tabs-nav .ant-tabs-ink-bar,
                .ant-tabs-top > .ant-tabs-nav .ant-tabs-ink-bar,
                .ant-tabs-top > div > .ant-tabs-nav .ant-tabs-ink-bar {
                    height: 4px;
                }
                .ant-tabs-nav-list {
                    color: #0d1623;
                }
                .ant-table-wrapper .ant-table-thead > tr > th {
                    background-color: #f2f5fa;
                    color: #3f5372;
                }

                .select__stock__table .sino__table {
                    margin-bottom: 0px;
                }
            `}</style>
        </>
    );
};

export default SelfSelectTable;
