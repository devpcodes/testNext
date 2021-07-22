import { useEffect } from 'react';
const OrderStatus = () => {
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {};
    return <div>123</div>;
};

export default OrderStatus;
