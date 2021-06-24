import { Table } from 'antd';
import AccountTable from '../tradingAccount/vipInventory/AccountTable';
import ReactDragListView from 'react-drag-listview';
import { useCallback, useState, useEffect } from 'react';
import { openGoOrder } from '../../../services/openGoOrder';
import { useCheckMobile } from '../../../hooks/useCheckMobile';
import { useRouter } from 'next/router';
import { fetchDeletSelectStock } from '../../../services/selfSelect/deletSelectStock';
import { fetchUpdateSelectStock } from '../../../services/selfSelect/updateSelectStock';
import drag from '../../../resources/images/pages/Self_select/menu-hamburger.svg';
import cancel from '../../../resources/images/pages/Self_select/menu-close-small.svg';

const StockDragTable = ({ tableData, tabKey, token, isSocalLogin }) => {
    const [selfSelectList, setSelfSelectList] = useState([]);
    const isMobile = useCheckMobile();
    const router = useRouter();
    const columns = [
        {
            title: '商品',
            dataIndex: 'name',
        },
        {
            title: '成交價',
            dataIndex: 'close',
            render: data => <span className={data.class}>{data.text}</span>,
        },
        {
            title: '漲跌',
            dataIndex: 'changePrice',
            render: data => <span className={data.class}>{data.text}</span>,
        },
        {
            title: '漲跌幅',
            dataIndex: 'changeRate',
            render: data => <span className={data.class}>{data.text}</span>,
        },
        {
            title: '成交量',
            dataIndex: 'totalVolume',
            render: data => <span className={data.class}>{data.text}</span>,
        },
        {
            title: '昨收',
            dataIndex: 'reference',
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
            dataIndex: '刪除',
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
            key: '移動',
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

    const goOrder = (stockData, bs) => {
        openGoOrder(
            {
                stockid: stockData.code,
                bs: bs,
                marketType: stockData.market === 'SB' ? 'H' : stockData.market,
            },
            isMobile,
            router,
        );
    };

    // TODO : 補上期貨刪除
    const rowDataToReqDataForDel = rowData => {
        let reqData = {};
        reqData.market = rowData.market;
        reqData.selectId = tabKey;
        if (['S', 'SB', 'H'].includes(reqData.market)) {
            reqData.symbol = rowData.code;
            reqData.exchange = rowData.exchange;
        } else if (['O', 'F'].includes(reqData.market)) {
            reqData.optionType = 'TX2';
            reqData.expMon = '201909W2';
        }
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
            setSelfSelectList(tableData);
        } else {
            setSelfSelectList([]);
        }
    }, [tableData]);

    const tableDataToReqDataForUpdate = tableData => {
        let reqDataSelectList = [];

        tableData.some((rowData, index) => {
            let rowReqData = {};
            if (['S', 'SB', 'H'].includes(rowData.market)) {
                rowReqData.symbol = rowData.code;
                rowReqData.exchange = rowData.exchange;
                rowReqData.market = rowData.market;
            } else if (['O', 'F'].includes(rowData.market)) {
                rowReqData.optionType = 'TX2';
                rowReqData.expMon = '201909W2';
                rowReqData.market = rowData.market;
            }
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
            console.log(res);
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
                />
            </ReactDragListView>

            <style jsx>{``}</style>
            <style jsx global>{`
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
            `}</style>
        </>
    );
};

export default StockDragTable;
