import Link from 'next/link';
import { memo, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccountTable from '../tradingAccount/vipInventory/AccountTable';
import MultipleSolaceClientComponent from '../MultipleSolaceClientComponent';
import { checkLogin } from '../../../services/components/layouts/checkLogin';
import ReactDragListView from 'react-drag-listview';
import { openGoOrder } from '../../../services/openGoOrder';
import { useCheckMobile } from '../../../hooks/useCheckMobile';
import { useRouter } from 'next/router';
import { fetchDeletSelectStock } from '../../../services/selfSelect/deletSelectStock';
import { fetchUpdateSelectStock } from '../../../services/selfSelect/updateSelectStock';
import { setDataLoading } from '../../../store/watchLists/action';
import drag from '../../../resources/images/pages/Self_select/menu-hamburger.svg';
import cancel from '../../../resources/images/pages/Self_select/menu-close-small.svg';
import noData from '../../../resources/images/pages/Self_select/img-default.svg';

const StockDragTable = memo(({ tableData, tabKey, token, isSocalLogin, snapshotData }) => {
    // const refCount = React.useRef(0);
    // console.log(refCount.current++);
    const dispatch = useDispatch();
    const currentAccount = useSelector(store => store.user.currentAccount);
    const socalLogin = useSelector(store => store.user.socalLogin);
    const [selfSelectList, setSelfSelectList] = useState([]);
    const [topic, setTopic] = useState([]);
    // const [tableColumns, setTableColumns] = useState([]);

    const isMobile = useCheckMobile();
    const router = useRouter();
    const solaceData = useSelector(store => store.solace.solaceData);
    const isDataLoading = useSelector(store => store.watchLists.dataLoading);

    useEffect(() => {
        dispatch(setDataLoading(true));
    }, [tableData]);

    const columns = [
        {
            title: '商品',
            dataIndex: 'name',
            width: '15%',
            fixed: 'left',
            render: data => (
                <a href={data.link} className="stock__name" target="_blank">
                    {data.text}
                </a>
            ),
        },
        {
            title: '成交價',
            width: 92,
            dataIndex: 'close',
            align: 'right',
            render: data => (
                <span className={data.class}>
                    {data.text == '0.00' ? '--' : data.text}
                    {data.simtrade ? '*' : ''}
                </span>
            ),
        },
        {
            title: '漲跌',
            width: 92,
            dataIndex: 'changePrice',
            align: 'right',
            render: data => <span className={data.class}>{data.text}</span>,
        },
        {
            title: '漲跌幅',
            width: 92,
            dataIndex: 'changeRate',
            align: 'right',
            render: data => <span className={data.class}>{data.text}</span>,
        },
        {
            title: '買價',
            width: 92,
            dataIndex: 'buyPrice',
            align: 'right',
            render: data => (
                <span className={data.class}>
                    {data.text == '0.00' ? '--' : data.text}
                    {data.simtrade ? '*' : ''}
                </span>
            ),
        },
        {
            title: '賣價',
            width: 92,
            dataIndex: 'sellPrice',
            align: 'right',
            render: data => (
                <span className={data.class}>
                    {data.text == '0.00' ? '--' : data.text}
                    {data.simtrade ? '*' : ''}
                </span>
            ),
        },
        {
            title: '最高',
            width: 92,
            dataIndex: 'high',
            align: 'right',
            render: data => (
                <span className={data.class}>
                    {data.text == '0.00' ? '--' : data.text}
                    {/* {data.simtrade ? '*' : ''} */}
                </span>
            ),
        },
        {
            title: '最低',
            width: 92,
            dataIndex: 'low',
            align: 'right',
            render: data => (
                <span className={data.class}>
                    {data.text == '0.00' ? '--' : data.text}
                    {/* {data.simtrade ? '*' : ''} */}
                </span>
            ),
        },
        {
            title: '總量',
            width: 100,
            dataIndex: 'totalVolume',
            align: 'right',
            render: data => <span className={data.class}>{data.text}</span>,
        },
        {
            title: '昨收',
            width: 92,
            dataIndex: 'reference',
            align: 'right',
            render: data => <span className={data.class}>{data.text}</span>,
        },
        {
            title: '均價',
            width: 100,
            dataIndex: 'averagePrice',
            align: 'right',
            render: data => <span>{data.text}</span>,
        },
        {
            title: '開盤價',
            width: 100,
            dataIndex: 'open',
            align: 'right',
            render: data => <span>{data.text}</span>,
        },
        {
            title: '單量',
            width: 100,
            dataIndex: 'volume',
            align: 'right',
            render: data => <span>{data.text}</span>,
        },
        {
            title: '金額(億)',
            width: 100,
            dataIndex: 'totalAmount',
            align: 'right',
            render: data => <span>{data.text}</span>,
        },
        {
            title: '交易',
            dataIndex: 'action',
            fixed: 'right',
            render: (text, record, index) => (
                <>
                    <button
                        className="btn buy"
                        onClick={() => {
                            goOrder(record, 'B');
                        }}
                    >
                        買進
                    </button>
                    <button
                        className="btn sell"
                        onClick={() => {
                            goOrder(record, 'S');
                        }}
                    >
                        賣出
                    </button>
                </>
            ),
        },
        {
            title: '刪除',
            dataIndex: 'del',
            render: (text, record, index) =>
                tabKey === '0' ? (
                    <></>
                ) : (
                    <span className="cancel" onClick={() => deleteStock(record, index)}>
                        <img src={cancel} />
                    </span>
                ),
        },
        {
            title: '移動',
            dataIndex: 'move',
            render: (text, record, index) =>
                tabKey === '0' ? (
                    <></>
                ) : (
                    <span className="drag">
                        <img src={drag} />
                    </span>
                ),
        },
    ];

    columns.forEach((val, index) => {
        if (tabKey + '' === '0' && (val.dataIndex === 'del' || val.dataIndex === 'move')) {
            delete columns[index];
        } else if (isSocalLogin === true && val.dataIndex === 'action') {
            delete columns[index];
        } else if (isMobile && val.dataIndex === 'move') {
            delete columns[index];
        }
    });

    // setTableColumns(columns)

    const locale = {
        emptyText: (
            <span>
                <img src={noData} />
                <p className="noData__desc">
                    目前還沒加入個股
                    <br />
                    請使用上方搜尋列新增個股
                </p>
            </span>
        ),
    };

    const goOrder = (stockData, bs) => {
        openGoOrder(
            {
                stockid: stockData.code,
                bs: bs,
                type: stockData.market === 'SB' ? 'H' : stockData.market,
            },
            isMobile,
            router,
        );
    };

    const rowDataToReqDataForDel = rowData => {
        let reqData = {};
        reqData.market = rowData.market;
        reqData.selectId = tabKey;
        reqData.symbol = rowData.code;
        reqData.exchange = rowData.exchange;
        reqData.token = token;
        return reqData;
    };

    const deleteStock = async (record, index) => {
        const reqData = rowDataToReqDataForDel(record);
        const res = await fetchDeletSelectStock(reqData, isSocalLogin);
        if (res.success != null && res.success === true && res.result === 'OK') {
            const data = JSON.parse(JSON.stringify(selfSelectList));
            data.splice(index, 1);
            setSelfSelectList(data);
        } else {
            alert('刪除失敗');
        }
    };

    useEffect(() => {
        if (tableData && tableData.length > 0) {
            let topicList = [];
            tableData.forEach(stock => {
                switch (stock.market) {
                    case 'S':
                        topicList.push(`QUO/v1/STK/*/*/${stock.code}`);
                        topicList.push(`TIC/v1/STK/*/*/${stock.code}`);
                        break;
                    case 'O':
                    case 'F':
                        topicList.push(`QUO/v1/FOP/*/*/${stock.code}`);
                        topicList.push(`TIC/v1/FOP/*/*/${stock.code}`);
                        break;
                }
            });

            setTopic(topicList);
            setSelfSelectList(tableData);
        } else {
            setTopic([]);
            setSelfSelectList([]);
        }
        setTimeout(() => {
            dispatch(setDataLoading(false));
        }, 500);
    }, [tableData]);

    useEffect(() => {
        // 從 snapshot 拿取最高最低價，solace 裡面沒有。
        let upDownLimit = {};
        if (snapshotData) {
            snapshotData.forEach((stockSNData, index) => {
                upDownLimit[stockSNData.Code] = {};
                upDownLimit[stockSNData.Code].upper = stockSNData.UpLimit;
                upDownLimit[stockSNData.Code].lower = stockSNData.DownLimit;
            });
        }

        const getClass = (solaceData, price, needLimit, needIcon) => {
            let className = '';
            price
                ? parseFloat(solaceData.DiffPrice) == 0
                    ? ''
                    : parseFloat(solaceData.DiffPrice) > 0
                    ? (className += 'upper ')
                    : (className += 'lower ')
                : '';
            if (needLimit) {
                parseFloat(price) === parseFloat(upDownLimit[solaceData.Code]?.upper)
                    ? (className += 'up__limit ')
                    : parseFloat(price) === parseFloat(upDownLimit[solaceData.Code]?.lower)
                    ? (className += 'down__limit ')
                    : '';
            }
            if (needIcon) {
                parseFloat(solaceData.DiffPrice) == 0
                    ? ''
                    : parseFloat(solaceData.DiffPrice) > 0
                    ? (className += 'upper__icon ')
                    : (className += 'lower__icon ');
            }
            return className;
        };

        selfSelectList.forEach((selectData, index) => {
            if (solaceData[selectData.code]) {
                if (solaceData[selectData.code].Close) {
                    selectData.totalVolume.text = solaceData[selectData.code].VolSum;

                    selectData.close.text = parseFloat(solaceData[selectData.code].Close).toFixed(2);
                    (selectData.close.class = (() => {
                        return getClass(solaceData[selectData.code], solaceData[selectData.code].Close, true, false);
                    })()),
                        (selectData.close.simtrade = solaceData[selectData.code].Simtrade);

                    selectData.changePrice.text =
                        parseFloat(solaceData[selectData.code].DiffPrice) === 0
                            ? '--'
                            : parseFloat(Math.abs(solaceData[selectData.code].DiffPrice)).toFixed(2);
                    selectData.changePrice.class = (() => {
                        return getClass(
                            solaceData[selectData.code],
                            solaceData[selectData.code].DiffPrice,
                            false,
                            true,
                        );
                    })();
                    selectData.changeRate.text =
                        parseFloat(solaceData[selectData.code].DiffRate) === 0
                            ? '--'
                            : `${Math.abs(parseFloat(solaceData[selectData.code].DiffRate / 100).toFixed(2))} %`;

                    selectData.changeRate.class = (() => {
                        return getClass(solaceData[selectData.code], solaceData[selectData.code].DiffRate, false, true);
                    })();
                    if (!solaceData[selectData.code].Simtrade) {
                        selectData.high.text = parseFloat(solaceData[selectData.code].High).toFixed(2);
                        selectData.high.class = solaceData[selectData.code].High
                            ? parseFloat(solaceData[selectData.code].High) - parseFloat(selectData.reference.text) < 0
                                ? 'lower'
                                : parseFloat(solaceData[selectData.code].High) - parseFloat(selectData.reference.text) >
                                  0
                                ? 'upper'
                                : ''
                            : '';
                        selectData.low.text = parseFloat(solaceData[selectData.code].Low).toFixed(2);
                        selectData.low.class = solaceData[selectData.code].Low
                            ? parseFloat(solaceData[selectData.code].Low) - parseFloat(selectData.reference.text) < 0
                                ? 'lower'
                                : parseFloat(solaceData[selectData.code].Low) - parseFloat(selectData.reference.text) >
                                  0
                                ? 'upper'
                                : ''
                            : '';
                    }
                }
                if (solaceData[selectData.code].BidPrice && solaceData[selectData.code].AskPrice) {
                    selectData.buyPrice.text =
                        parseFloat(solaceData[selectData.code].BidPrice[0]).toFixed(2) === 0
                            ? '--'
                            : parseFloat(solaceData[selectData.code].BidPrice[0]).toFixed(2);
                    selectData.buyPrice.class = solaceData[selectData.code].BidPrice[0]
                        ? parseFloat(solaceData[selectData.code].BidPrice[0]) - parseFloat(selectData.reference.text) <
                          0
                            ? 'lower'
                            : parseFloat(solaceData[selectData.code].BidPrice[0]) -
                                  parseFloat(selectData.reference.text) >
                              0
                            ? 'upper'
                            : ''
                        : '';

                    selectData.sellPrice.text =
                        parseFloat(solaceData[selectData.code].AskPrice[0]).toFixed(2) === 0
                            ? '--'
                            : parseFloat(solaceData[selectData.code].AskPrice[0]).toFixed(2);
                    selectData.sellPrice.class = solaceData[selectData.code].AskPrice[0]
                        ? parseFloat(solaceData[selectData.code].AskPrice[0]) - parseFloat(selectData.reference.text) <
                          0
                            ? 'lower'
                            : parseFloat(solaceData[selectData.code].AskPrice[0]) -
                                  parseFloat(selectData.reference.text) >
                              0
                            ? 'upper'
                            : ''
                        : '';
                }
                if (solaceData[selectData.code].AvgPrice) {
                    selectData.averagePrice.text =
                        parseFloat(solaceData[selectData.code].AvgPrice).toFixed(2) === 0
                            ? '--'
                            : parseFloat(solaceData[selectData.code].AvgPrice).toFixed(2);
                }
                if (solaceData[selectData.code].Volume) {
                    selectData.volume.text =
                        solaceData[selectData.code].Volume === 0 ? '--' : solaceData[selectData.code].Volume;
                }
                if (solaceData[selectData.code].AmountSum) {
                    selectData.totalAmount.text =
                        parseFloat(solaceData[selectData.code].AmountSum).toFixed(2) === 0
                            ? '--'
                            : parseFloat(solaceData[selectData.code].AmountSum / 100000000).toFixed(2);
                }
            }
        });

        setSelfSelectList(selfSelectList);
    }, [solaceData]);

    const tableDataToReqDataForUpdate = tableData => {
        let reqDataSelectList = [];

        tableData.some((rowData, index) => {
            let rowReqData = {};
            rowReqData.symbol = rowData.code;
            rowReqData.exchange = rowData.exchange;
            rowReqData.market = rowData.market;
            reqDataSelectList.push(rowReqData);
        });
        return reqDataSelectList;
    };

    const dragProps = {
        async onDragEnd(fromIndex, toIndex) {
            const data = JSON.parse(JSON.stringify(selfSelectList));
            const item = data.splice(fromIndex, 1)[0];
            data.splice(toIndex, 0, item);
            const reqData = tableDataToReqDataForUpdate(data);
            const res = await fetchUpdateSelectStock(reqData, isSocalLogin, token, tabKey);
            setSelfSelectList(data);
        },
        handleSelector: '.drag',
    };

    return (
        <>
            <ReactDragListView {...dragProps}>
                <AccountTable
                    className="drag__Table"
                    columns={columns}
                    pagination={false}
                    dataSource={selfSelectList}
                    locale={locale}
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
                        spinning: isDataLoading,
                    }}
                />
            </ReactDragListView>
            {checkLogin() && (
                <MultipleSolaceClientComponent subscribeTopic={topic} idno={currentAccount?.idno} delay={3000} />
            )}
            {!checkLogin() && (
                <MultipleSolaceClientComponent subscribeTopic={topic} idno={socalLogin?._id} delay={3000} />
            )}
            <style jsx>{``}</style>
            <style jsx global>{`
                .stock__name:hover {
                    color: #daa360;
                }
                .drag__Table .upper {
                    color: #f45a4c;
                }
                .drag__Table .upper__icon:before {
                    content: '▲ ';
                }
                .drag__Table .upper.up__limit {
                    display: inline-block;
                    padding: 0px 7px;
                    background: #f45a4c;
                    color: #fff;
                }
                .drag__Table .lower {
                    color: #22a16f;
                }
                .drag__Table .lower.down__limit {
                    display: inline-block;
                    padding: 0px 7px;
                    background: #22a16f;
                    color: #fff;
                }
                .drag__Table .lower__icon:before {
                    content: '▼ ';
                }
                .drag__Table .ant-table-cell {
                    color: #0d1623;
                }
                .drag__Table .btn {
                    height: 24px;
                    width: 44px;
                    font-size: 1.2rem;
                    border: 0;
                    color: #fff;
                    border-radius: 2px;
                    margin: 0 2px;
                }
                .drag__Table .btn.buy {
                    background: #f45a4c;
                }
                .drag__Table .btn.sell {
                    background: #22a16f;
                }
                .drag__Table .cancel {
                    cursor: pointer;
                }
                .drag__Table .drag {
                    cursor: move;
                }
                .noData__desc {
                    font-size: 16px;
                    color: #3f5372;
                    margin-top: 16px;
                }
                // body .ant-table-row[draggable] {
                //     opacity: 0.3 !important;
                // }
            `}</style>
        </>
    );
});

export default StockDragTable;
