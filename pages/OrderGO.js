import { useEffect, useState } from 'react';

import { PageHead } from '../components/includes/PageHead';
import { Info } from '../components/includes/goOrder/infoArea/Info';
import SolaceClientComponent from '../components/includes/SolaceClientComponent';
import QuotesDetail from '../components/includes/goOrder/quotes/QuotesDetail';
import FiveLatestOffer from '../components/includes/goOrder/quotes/FiveLatestOffer';
const OrderGO = () => {
    const [topic, setTopic] = useState([]);
    const [title, setTitle] = useState('Order GO');
    useEffect(() => {
        setTimeout(() => {
            setTopic(['MKT/*/*/2330/ODDLOT', 'QUT/*/*/2330/ODDLOT', 'SNP/*/*/2330/ODDLOT']);
        }, 2000);
        setTimeout(() => {
            setTopic(['MKT/*/*/0050/ODDLOT', 'QUT/*/*/0050/ODDLOT', 'SNP/*/*/0050/ODDLOT']);
        }, 3000);
        setTimeout(() => {
            setTopic(['MKT/*/*/2345', 'QUT/*/*/2345', 'SNP/*/*/2345']);
        }, 4000);
        setTimeout(() => {
            setTitle('aaaaa');
        }, 9000);
    }, []);
    return (
        <>
            <div>
                <SolaceClientComponent subscribeTopic={topic} />
                <QuotesDetail />
                <FiveLatestOffer />
            </div>
            <style jsx>{``}</style>
        </>
    );
};

OrderGO.getLayout = Page => Page;

export default OrderGO;
