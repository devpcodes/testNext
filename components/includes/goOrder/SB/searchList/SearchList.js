import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'antd';
import moment from 'moment';
import { postQuickSearch } from '../../../../../services/components/goOrder/sb/postQuickSearch';
import { timeFormatter } from '../../../../../services/timeFormatter';
import { getToken } from '../../../../../services/user/accessToken';
import SearchListTable from './SearchListTable';
import { getPriceType, goOrderMapping } from '../../../../../services/components/goOrder/sb/dataMapping';
import { themeColor } from '../../panel/PanelTabs';
import {
    setConfirmBoxChanValInfo,
    setConfirmBoxColor,
    setConfirmBoxOpen,
    setConfirmBoxTitle,
} from '../../../../../store/goOrderSB/action';

const SearchList = () => {
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [sortKey, setSortKey] = useState('CreateTime');
    const [sortOrder, setSortOrder] = useState('descend');
    const currentAccount = useSelector(store => store.user.currentAccount);
    const dispatch = useDispatch();
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
                        <div style={{ opacity: record.status_code === '4' ? 0.45 : 1 }}>
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
                    return sortString(a.StockID, b.StockID);
                },
                sortOrder: sortKey === 'StockID' && sortOrder,
                render: (text, record) => {
                    const symbol = text.substring(0, text.lastIndexOf('.'));
                    const priceType = getPriceType(record.PriceType);

                    const icons = goOrderMapping(priceType, record.GTCDate);
                    const marketID = text.split('.').slice(-1).pop();

                    return (
                        <>
                            <div style={{ opacity: record.status_code === '4' ? 0.45 : 1 }}>
                                <p className="item" style={{ wordBreak: 'break-word' }}>
                                    {symbol}
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
                        <div style={{ opacity: record.status_code === '4' ? 0.45 : 1 }}>
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
                        <div style={{ opacity: record.status_code === '4' ? 0.45 : 1 }}>
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
                    return (
                        <div style={{ opacity: record.status_code === '4' ? 0.45 : 1 }}>
                            <p className="item" style={{ wordBreak: 'break-all' }}>
                                {text}
                            </p>
                        </div>
                    );
                },
            },
        ];

        setColumns(newColumns);
    }, [sortKey, sortOrder]);

    useEffect(() => {
        getData(currentAccount);
    }, [currentAccount]);

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
            res = res.map((item, index) => {
                item.key = index;
                return item;
            });
            console.log(res);
            setData(res);
        } catch (error) {
            console.log(error);
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
        console.log('record', record);
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
