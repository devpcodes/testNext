import { useEffect, useState, useMemo } from 'react';
import { Modal } from 'antd';
import useSWR from 'swr';
import { useSelector } from 'react-redux';
import { orderStatusQueryFetcher } from '../../../../services/components/goOrder/orderStatusQueryFetcher';
import AccountTable from '../vipInventory/AccountTable';
import { getToken } from '../../../../services/user/accessToken';

const VipOrderStatusTable = () => {
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const userInfo = useSelector(store => store.user.currentAccount);
    const postData = useMemo(() => {
        if (userInfo.account != null) {
            const account = userInfo.account;
            const action = 'account';
            const broker_id = userInfo.broker_id;
            const stock_id = '';
            const token = getToken();
            const user_id = userInfo.idno;
            return {
                account,
                action,
                broker_id,
                stock_id,
                token,
                user_id,
            };
        } else {
            return {};
        }
    }, [userInfo]);
    const { data: fetchData } = useSWR([postData], orderStatusQueryFetcher, {
        onError: (error, key) => {
            Modal.error({
                title: '伺服器錯誤',
            });
            setError('伺服器錯誤');
        },
        errorRetryCount: 3,
        focusThrottleInterval: 10000,
        errorRetryInterval: 10000,
    });
    useEffect(() => {
        setData(fetchData);
    }, [fetchData]);
    useEffect(() => {
        const newColumns = [
            {
                title: '動作',
                dataIndex: 'active',
                key: 'active',
            },
            {
                title: '狀態',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: '商品',
                dataIndex: 'name_zh',
                key: 'name_zh',
                render: (text, record) => {
                    return record.stock_id + ' ' + (record.name_zh || '');
                },
            },
            {
                title: '買賣',
                dataIndex: 'buySell',
                key: 'buySell',
            },
            {
                title: '條件',
                dataIndex: 'time_in_force',
                key: 'time_in_force',
            },
            {
                title: '委託價',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: '委託量',
                dataIndex: 'qty',
                key: 'qty',
            },
            {
                title: '取消量',
                dataIndex: 'cancel_qty',
                key: 'cancel_qty',
            },
            {
                title: '成交價',
                dataIndex: 'match_price',
                key: 'match_price',
            },
            {
                title: '成交量',
                dataIndex: 'match_qty',
                key: 'match_qty',
            },
            {
                title: '剩餘量',
                dataIndex: 'last_qty',
                key: 'last_qty',
                render: (text, record) => {
                    return <>{record.qty - record.cancel_qty}</>;
                },
            },
            {
                title: '委託書號',
                dataIndex: 'ord_no',
                key: 'ord_no',
            },
            {
                title: '網路單號',
                dataIndex: 'sord_seq',
                key: 'sord_seq',
            },
        ];
        setColumns(newColumns);
    }, []);
    return (
        <>
            <AccountTable scroll={{ x: 780 }} columns={columns} dataSource={data} />
        </>
    );
};

export default VipOrderStatusTable;
