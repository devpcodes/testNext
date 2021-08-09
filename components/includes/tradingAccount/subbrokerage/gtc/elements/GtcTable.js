import { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'antd';
import moment from 'moment';
import useSWR from 'swr';
import {
    postQueryGtc,
    postQueryGtcWithSwr,
} from '../../../../../../services/components/tradingAccount/subBrokerage/postQueryGTC';
import { getToken } from '../../../../../../services/user/accessToken';
import AccountTable from '../../../vipInventory/AccountTable';
import ControlBtns from '../../orderStatus/elements/ControlBtns';
import { useCheckMobile } from '../../../../../../hooks/useCheckMobile';
import {
    currencyChName,
    getPriceType,
    goOrderMapping,
    marketName,
} from '../../../../../../services/components/goOrder/sb/dataMapping';
import { themeColor } from '../../../../goOrder/panel/PanelTabs';
import { formatNum } from '../../../../../../services/formatNum';
import { timeFormatter } from '../../../../../../services/timeFormatter';

const GtcTable = ({ controlReload }) => {
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [reload, setReload] = useState(0);
    const currentAccount = useSelector(store => store.user.currentAccount);
    const isMobile = useCheckMobile();
    const postData = useMemo(() => {
        if (currentAccount.account != null) {
            const postData = {
                AID: currentAccount.broker_id + currentAccount.account,
                orderNo: '',
                query_type: '1',
                sDate: '',
                token: getToken(),
            };
            return postData;
        } else {
            return null;
        }
    }, [currentAccount]);

    const { data: fetchData } = useSWR([JSON.stringify(postData), reload], postQueryGtcWithSwr, {
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
        const newColumns = [
            {
                title: '動作',
                dataIndex: 'active',
                key: 'active',
                // fixed: !isMobile ? 'left' : 'auto',
                align: 'center',
                width: 80,
                render: (text, record) => {
                    return (
                        <div style={{ opacity: record.State === '99' ? 0.45 : 1 }}>
                            <ControlBtns
                                BS={record.BS}
                                CanModify={record.CanModify}
                                CanCancel={record.CanCancel}
                                data={record}
                                successHandler={successHandler}
                            />
                        </div>
                    );
                },
            },
            {
                title: '狀態',
                dataIndex: 'StateMesg',
                key: 'StateMesg',
                // fixed: !isMobile ? 'left' : 'auto',
                align: 'center',
                width: 100,
                // ...getColumnSearchProps('StateMsg'),
                render: (text, record) => {
                    return <div style={{ opacity: record.State === '99' ? 0.45 : 1 }}>{text}</div>;
                },
            },
            {
                title: '市場',
                dataIndex: 'market',
                key: 'market',
                // fixed: !isMobile ? 'left' : 'auto',
                width: 100,
                // ...getColumnSearchProps('market'),
                render: (text, record) => {
                    const marketID = record.StockID.split('.').slice(-1).pop();
                    const market = marketName(marketID).name;
                    return <div style={{ opacity: record.State === '99' ? 0.45 : 1 }}>{market}</div>;
                },
            },
            {
                title: '商品',
                dataIndex: 'StockID',
                key: 'StockID',
                // fixed: !isMobile ? 'left' : 'auto',
                width: 100,
                render: (text, record) => {
                    const symbol = text.substring(0, text.lastIndexOf('.'));
                    return <div style={{ opacity: record.State === '99' ? 0.45 : 1 }}>{symbol}</div>;
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
                    const icons = goOrderMapping(priceType, record.GtcDate);
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
                title: '價格',
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
                title: '數量',
                dataIndex: 'Qcurrent',
                key: 'Qcurrent',
                align: 'right',
                width: 100,
                render: (text, record) => {
                    return <span style={{ opacity: record.State === '99' ? 0.45 : 1 }}>{text}</span>;
                },
            },
            {
                title: '截止日',
                dataIndex: 'GtcDate',
                key: 'GtcDate',
                align: 'center',
                width: 100,
                render: (text, record) => {
                    const dateTime = moment(text).format('YYYY/MM/DD');
                    return <span style={{ opacity: record.State === '99' ? 0.45 : 1 }}>{dateTime}</span>;
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
                title: '觸發價格',
                dataIndex: 'TouchedPrice',
                key: 'TouchedPrice',
                // ...getColumnSearchProps('TouchedPrice'),
                align: 'center',
                width: 100,
                render: (text, record) => {
                    return <span style={{ opacity: record.State === '99' ? 0.45 : 1 }}>{getTouchPrice(record)}</span>;
                },
            },
            {
                title: '來源',
                dataIndex: 'Source',
                key: 'Source',
                align: 'center',
                width: 100,
                render: (text, record) => {
                    return <span style={{ opacity: record.State === '99' ? 0.45 : 1 }}>{text || '--'}</span>;
                },
            },
            {
                title: '委託時間',
                dataIndex: 'CreateTime',
                key: 'CreateTime',
                align: 'center',
                width: 130,
                render: (text, record) => {
                    const time = getTimerHandler(record);
                    const timeArr = time.split(' ');
                    return (
                        <div style={{ opacity: record.State === '99' ? 0.45 : 1 }}>
                            <p style={{ marginBottom: 0 }}>{timeArr[0]}</p>
                            <p style={{ marginBottom: 0, textAlign: 'center' }}>{timeArr[1]}</p>
                        </div>
                    );
                },
            },
            {
                title: '幣別',
                dataIndex: 'Currency',
                key: 'Currency',
                align: 'left',
                width: 90,
                render: (text, record) => {
                    return <span style={{ opacity: record.State === '99' ? 0.45 : 1 }}>{currencyChName(text)}</span>;
                },
            },
        ];
        setColumns(newColumns);
    }, []);

    useEffect(() => {
        if (Array.isArray(fetchData)) {
            setError('');
            const newData = fetchData.map((item, index) => {
                item.key = index;
                return item;
            });
            setData(newData);
        }
    }, [fetchData]);

    const successHandler = () => {
        setReload(prev => {
            return (prev += 1);
        });
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

    return (
        <AccountTable
            scroll={{ x: 780, y: 600 }}
            columns={columns}
            dataSource={data}
            pagination={false}
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
                spinning: (fetchData == null && !error) || controlReload != 0 ? true : false,
            }}
        />
    );
};
export default GtcTable;
