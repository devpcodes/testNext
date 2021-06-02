import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import CaHead from '../components/includes/CaHead';
import { PageHead } from '../components/includes/PageHead';
import Header from '../components/includes/goOrder/header/Header';
import SolaceClientComponent from '../components/includes/SolaceClientComponent';
import LeadingBtn from '../components/includes/goOrder/LeadingBtn';
import { checkLogin } from '../services/components/layouts/checkLogin';
import { StockContainer } from '../components/includes/goOrder/StockContainer';

export async function getServerSideProps(context) {
    let requestStockId;
    if (context.req.query != null) {
        if (context.req.query.stockid != null) {
            requestStockId = context.req.query.stockid;
            return {
                props: { requestStockId },
            };
        }
    }
    return {
        props: {},
    };
}

const OrderGO = ({ requestStockId }) => {
    const [topic, setTopic] = useState([]);
    const [containerHeight, setContainerHeight] = useState(0);
    const [leadingBtnShow, setLeadingBtnShow] = useState(true);
    const code = useSelector(store => store.goOrder.code);
    const lot = useSelector(store => store.goOrder.lot);
    const bs = useSelector(store => store.goOrder.bs);
    const currentAccount = useSelector(store => store.user.currentAccount);
    const checkLot = useSelector(store => store.goOrder.checkLot);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (code === '') {
            setTopic([]);
        }
        if (lot === 'Odd') {
            if (!checkLot) {
                return;
            } else {
                setTopic([`MKT/*/*/${code}/ODDLOT`, `QUT/*/*/${code}/ODDLOT`, `SNP/*/*/${code}/ODDLOT`]);
            }
        } else {
            setTopic([`MKT/*/*/${code}`, `QUT/*/*/${code}`, `SNP/*/*/${code}`]);
        }
    }, [lot, code, checkLot]);

    useEffect(() => {
        if (bs !== '') {
            setLeadingBtnShow(false);
        }
    }, [bs]);

    useEffect(() => {
        let elHeight = document.getElementById('container').clientHeight;
        setContainerHeight(elHeight);
    });

    const handleResize = () => {
        let elHeight = document.getElementById('container').clientHeight;
        setContainerHeight(elHeight);
    };

    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.gstatic.com"></link>
                <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"></link>
            </Head>
            <div className="OrderGO__container" id="container">
                <CaHead />
                <PageHead title={'快速下單'} />
                {checkLogin() && <SolaceClientComponent subscribeTopic={topic} idno={currentAccount.idno} />}
                {!checkLogin() && <SolaceClientComponent subscribeTopic={topic} idno={''} />}
                <Header />
                <StockContainer requestStockId={requestStockId} />
            </div>
            <LeadingBtn containerHeight={containerHeight} show={leadingBtnShow} />
            <style global jsx>{`
                * {
                    font-family: 'Roboto', Arial, '儷黑 Pro', 'LiHei Pro', '微軟正黑體', 'Microsoft JhengHei',
                        sans-serif;
                }
                * {
                    -webkit-overflow-scrolling: auto !important;
                }
            `}</style>
        </>
    );
};

OrderGO.getLayout = Page => Page;

export default OrderGO;
