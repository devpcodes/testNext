import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import CaHead from '../components/includes/CaHead';
import { PageHead } from '../components/includes/PageHead';
import Header from '../components/includes/goOrder/header/Header';
import SolaceClientComponent from '../components/includes/SolaceClientComponent';
import LeadingBtn from '../components/includes/goOrder/LeadingBtn';
import { checkLogin } from '../services/components/layouts/checkLogin';
import { StockContainer } from '../components/includes/goOrder/StockContainer';
import SBContainer from '../components/includes/goOrder/SB/SBContainer';
import { setProductInfo, setType } from '../store/goOrder/action';
export async function getServerSideProps(context) {
    let requestStockId;
    let requestType;
    if (context.req.query != null) {
        const obj = {};
        if (context.req.query.stockid != null) {
            if (context.req.query.type == null) {
                requestStockId = context.req.query.stockid;
                obj.requestStockIdS = requestStockId;
            }
            if (context.req.query.type === 'S') {
                requestStockId = context.req.query.stockid;
                obj.requestStockIdS = requestStockId;
            }

            if (context.req.query.type === 'H') {
                requestStockId = context.req.query.stockid;
                obj.requestStockIdH = requestStockId;
            }

            //requestStockId = context.req.query.stockid;
        }
        if (context.req.query.type != null) {
            requestType = context.req.query.type;
            obj.requestType = requestType;
        }
        return {
            props: obj,
        };
    }
    return {
        props: {},
    };
}

const OrderGO = ({ requestStockIdS, requestType, requestStockIdH }) => {
    const [topic, setTopic] = useState([]);
    const [containerHeight, setContainerHeight] = useState(0);
    const [leadingBtnShow, setLeadingBtnShow] = useState(true);
    const code = useSelector(store => store.goOrder.code);
    const lot = useSelector(store => store.goOrder.lot);
    const bs = useSelector(store => store.goOrder.bs);
    const currentAccount = useSelector(store => store.user.currentAccount);
    const checkLot = useSelector(store => store.goOrder.checkLot);
    const type = useSelector(store => store.goOrder.type);
    const solaceInit = useSelector(store => store.goOrder.solaceInit);
    const init = useRef(false);
    const dispatch = useDispatch();
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        //solaceInit 訂閱到一半被中斷會有bug，所以等它初始化完成
        if (requestType != null && solaceInit && !init.current) {
            init.current = true;
            dispatch(setType(requestType));
        }
    }, [requestType, solaceInit]);

    useEffect(() => {
        if (type === 'S') {
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
        }
    }, [lot, code, checkLot, type]);

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
                {checkLogin() && type === 'S' && (
                    <SolaceClientComponent subscribeTopic={topic} idno={currentAccount?.idno} />
                )}
                {!checkLogin() && type === 'S' && <SolaceClientComponent subscribeTopic={topic} idno={''} />}
                <Header />
                {type === 'S' && <StockContainer requestStockId={requestStockIdS} />}
                {type === 'H' && <SBContainer requestStockId={requestStockIdH} />}
            </div>
            <LeadingBtn containerHeight={containerHeight} show={leadingBtnShow} />
            <style global jsx>{`
                * {
                    font-family: 'Roboto', Arial, '儷黑 Pro', 'LiHei Pro', '微軟正黑體', 'Microsoft JhengHei',
                        sans-serif;
                }
                body {
                    overflow: hidden;
                    position: fixed;
                }
                /* * {
                    -webkit-overflow-scrolling: auto !important;
                } */
            `}</style>
        </>
    );
};

OrderGO.getLayout = Page => Page;

export default OrderGO;
