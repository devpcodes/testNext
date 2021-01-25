import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { PageHead } from '../components/includes/PageHead';
import { Info } from '../components/includes/goOrder/infoArea/Info';
import { Header } from '../components/includes/goOrder/header/Header';
import SolaceClientComponent from '../components/includes/SolaceClientComponent';
import QuoteContainer from '../components/includes/goOrder/quotes/QuoteContainer';
import LeadingBtn from '../components/includes/goOrder/LeadingBtn';

const OrderGO = () => {
    const [topic, setTopic] = useState([]);
    const [containerHeight, setContainerHeight] = useState(0);
    const code = useSelector(store => store.goOrder.code);
    const lot = useSelector(store => store.goOrder.lot);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (lot === 'Odd') {
            setTopic([`MKT/*/*/${code}/ODDLOT`, `QUT/*/*/${code}/ODDLOT`, `SNP/*/*/${code}/ODDLOT`]);
        } else {
            setTopic([`MKT/*/*/${code}`, `QUT/*/*/${code}`, `SNP/*/*/${code}`]);
        }
    }, [lot, code]);

    useEffect(() => {
        console.log('loaded...');
        let elHeight = document.getElementById('container').clientHeight;
        setContainerHeight(elHeight);
    });

    const handleResize = () => {
        let elHeight = document.getElementById('container').clientHeight;
        setContainerHeight(elHeight);
    };

    return (
        <>
            <div id="container">
                <PageHead title={'快速下單'} />
                <Header />
                <Info />
                <SolaceClientComponent subscribeTopic={topic} only={true} />
                <QuoteContainer />
            </div>
            <LeadingBtn containerHeight={containerHeight} />
            <style jsx>{``}</style>
        </>
    );
};

OrderGO.getLayout = Page => Page;

export default OrderGO;
