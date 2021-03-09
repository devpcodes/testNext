import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Space, Skeleton, Button, Tooltip } from 'antd';
import { timeFormatter } from '../../../../services/timeFormatter';
import { orderStatusQueryFetcher } from '../../../../services/components/goOrder/orderStatusQueryFetcher';
import { getToken } from '../../../../services/user/accessToken';
import {
    mappingCommissionedCode,
    mappingStatusMsg,
    mappingShowChangeBtn,
    mappingPriceMsg,
} from '../../../../services/components/goOrder/dataMapping';
import { themeColor } from '../panel/PanelTabs';
import arrow from '../../../../resources/images/components/goOrder/searchList-arrow-caret-up.svg';
import {
    setConfirmBoxTitle,
    setConfirmBoxOpen,
    setConfirmBoxColor,
    setConfirmBoxChangeValInfo,
    setCode,
    setLot,
    setConfirmBoxClickSource,
} from '../../../../store/goOrder/action';

const SearchList = ({ active }) => {
    const dispatch = useDispatch();
    const userInfo = useSelector(store => store.user.currentAccount);
    const clickSource = useSelector(store => store.goOrder.confirmBoxClickSource);
    const confirmOpen = useSelector(store => store.goOrder.confirmBoxOpen);
    // const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [sortKey, setSortKey] = useState('ord_time');
    const [sortOrder, setSortOrder] = useState('descend');
    const [showMask, setShowMask] = useState(false);

    const changeClickHandler = (text, record) => {
        maskClickHandler();
        dispatch(setCode(record.stock_id.trim()));
        dispatch(setLot('Board'));
        dispatch(setConfirmBoxChangeValInfo(record));
        dispatch(setConfirmBoxOpen(true));
        dispatch(setConfirmBoxTitle('刪改委託單'));
        dispatch(setConfirmBoxColor('#254a91'));
    };

    const rowClickHandler = (e, record) => {
        console.log('check', e.target.innerHTML);
        if (e.target.innerHTML.indexOf('刪') >= 0 || e.target.innerHTML.indexOf('改') >= 0) {
            return;
        }
        if (record.status_code == 4) {
            return;
        }
        console.log('row click', record, mappingStatusMsg(record.status_code));
        dispatch(setCode(record.stock_id.trim()));
        dispatch(setLot('Board'));
        dispatch(setConfirmBoxChangeValInfo(record));
        dispatch(setConfirmBoxOpen(true));
        dispatch(setConfirmBoxTitle('委託明細'));
        dispatch(setConfirmBoxColor('#254a91'));
    };

    // useEffect(() => {
    //     if(clickSource === 'detail' && !confirmOpen){
    //         dispatch(setConfirmBoxClickSource(''));
    //     }
    // },[clickSource, confirmOpen])

    useEffect(() => {
        const newColumns = [
            {
                title: '時間',
                dataIndex: 'ord_time',
                key: 'ord_time',
                sorter: (a, b) => {
                    let newA;
                    let newB;
                    newA = a.ord_time.substr(0, 6);
                    newB = b.ord_time.substr(0, 6);
                    if (newA == newB) {
                        newA = a.ord_time;
                        newB = b.ord_time;
                    }
                    return Number(newA) - Number(newB);
                },
                sortOrder: sortKey === 'ord_time' && sortOrder,
                render: (text, record) => {
                    const timeStr = timeFormatter(text, false);
                    const timeArr = timeStr.split(':');
                    return (
                        <div style={{ opacity: record.status_code === '4' ? 0.45 : 1 }}>
                            <p className="item">{timeArr[0] + ':' + timeArr[1]}</p>
                            <p className="item time__str--down">{':' + timeArr[2]}</p>
                        </div>
                    );
                },
            },
            {
                title: '商品',
                dataIndex: 'name_zh',
                key: 'name_zh',
                sorter: (a, b) => {
                    return sortString(a.name_zh, b.name_zh);
                },
                sortOrder: sortKey === 'name_zh' && sortOrder,
                render: (text, record) => {
                    return (
                        <div style={{ opacity: record.status_code === '4' ? 0.45 : 1 }}>
                            <p className="item">{text}</p>
                            <p className="item">
                                <span
                                    className="flag"
                                    style={{
                                        background:
                                            record.ord_bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor,
                                    }}
                                >
                                    {mappingCommissionedCode(record.ord_type2, record.market_id, record.ord_type1)}
                                </span>
                                <span className="timeInForce">{record.time_in_force}</span>
                            </p>
                        </div>
                    );
                },
            },
            {
                title: '委託價/量',
                dataIndex: 'price',
                key: 'price',
                render: (text, record) => {
                    return (
                        <div style={{ opacity: record.status_code === '4' ? 0.45 : 1 }}>
                            <p className="item">
                                {mappingPriceMsg(record.price, record.price_type, record.price_flag, record.ord_type1)}
                            </p>
                            <p className="item--down">{record.qty}</p>
                        </div>
                    );
                },
            },
            {
                title: '成交價/量',
                dataIndex: 'match_price',
                key: 'match_price',
                render: (text, record) => {
                    return (
                        <div style={{ opacity: record.status_code === '4' ? 0.45 : 1 }}>
                            <p className="item">{text}</p>
                            <p className="item--down">{record.match_qty}</p>
                        </div>
                    );
                },
            },
            {
                title: '狀態',
                dataIndex: 'status_code',
                key: 'status_code',
                sorter: (a, b) => {
                    let vala = mappingStatusMsg(a.status_code);
                    let valb = mappingStatusMsg(b.status_code);
                    if (mappingShowChangeBtn(a.status_code)) {
                        vala = '刪改';
                    }
                    if (mappingShowChangeBtn(b.status_code)) {
                        valb = '刪改';
                    }
                    return sortString(vala, valb);
                },
                sortOrder: sortKey === 'status_code' && sortOrder,
                render: (text, record) => {
                    let val = mappingStatusMsg(text);
                    let val1 = '';
                    let val2 = '';
                    if (val.length >= 4) {
                        val1 = val.substr(0, 2);
                        val2 = val.substr(2);
                    } else {
                        val1 = val;
                    }
                    let showBtn = mappingShowChangeBtn(text);
                    return (
                        <>
                            {showBtn === true ? (
                                <Tooltip
                                    arrowPointAtCenter={true}
                                    placement="bottomRight"
                                    visible={record.showControlBtn}
                                    title={
                                        <>
                                            <Button
                                                style={{
                                                    width: '102px',
                                                    height: '44px',
                                                    margin: '0 16px 12px 4px',
                                                    padding: '12px 10px 12px 8px',
                                                    borderRadius: '2px',
                                                    backgroundColor: '#c43826',
                                                    fontSize: '1.6rem',
                                                    margin: '0 auto',
                                                    color: 'white',
                                                    display: 'block',
                                                    border: 'none',
                                                }}
                                            >
                                                刪單
                                            </Button>
                                            <Button
                                                style={{
                                                    width: '102px',
                                                    height: '44px',
                                                    margin: '12px 16px 0 4px',
                                                    padding: '12px 9px',
                                                    borderRadius: '2px',
                                                    backgroundColor: '#254a91',
                                                    fontSize: '1.6rem',
                                                    margin: '0 auto',
                                                    marginTop: '12px',
                                                    color: 'white',
                                                    border: 'none',
                                                }}
                                                onClick={() => {
                                                    changeClickHandler(text, record);
                                                }}
                                            >
                                                改單
                                            </Button>
                                        </>
                                    }
                                    color="white"
                                >
                                    <Button
                                        style={{
                                            width: '50px',
                                            height: '28px',
                                            textAlign: 'center',
                                            padding: 0,
                                            verticalAlign: 'middle',
                                            backgroundColor: 'rgba(37, 74, 145, 0.16)',
                                            color: '#254a91',
                                            letterSpacing: '-2px',
                                            border: 'none',
                                            fontWeight: 'bold',
                                            fontSize: '1.5rem',
                                        }}
                                        onClick={e => {
                                            e.preventDefault();
                                            record.showControlBtn = true;
                                            setShowMask(true);
                                        }}
                                    >
                                        刪改
                                    </Button>
                                </Tooltip>
                            ) : (
                                <div style={{ opacity: text === '4' ? 0.45 : 1 }}>
                                    <p style={{ color: text === '1' ? '#c43826' : '' }} className="item">
                                        {val1}
                                    </p>
                                    <p style={{ color: text === '1' ? '#c43826' : '' }} className="item">
                                        {val2}
                                    </p>
                                </div>
                            )}
                        </>
                    );
                },
            },
        ];
        setColumns(newColumns);
    }, [sortKey, sortOrder, data]);

    useEffect(() => {
        getOrderStatus();
    }, [userInfo, active]);

    const maskClickHandler = () => {
        if (data.length > 0) {
            const newData = data.map((item, index) => {
                item.showControlBtn = false;
                return item;
            });
            setShowMask(false);
            setData(newData);
        }
    };

    const sortString = (a, b) => {
        if (a.trim().length < b.trim().length) {
            return -1;
        } else if (a.trim().length > b.trim().length) {
            return 1;
        } else {
            const stringA = a.toUpperCase();
            const stringB = b.toUpperCase();
            if (stringA < stringB) {
                return -1;
            }
            if (stringA > stringB) {
                return 1;
            }
            return 0;
        }
    };

    const getOrderStatus = async () => {
        const account = userInfo.account;
        const action = 'account';
        const broker_id = userInfo.broker_id;
        const stock_id = '';
        const token = getToken();
        const user_id = userInfo.idno;
        // setLoading(true);
        let res = await orderStatusQueryFetcher({
            account,
            action,
            broker_id,
            stock_id,
            token,
            user_id,
        });
        if (res.length > 0) {
            res = res.map((item, index) => {
                item.key = index;
                item.showControlBtn = false;
                return item;
            });
        }
        // setLoading(false);
        setData(res);
    };

    const sortTimeHandler = key => {
        if (sortKey === key) {
            if (sortOrder === 'ascend') {
                setSortOrder('descend');
            } else {
                setSortOrder('ascend');
            }
        } else {
            setSortKey(key);
            setSortOrder('descend');
        }
    };

    const sortIconHandler = key => {
        if (sortKey === key) {
            if (sortOrder === 'ascend') {
                return 180;
            } else {
                return 0;
            }
        }
    };
    return (
        <div className="searchList__container">
            <img
                className="icon__arrow--1"
                onClick={sortTimeHandler.bind(null, 'ord_time')}
                src={arrow}
                style={{
                    position: 'absolute',
                    top: '61px',
                    // left: '12%',
                    zIndex: 1,
                    transform: `rotate(${sortIconHandler('ord_time')}deg)`,
                    opacity: sortKey === 'ord_time' ? 1 : 0.3,
                }}
            />
            <img
                className="icon__arrow--2"
                onClick={sortTimeHandler.bind(null, 'name_zh')}
                src={arrow}
                style={{
                    position: 'absolute',
                    top: '61px',
                    left: '27%',
                    zIndex: 1,
                    transform: `rotate(${sortIconHandler('name_zh')}deg)`,
                    opacity: sortKey === 'name_zh' ? 1 : 0.3,
                }}
            />
            <img
                onClick={sortTimeHandler.bind(null, 'status_code')}
                src={arrow}
                style={{
                    position: 'absolute',
                    top: '61px',
                    left: '92%',
                    zIndex: 1,
                    transform: `rotate(${sortIconHandler('status_code')}deg)`,
                    opacity: sortKey === 'status_code' ? 1 : 0.3,
                }}
            />
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                scroll={{ y: 240 }}
                showSorterTooltip={false}
                onRow={record => {
                    return {
                        onClick: e => {
                            rowClickHandler(e, record);
                        },
                    };
                }}
            />
            <div
                style={{
                    width: '100%',
                    height: '100vh',
                    position: 'fixed',
                    top: '-340px',
                    background: 'white',
                    opacity: 0,
                    display: showMask ? 'block' : 'none',
                    zIndex: 999,
                }}
                onClick={maskClickHandler}
            ></div>
            {/* <div className="sum__box">- 1筆委託中，2筆成交 -</div> */}
            <style global jsx>{`
                .searchList__container {
                    margin-top: -16px;
                }
                .searchList__container .item {
                    margin: 0;
                    font-size: 1.6rem;
                    font-weight: bold;
                    color: #0d1623;
                }
                .searchList__container .item--down {
                    margin: 0;
                    font-size: 1.6rem;
                    font-weight: bold;
                    color: #a9b6cb;
                }
                .searchList__container .timeInForce {
                    color: #a9b6cb;
                    display: inline-block;
                }

                .flag {
                    /* font-size: 10px;
                    color: white;
                    padding: 2px;
                    border-radius: 2px;
                    height: 16px;
                    margin-right: 5px; */
                    display: inline-block;
                    font-size: 1rem;
                    color: white;
                    padding: 1px;
                    border-radius: 2px;
                    margin-right: 5px;
                    line-height: 16px;
                    width: 18px;
                    text-align: center;
                    vertical-align: baseline;
                }
                .searchList__container .time__str--down {
                    color: #a9b6cb;
                }

                .searchList__container .ant-table-tbody > tr > td {
                    padding: 0;
                    padding-top: 11px;
                    padding-bottom: 11px;
                }
                .searchList__container .ant-table-tbody > tr > td:first-child {
                    padding-left: 16px;
                    padding-right: 5px;
                    vertical-align: top;
                }
                .searchList__container .ant-table-tbody > tr > td:nth-child(3) {
                    text-align: right;
                    padding: 0 10px;
                    padding-top: 11px;
                    vertical-align: top;
                }
                .searchList__container .ant-table-tbody > tr > td:nth-child(4) {
                    text-align: right;
                    padding: 0 10px;
                    padding-top: 11px;
                    vertical-align: top;
                }
                .searchList__container .ant-table-tbody > tr > td:nth-child(5) {
                    text-align: center;
                    padding-top: 11px;
                    vertical-align: middle;
                }

                .searchList__container .ant-table-thead > tr > th {
                    white-space: nowrap;
                    font-size: 11px;
                    padding: 0;
                    height: 24px;
                    line-height: 24px;
                    background-color: #e6ebf5;
                    color: #0d1623;
                    padding: 0 10px;
                }
                .searchList__container .ant-table-thead > tr > th:nth-child(2) {
                    padding-left: 0;
                }
                .searchList__container .ant-table-thead > tr > th:nth-child(3) {
                    text-align: right;
                }
                .searchList__container .ant-table-thead > tr > th:nth-child(4) {
                    text-align: right;
                }
                .searchList__container .ant-table-thead > tr > th:nth-child(5) {
                    text-align: center;
                }
                .searchList__container .ant-table-thead > tr > th:first-child {
                    padding-left: 16px;
                    padding-right: 5px;
                }

                .searchList__container .ant-table-column-sorters {
                    padding: 0;
                }
                .searchList__container .ant-table-column-sorter-full {
                    display: none;
                    margin-top: -7px;
                }
                .searchList__container .ant-table-column-sorter-down.active {
                    color: black;
                }
                .searchList__container .ant-table-column-sorter-up.active {
                    color: black;
                }
                .searchList__container .ant-table-cell-scrollbar {
                    position: absolute;
                    right: -25px;
                }
                .searchList__container .ant-table-thead tr {
                    background: #e6ebf5;
                }
                .searchList__container .ant-skeleton {
                    position: absolute;
                    top: 78px;
                    left: 16px;
                    z-index: 10;
                }
                .searchList__container .ant-table-column-has-sorters {
                    background: #e6ebf5 !important;
                }
                .searchList__container .icon__arrow--1 {
                    left: 43px;
                }
                @media (max-width: 325px) {
                    .searchList__container .icon__arrow--2 {
                        left: 22px;
                    }
                }
                @media (max-width: 400px) {
                    .searchList__container .icon__arrow--2 {
                        left: 10%;
                    }
                }
                .searchList__container td.ant-table-column-sort {
                    background: white;
                }
                .sum__box {
                    text-align: center;
                    margin-top: 10px;
                    font-size: 1.2rem;
                    color: #a9b6cb;
                    letter-spacing: 1px;
                }
            `}</style>
            <style jsx global>{`
                .ant-tooltip-inner {
                    color: white;
                    box-shadow: 0 2px 15px 0 rgba(169, 182, 203, 0.7);
                    padding: 16px;
                    line-height: 25px;
                    margin-right: -4px;
                    z-index: 3;
                }
            `}</style>
        </div>
    );
};

export default SearchList;
