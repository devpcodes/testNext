import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'antd';
import useSWR from 'swr';
import AccountTable from '../../../vipInventory/AccountTable';
import { postInventoryWithSwr } from '../../../../../../services/components/goOrder/sb/postInventory';
import { getToken } from '../../../../../../services/user/accessToken';
import { postQuerySubBrokerageQuoteWithSwr } from '../../../../../../services/components/tradingAccount/subBrokerage/postQuerySubBrokerageQuote';

const ShareholdingTable = () => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [stockList, setStockList] = useState([]);
    const [error, setError] = useState('');

    const postData = useMemo(() => {
        if (currentAccount.account != null) {
            const postData = {
                AID: currentAccount.broker_id + currentAccount.account,
                token: getToken(),
            };
            return postData;
        } else {
            return {};
        }
    }, [currentAccount]);

    const { data: fetchData } = useSWR([JSON.stringify(postData)], postInventoryWithSwr, {
        onError: (error, key) => {
            Modal.error({
                title: error,
            });
        },
        errorRetryCount: 3,
        focusThrottleInterval: 10000,
        errorRetryInterval: 10000,
    });

    const { data: quoteData } = useSWR([JSON.stringify(stockList)], postQuerySubBrokerageQuoteWithSwr, {
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
            const newStockList = [];
            for (const obj of fetchData) {
                const symbol = obj.StockID.substring(0, obj.StockID.lastIndexOf('.'));
                const exchange = obj.StockID.split('.').slice(-1).pop();
                newStockList.push({
                    exchange,
                    symbol,
                });
            }
            setStockList(newStockList);
        }
    }, [fetchData]);

    useEffect(() => {
        const newData = [];
        if (quoteData) {
            Object.keys(quoteData).forEach(key => {
                newData.push(quoteData[key]);
            });
            newData.map((item, index) => {
                item.key = index;
            });
        }
        setData(newData);
    }, [quoteData]);

    useEffect(() => {
        const newColumns = [
            {
                title: '動作',
                dataIndex: 'active',
                key: 'active',
                width: 100,
                render: (text, record) => {
                    return (
                        <div>
                            <Button>賣出</Button>
                        </div>
                    );
                },
            },
            {
                title: '市場別',
                dataIndex: 'market',
                key: 'market',
                width: 100,
                render: (text, record) => {
                    return <div>{text}</div>;
                },
            },
            {
                title: '股票名稱',
                dataIndex: 'market',
                key: 'market',
                width: 100,
                render: (text, record) => {
                    return <div>{text}</div>;
                },
            },
            {
                title: '可用庫存',
                dataIndex: 'market',
                key: 'market',
                width: 100,
                render: (text, record) => {
                    return <div>{text}</div>;
                },
            },
            {
                title: '委託股數',
                dataIndex: 'market',
                key: 'market',
                width: 100,
                render: (text, record) => {
                    return <div>{text}</div>;
                },
            },
            {
                title: '價格',
                dataIndex: 'market',
                key: 'market',
                width: 100,
                render: (text, record) => {
                    return <div>{text}</div>;
                },
            },
            {
                title: '類別',
                dataIndex: 'market',
                key: 'market',
                width: 100,
                render: (text, record) => {
                    return <div>{text}</div>;
                },
            },
            {
                title: '長效單',
                dataIndex: 'market',
                key: 'market',
                width: 100,
                render: (text, record) => {
                    return <div>{text}</div>;
                },
            },
            {
                title: '幣別',
                dataIndex: 'market',
                key: 'market',
                width: 100,
                render: (text, record) => {
                    return <div>{text}</div>;
                },
            },
        ];
        setColumns(newColumns);
    }, [data]);
    return (
        <div>
            <AccountTable
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
        </div>
    );
};

export default ShareholdingTable;
