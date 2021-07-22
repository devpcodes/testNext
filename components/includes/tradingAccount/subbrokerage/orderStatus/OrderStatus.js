import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useSWR from 'swr';
const OrderStatus = () => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    // const { data: fetchData } = useSWR(
    //     [JSON.stringify(postData)],
    //     orderStatusQueryFetcherWithSWR,
    //     {
    //         onError: (error, key) => {
    //             Modal.error({
    //                 title: '伺服器錯誤',
    //             });
    //             setError('伺服器錯誤');
    //         },
    //         errorRetryCount: 3,
    //         focusThrottleInterval: 10000,
    //         errorRetryInterval: 10000,
    //     },
    // );
    const getData = async () => {};
    return <div>123</div>;
};

export default OrderStatus;
