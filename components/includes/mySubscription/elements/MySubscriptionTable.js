import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { fetchListWithOrderStatus } from '../../../../services/components/mySubscription/fetchListWithOrderStatus';
// import { fetchLoginSubscriptionList } from '../../../../services/components/subscription/getLoginSubScriptionList';
import { getToken } from '../../../../services/user/accessToken';
import AccountTable from '../../tradingAccount/vipInventory/AccountTable';
import { formatNum } from '../../../../services/formatNum';

const MySubscriptionTable = () => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    useEffect(() => {
        getOrderStatus();
    }, [currentAccount]);
    useEffect(() => {
        const myColumns = [
            {
                title: '動作',
                width: '100px',
                dataIndex: 'action',
                key: 'action',
                render(text, record, idx) {
                    return '';
                },
            },
            {
                title: '申購狀態',
                width: '100px',
                dataIndex: 'status',
                key: 'status',
                render(text, record, idx) {
                    return text;
                },
            },
            {
                title: '商品',
                width: '100px',
                dataIndex: 'stockName',
                key: 'stockName',
                render(text, record, idx) {
                    return record.stockId + ' ' + text;
                },
            },
            {
                title: '預扣款金額',
                width: '100px',
                dataIndex: 'orderAmount',
                key: 'orderAmount',
                align: 'right',
                render(text, record, idx) {
                    return formatNum(text);
                },
            },
            {
                title: '申購張數',
                width: '100px',
                dataIndex: 'share',
                key: 'share',
                align: 'right',
                render(text, record, idx) {
                    return Number(text) / 1000;
                },
            },
            {
                title: '暫定承銷價',
                width: '100px',
                dataIndex: 'price',
                key: 'price',
                align: 'right',
                render(text, record, idx) {
                    return text;
                },
            },
            {
                title: '抽籤日',
                width: '100px',
                dataIndex: 'lotDate',
                key: 'lotDate',
                render(text, record, idx) {
                    return moment(text).format('YYYY/MM/DD');
                },
            },
            {
                title: '市場別',
                width: '120px',
                dataIndex: 'marketStatus',
                key: 'marketStatus',
                align: 'right',
                render(text, record, idx) {
                    return text;
                },
            },
        ];
        setColumns(myColumns);
    }, [data]);
    const getOrderStatus = async () => {
        const token = getToken();
        if (token) {
            const res = await fetchListWithOrderStatus(token, currentAccount.broker_id, currentAccount.account);
            const newData = res?.map((element, index) => {
                element.key = index;
                return element;
            });
            setData(newData);
        }
    };
    return (
        <AccountTable
            pagination={true}
            columns={columns}
            dataSource={data}
            expandable={{
                expandedRowRender: record => <p style={{ margin: 0 }}>{'123456'}</p>,
                rowExpandable: record => record.name !== 'Not Expandable',
            }}
        />
    );
};

export default MySubscriptionTable;
