import Link from 'next/link';
import { memo, useState, useEffect } from 'react';
import { Table } from 'antd';
import AccountTable from '../tradingAccount/vipInventory/AccountTable';
import MultipleSolaceClientComponent from '../MultipleSolaceClientComponent';
import { useSelector } from 'react-redux';
import { checkLogin } from '../../../services/components/layouts/checkLogin';
import ReactDragListView from 'react-drag-listview';
import { openGoOrder } from '../../../services/openGoOrder';
import { useCheckMobile } from '../../../hooks/useCheckMobile';
import { useRouter } from 'next/router';
import { fetchDeletSelectStock } from '../../../services/selfSelect/deletSelectStock';
import { fetchUpdateSelectStock } from '../../../services/selfSelect/updateSelectStock';
import drag from '../../../resources/images/pages/Self_select/menu-hamburger.svg';
import cancel from '../../../resources/images/pages/Self_select/menu-close-small.svg';
import noData from '../../../resources/images/pages/Self_select/img-default.svg';

const StockDragTable = memo(({ tableData, tabKey, token, isSocalLogin }) => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const socalLogin = useSelector(store => store.user.socalLogin);

    const [selfSelectList, setSelfSelectList] = useState([]);
    const [topic, setTopic] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);
    // const [tableColumns, setTableColumns] = useState([]);

    const isMobile = useCheckMobile();
    const router = useRouter();
    const solaceData = useSelector(store => store.solace.solaceData);

    useEffect(() => {
        setDataLoading(true);
    }, [tableData]);

    const columns = [
        {
            title: '商品',
            dataIndex: 'name',
            render: data => (
                <a href={data.link} className="stock__name" target="_blank">
                    {data.text}
                </a>
            ),
        },
        {
            title: '成交價',
            dataIndex: 'close',
            align: 'right',
            render: data => <span className={data.class}>{data.text}</span>,
        },
        {
            title: '漲跌',
            dataIndex: 'changePrice',
            align: 'right',
            render: data => <span className={data.class}>{data.text}</span>,
        },
        {
            title: '漲跌幅',
            dataIndex: 'changeRate',
            align: 'right',
            render: data => <span className={data.class}>{data.text}</span>,
        },
        {
            title: '買價',
            dataIndex: 'buyPrice',
            align: 'right',
            render: data => <span className={data.class}>{data.text}</span>,
        },
        {
            title: '賣價',
            dataIndex: 'sellPrice',
            align: 'right',
            render: data => <span className={data.class}>{data.text}</span>,
        },
        {
            title: '成交量',
            dataIndex: 'totalVolume',
            align: 'right',
            render: data => <span className={data.class}>{data.text}</span>,
        },
        {
            title: '昨收',
            dataIndex: 'reference',
            align: 'right',
            render: data => <span className={data.class}>{data.text}</span>,
        },
        {
            title: '交易',
            dataIndex: 'action',
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
                        topicList.push(`TIC/v1/STK/*/*/${stock.code}`);
                        break;
                    case 'O':
                    case 'F':
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
            setDataLoading(false);
        }, 200);
    }, [tableData]);

    useEffect(() => {
        // let data = JSON.parse(JSON.stringify(selfSelectList));

        selfSelectList.forEach((selectData, index) => {
            if (selectData.code === solaceData.Code) {
                selectData.totalVolume.text = solaceData.VolSum;
                selectData.close.text = solaceData.Close;
                selectData.close.class =
                    parseFloat(solaceData.DiffPrice) < 0
                        ? 'lower'
                        : parseFloat(solaceData.DiffPrice) > 0
                        ? 'upper'
                        : '';
                selectData.changeRate.text = solaceData.DiffRate;
                selectData.changeRate.text = solaceData.DiffRate;
                selectData.changePrice.text =
                    parseFloat(solaceData.DiffPrice) === 0 ? '--' : parseFloat(solaceData.DiffPrice).toFixed(2);
                selectData.changePrice.class =
                    parseFloat(solaceData.DiffPrice) < 0
                        ? 'lower lower__icon'
                        : parseFloat(solaceData.DiffPrice) > 0
                        ? 'upper upper__icon'
                        : '';
                selectData.changeRate.text =
                    parseFloat(solaceData.DiffRate) === 0
                        ? '--'
                        : `${parseFloat(solaceData.DiffRate / 100).toFixed(2)} %`;
                selectData.changeRate.class =
                    parseFloat(solaceData.DiffRate) < 0
                        ? 'lower lower__icon'
                        : parseFloat(solaceData.DiffRate) > 0
                        ? 'upper upper__icon'
                        : '';
                return true;
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
                        spinning: dataLoading,
                    }}
                />
            </ReactDragListView>
            {checkLogin() && <MultipleSolaceClientComponent subscribeTopic={topic} idno={currentAccount?.idno} />}
            {!checkLogin() && <MultipleSolaceClientComponent subscribeTopic={topic} idno={socalLogin?._id} />}
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
                .drag__Table .lower {
                    color: #22a16f;
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
                body .ant-table-row[draggable] {
                    opacity: 0.3 !important;
                }
            `}</style>
        </>
    );
});

export default StockDragTable;
