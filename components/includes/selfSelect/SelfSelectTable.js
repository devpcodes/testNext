import { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Modal } from 'antd';
import DragTable from './DragTable';
import { fetchQuerySelectGroup } from '../../../services/selfSelect/querySelectGroup';
import { fetchQuerySelectInventoryStock } from '../../../services/selfSelect/querySelectInventoryStock';
import { fetchQuerySelectStock } from '../../../services/selfSelect/querySelectStock';
import { fetchQuerySubBrokerageQuote } from '../../../services/sb/querySubBrokerageQuote';
import { fetchSnapshot } from '../../../services/stock/snapshot';
import { getSocalToken } from '../../../services/user/accessToken';
import { getToken } from '../../../services/user/accessToken';
import useSWR from 'swr';

const { TabPane } = Tabs;

const SelfSelectTable = ({ reloadCount }) => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const socalLoginData = useSelector(store => store.user.socalLogin);

    const [selectGroupID, setSelectGroupID] = useState('0');
    const [snapshotInput, setSnapshotInput] = useState([]);
    const [sbInput, setSBInput] = useState([]); // { "symbol": "AAPL",  "exchange": "US"  }
    const [tableData, setTableData] = useState({});
    const isSocalLogin = Object.keys(socalLoginData).length > 0 ? true : false;
    const token = isSocalLogin ? getSocalToken() : getToken();

    // 查詢自選選單
    const { data: fetchSelectGroupData } = useSWR([isSocalLogin, token], fetchQuerySelectGroup, {
        onError: (error, key) => {
            Modal.error({
                title: '伺服器錯誤',
            });
        },
    });

    // 查詢庫存股票
    const { data: inventoryStockData } = useSWR(
        selectGroupID === '0' ? [token, currentAccount, selectGroupID] : null,
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
        selectGroupID !== '0' ? [isSocalLogin, token, selectGroupID] : null,
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

    // 查詢複委託報價
    const { data: sbQuote } = useSWR(sbInput.length > 0 ? [sbInput] : null, fetchQuerySubBrokerageQuote, {
        onError: (error, key) => {
            Modal.error({
                title: '伺服器錯誤',
            });
        },
    });

    const changeSelectGroup = key => {
        setSelectGroupID(key);
    };

    useEffect(async () => {
        const snapshotInputArray = [];
        if (inventoryStockData) {
            inventoryStockData[`${currentAccount.broker_id}${currentAccount.account}`].map((stock, index) => {
                if (['O', 'F', 'S'].includes(stock.market)) {
                    snapshotInputArray.push(stock.symbol);
                }
            });
            console.log(selectGroupID);
            console.log(snapshotInputArray);
            setSnapshotInput(snapshotInputArray);
        } else if (selectStocks) {
            selectStocks.map((stock, index) => {
                if (['O', 'F', 'S'].includes(stock.market)) {
                    snapshotInputArray.push(stock.symbol);
                }
            });
            console.log(selectGroupID);
            console.log(snapshotInputArray);
            setSnapshotInput(snapshotInputArray);
        }
    }, [inventoryStockData, selectStocks]);

    useEffect(() => {
        console.log(snapshotInput);
        const tableRowData = [];
        if (snapshotInput) {
            snapshotInput.some((stockCode, index) => {
                let stockData = {};
                if (snapshot) {
                    snapshot.some((snapshotData, snapshotIndex) => {
                        const isupper =
                            parseFloat(snapshotData.ChangePrice) == 0
                                ? ''
                                : parseFloat(snapshotData.ChangePrice) > 0
                                ? true
                                : false;
                        if (stockCode == snapshotData.Code) {
                            stockData.key = index;
                            stockData.name = snapshotData.Name === '' ? snapshotData.Code : snapshotData.Name;
                            stockData.close = {
                                text: snapshotData.Close.toFixed(2),
                                class: isupper === '' ? '' : isupper ? 'upper' : 'lower',
                            };
                            stockData.changePrice = {
                                text: Math.abs(snapshotData.ChangePrice).toFixed(2),
                                class: isupper === '' ? '' : isupper ? 'upper upper__icon' : 'lower lower__icon',
                            };
                            stockData.changeRate = {
                                text: Math.abs(snapshotData.ChangeRate).toFixed(2),
                                class: isupper === '' ? '' : isupper ? 'upper upper__icon' : 'lower lower__icon',
                            };
                            stockData.totalVolume = { text: snapshotData.TotalVolume };
                            stockData.reference = { text: snapshotData.Reference.toFixed(2) };
                            tableRowData.push(stockData);
                            return true;
                        }
                    });
                }
            });
        }
        console.log(tableRowData);
        setTableData(tableRowData);
        reloadCount(tableRowData.length);
    }, [snapshot]);

    // useEffect(() => {
    //     console.log(fetchSelectGroupData)
    // },[fetchSelectGroupData])

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
                <Tabs defaultActiveKey="0" onChange={changeSelectGroup}>
                    <TabPane tab="庫存" key="0" />
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
                <DragTable tableData={tableData} />
            </div>

            <style jsx>{`
                .select__group__tab {
                    padding: 0 30px;
                    border-bottom: solid 1px #e6ebf5;
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
            `}</style>
        </>
    );
};

export default SelfSelectTable;
