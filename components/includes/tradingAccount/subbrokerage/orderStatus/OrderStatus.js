import { useEffect, useMemo, useState } from 'react';
import { Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import useSWR from 'swr';
import { postQuickSearchWithSwr } from '../../../../../services/components/goOrder/sb/postQuickSearch';
import { getToken } from '../../../../../services/user/accessToken';
import AccountTable from '../../vipInventory/AccountTable';
const OrderStatus = () => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [data, setData] = useState([]);
    const postData = useMemo(() => {
        if (currentAccount.account != null) {
            const postData = {
                AID: currentAccount.broker_id + currentAccount.account,
                orderID: '',
                sort: '-1',
                stockID: '',
                token: getToken(),
            };
            return postData;
        } else {
            return {};
        }
    }, [currentAccount]);

    const { data: fetchData } = useSWR([JSON.stringify(postData)], postQuickSearchWithSwr, {
        onError: (error, key) => {
            Modal.error({
                title: error,
            });
        },
        errorRetryCount: 3,
        focusThrottleInterval: 10000,
        errorRetryInterval: 10000,
    });

    useEffect(() => {
        if (Array.isArray(fetchData)) {
            const newData = fetchData.map((item, index) => {
                item.key = index;
                return item;
            });
            setData(newData);
        }
    }, [fetchData]);

    return (
        <div>
            <AccountTable dataSource={data} pagination={false} />
        </div>
    );
};

export default OrderStatus;
