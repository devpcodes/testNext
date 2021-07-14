import { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Tooltip, Button, message } from 'antd';
import moment from 'moment';
import { postQuickSearch } from '../../../../../services/components/goOrder/sb/postQuickSearch';
import { timeFormatter } from '../../../../../services/timeFormatter';
import { getToken } from '../../../../../services/user/accessToken';
import SearchListTable from './SearchListTable';
import { getPriceType, getTT, goOrderMapping } from '../../../../../services/components/goOrder/sb/dataMapping';
import { themeColor } from '../../panel/PanelTabs';
import {
    setConfirmBoxChanValInfo,
    setConfirmBoxColor,
    setConfirmBoxOpen,
    setConfirmBoxTitle,
    setRefresh,
    setRefreshCode,
    setSearchListSubmitSuccess,
    setWebsocketEvent,
} from '../../../../../store/goOrderSB/action';
import { postCancel } from '../../../../../services/components/goOrder/sb/postCancel';
import { postSbcoCode } from '../../../../../services/components/goOrder/sb/postSbcoCode';
import { getWebId } from '../../../../../services/components/goOrder/getWebId';
import { usePlatform } from '../../../../../hooks/usePlatform';

const waitSeconds = 5;
const SearchList = ({ active }) => {
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [sortKey, setSortKey] = useState('CreateTime');
    const [sortOrder, setSortOrder] = useState('descend');
    const [showMask, setShowMask] = useState(false);
    const [reFetch, setReFetch] = useState(false);

    const currentAccount = useSelector(store => store.user.currentAccount);
    const submitSuccess = useSelector(store => store.goOrderSB.searchListSubmitSuccess);
    const websocketEvent = useSelector(store => store.goOrder.websocketEvent);
    const confirmBox = useSelector(store => store.goOrderSB.confirmBox);
    const platform = usePlatform();
    const dispatch = useDispatch();

    const currentSeconds = useRef(0);
    const timer = useRef(null);

    useEffect(() => {
        if (websocketEvent && !confirmBox && active) {
            if (currentSeconds.current === 0) {
                timer.current = window.setInterval(() => {
                    currentSeconds.current += 1;
                    timerHandler();
                }, 1000);

                dispatch(setWebsocketEvent(false));
                getData(currentAccount);
                setReFetch(false);
            }
        }
    }, [websocketEvent, reFetch, confirmBox, active]);

    const timerHandler = () => {
        if (currentSeconds.current >= waitSeconds) {
            window.clearInterval(timer.current);
            currentSeconds.current = 0;
            setReFetch(true);
        }
    };

    useEffect(() => {
        const newColumns = [
            {
                title: '時間',
                dataIndex: 'CreateTime',
                key: 'CreateTime',
                sorter: (a, b) => {
                    const aTimeArr = a.CreateTime.split(' ');
                    const bTimeArr = b.CreateTime.split(' ');
                    if (Number(aTimeArr[0]) > Number(bTimeArr[0])) {
                        return 1;
                    }
                    if (Number(aTimeArr[0]) < Number(bTimeArr[0])) {
                        return -1;
                    }
                    if (Number(aTimeArr[0]) == Number(bTimeArr[0])) {
                        if (Number(aTimeArr[1]) > Number(bTimeArr[1])) {
                            return 1;
                        } else {
                            return -1;
                        }
                    }
                },
                sortOrder: sortKey === 'CreateTime' && sortOrder,
                render: (text, record) => {
                    const timeArr = text.split(' ');
                    const d = moment(timeArr[0]).format('MM.DD');
                    const timeStr = timeFormatter(timeArr[1], false);
                    const t = timeStr.substring(0, timeStr.lastIndexOf(':'));
                    return (
                        <div style={{ opacity: record.State === '99' ? 0.45 : 1 }}>
                            <p className="item">{d}</p>
                            <p className="item time__str--down">{t}</p>
                        </div>
                    );
                },
            },
            {
                title: '商品',
                dataIndex: 'StockID',
                key: 'StockID',
                sorter: (a, b) => {
                    return sortString(a.name, b.name);
                },
                sortOrder: sortKey === 'StockID' && sortOrder,
                render: (text, record) => {
                    const symbol = text.substring(0, text.lastIndexOf('.'));
                    const priceType = getPriceType(record.PriceType);

                    const icons = goOrderMapping(priceType, record.GTCDate);
                    const marketID = text.split('.').slice(-1).pop();

                    return (
                        <>
                            <div style={{ opacity: record.State === '99' ? 0.45 : 1 }}>
                                <p className="item" style={{ wordBreak: 'break-word' }}>
                                    {record.name}
                                </p>
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
                                                            record.BS === 'B'
                                                                ? themeColor.buyTabColor
                                                                : themeColor.sellTabColor,
                                                        color: 'white',
                                                        padding: '0 3px',
                                                        borderRadius: '2px',
                                                        marginRight: '4px',
                                                    }}
                                                >
                                                    {icon}
                                                </p>
                                            ) : (
                                                <p
                                                    key={'B' + index}
                                                    className="item--down2"
                                                    style={{ display: 'inline-block' }}
                                                >
                                                    {icon + ' >'}
                                                </p>
                                            );
                                        })}
                                    </>
                                )}
                            </div>
                        </>
                    );
                },
            },
            {
                title: '委託價/量',
                dataIndex: 'Price',
                key: 'Price',
                render: (text, record) => {
                    return (
                        <div style={{ opacity: record.State === '99' ? 0.45 : 1 }}>
                            <p className="item" style={{ whiteSpace: 'nowrap' }}>
                                {!isNaN(text) ? parseFloat(text) : 0}
                            </p>
                            <p className="item--down2">{record?.Qoriginal}</p>
                        </div>
                    );
                },
            },
            {
                title: '成交價/量',
                dataIndex: 'AvgPrice',
                key: 'AvgPrice',
                render: (text, record) => {
                    return (
                        <div style={{ opacity: record.State === '99' ? 0.45 : 1 }}>
                            <p className="item" style={{ whiteSpace: 'nowrap' }}>
                                {parseFloat(text) == 0 ? '--' : parseFloat(text)}
                            </p>
                            <p className="item--down2" style={{ whiteSpace: 'nowrap' }}>
                                {parseFloat(record.Qmatched) == 0 ? '--' : parseFloat(record.Qmatched)}
                            </p>
                        </div>
                    );
                },
            },
            {
                title: '狀態',
                dataIndex: 'StateMsg',
                key: 'StateMsg',
                sorter: (a, b) => {
                    let vala = a.StateMsg;
                    let valb = b.StateMsg;
                    return sortString(vala, valb);
                },
                sortOrder: sortKey === 'StateMsg' && sortOrder,
                render: (text, record) => {
                    let showBtn = false;
                    if (record.CanCancel !== 'N' || record.CanModify !== 'N') {
                        showBtn = true;
                    }
                    return (
                        <>
                            {showBtn ? (
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
                                                onClick={() => {
                                                    maskClickHandler();
                                                    Modal.confirm({
                                                        content: '確認刪除此筆資料嗎？',
                                                        onOk: () => {
                                                            cancelSubmitHandler(record, currentAccount);
                                                        },
                                                        okText: '確認',
                                                        cancelText: '取消',
                                                    });
                                                }}
                                            >
                                                刪單
                                            </Button>
                                            {record.CanCancel !== 'N' ? null : (
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
                                            )}
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
                                <div style={{ opacity: record.State === '99' ? 0.45 : 1 }}>
                                    <p className="item" style={{ wordBreak: 'break-all' }}>
                                        {text}
                                    </p>
                                </div>
                            )}
                        </>
                    );
                },
            },
        ];

        setColumns(newColumns);
    }, [sortKey, sortOrder, data, currentAccount]);

    useEffect(() => {
        if (active) {
            getData(currentAccount);
        } else {
            if (timer.current) {
                window.clearInterval(timer.current);
            }
        }
    }, [currentAccount, active]);

    useEffect(() => {
        if (submitSuccess) {
            getData(currentAccount);
        }
    }, [submitSuccess, currentAccount]);

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

    const changeClickHandler = (text, record) => {
        maskClickHandler();
        const symbol = record.StockID.substring(0, record.StockID.lastIndexOf('.'));
        dispatch(setRefreshCode(symbol));
        dispatch(setConfirmBoxChanValInfo(record));

        dispatch(setConfirmBoxOpen(true));
        dispatch(setConfirmBoxTitle('刪改委託單'));
        dispatch(setConfirmBoxColor('#254a91'));
    };

    const cancelSubmitHandler = async (record, currentAccount) => {
        const marketID = record.StockID.split('.').slice(-1).pop();
        try {
            const resVal = await postCancel({
                currentAccount,
                BS: record.BS,
                CID: getWebId(platform, 'recommisiioned'),
                Creator: currentAccount.idno,
                DJCrypt_pwd: record.DJCrypt_pwd != null ? record.DJCrypt_pwd : '',
                Exchid: marketID,
                OID: record.OID,
                OT: '0',
                StockID: record.StockID,
                TT: getTT(marketID),
            });
            dispatch(setSearchListSubmitSuccess(true));
            Modal.info({
                content: resVal,
            });
        } catch (error) {
            message.info({
                content: error,
            });
        }
    };

    const getData = async currentAccount => {
        if (currentAccount != null && currentAccount.accttype != null) {
            if (currentAccount.accttype != 'H') {
                Modal.error({
                    title: '無可用帳號',
                });
                return false;
            }
        } else {
            Modal.error({
                title: '無可用帳號',
            });
            return false;
        }
        try {
            let res = await postQuickSearch({
                AID: currentAccount.broker_id + currentAccount.account,
                orderID: '',
                sort: '-1',
                stockID: '',
                token: getToken(),
            });
            const symbolList = [];
            res = res.map((item, index) => {
                item.key = index;
                const symbol = item.StockID.substring(0, item.StockID.lastIndexOf('.'));
                const marketID = item.StockID.split('.').slice(-1).pop();
                if (marketID !== 'US') {
                    symbolList.push({ exchange: marketID, code: symbol });
                }
                return item;
            });
            getSymbolName(symbolList, res);
            console.log(res, symbolList);
            setData(res);
        } catch (error) {
            console.log(error);
        }
        dispatch(setSearchListSubmitSuccess(false));
    };

    const getSymbolName = async (symbolList, data) => {
        if (symbolList.length > 0) {
            try {
                const res = await postSbcoCode(symbolList);

                let newData = data.map(item => {
                    const symbol = item.StockID.substring(0, item.StockID.lastIndexOf('.'));
                    item.name = symbol;
                    for (let index = 0; index < res.length; index++) {
                        const element = res[index];
                        if (element.code === symbol) {
                            item.name = element.name || symbol;
                            break;
                        }
                    }
                    return item;
                });
                // console.log('data', newData);
                setData(newData);
            } catch (error) {}
        }
    };

    const sortKeyHandler = useCallback(key => {
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
    });

    const rowClickHandler = useCallback((e, record) => {
        if (e.target.innerHTML.indexOf('刪') >= 0 || e.target.innerHTML.indexOf('改') >= 0) {
            return;
        }
        console.log('record', record);
        const symbol = record.StockID.substring(0, record.StockID.lastIndexOf('.'));
        dispatch(setRefreshCode(symbol));
        dispatch(setConfirmBoxChanValInfo(record));
        dispatch(setConfirmBoxOpen(true));
        dispatch(setConfirmBoxTitle('委託明細'));
        dispatch(setConfirmBoxColor('#254a91'));
    });

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

    return (
        <>
            <SearchListTable
                data={data}
                columns={columns}
                sortKeys={['CreateTime', 'StockID', 'StateMsg']}
                left={['', '27%', '92%']}
                sortKeyHandler={sortKeyHandler}
                rowClickHandler={rowClickHandler}
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
            <style global jsx>{`
                .item--down2 {
                    font-weight: normal;
                    margin: 0;
                    font-size: 1.6rem;
                    color: #a9b6cb;
                }
            `}</style>
        </>
    );
};

export default SearchList;
