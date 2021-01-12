import { useEffect, useState } from 'react';
import SolaceClientComponent from '../components/includes/SolaceClientComponent';
import QuoteContainer from '../components/includes/goOrder/quotes/QuoteContainer';
const OrderGO = () => {
    const [topic, setTopic] = useState([]);
    const [title, setTitle] = useState('Order GO');
    useEffect(() => {
        setTimeout(() => {
            setTopic(['MKT/*/*/2330', 'QUT/*/*/2330', 'SNP/*/*/2330']);
        }, 2000);
        setTimeout(() => {
            setTopic(['MKT/*/*/0050', 'QUT/*/*/0050', 'SNP/*/*/0050']);
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
                <SolaceClientComponent subscribeTopic={topic} only={true} />
                <QuoteContainer />
            </div>
            <style jsx>{``}</style>
        </>
    );
};

OrderGO.getLayout = Page => Page;

export default OrderGO;
