import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer } from 'antd';
// import dynamic from 'next/dynamic';
import CaHead from '../components/includes/CaHead';
import { PageHead } from '../components/includes/PageHead';
import { Info } from '../components/includes/goOrder/infoArea/Info';
import Header from '../components/includes/goOrder/header/Header';
import SolaceClientComponent from '../components/includes/SolaceClientComponent';
import QuoteContainer from '../components/includes/goOrder/quotes/QuoteContainer';
import LeadingBtn from '../components/includes/goOrder/LeadingBtn';
import { setPanelHeight } from '../store/goOrder/action';
import PanelTabs from '../components/includes/goOrder/panel/PanelTabs';
import arrow from '../resources/images/components/goOrder/arrow-chevron-down.png';
import { useWindowSize } from '../hooks/useWindowSize';
import OrderConfirmBox from '../components/includes/goOrder/OrderConfirmBox';
import MyTransition from '../components/includes/myTransition';
import { checkLogin } from '../services/components/layouts/checkLogin';

// const Chart = dynamic(() => import('../components/includes/goOrder/chart/chart'), { ssr: false });

const OrderGO = () => {
    const [topic, setTopic] = useState([]);
    const [containerHeight, setContainerHeight] = useState(0);
    const [leadingBtnShow, setLeadingBtnShow] = useState(true);
    const [drawerVisible, setDrawerVisible] = useState(false);
    // const [drawerHeight, setDrawerHeight] = useState(300);
    const code = useSelector(store => store.goOrder.code);
    const lot = useSelector(store => store.goOrder.lot);
    const bs = useSelector(store => store.goOrder.bs);
    const confirmBox = useSelector(store => store.goOrder.confirmBox);
    const confirmBoxTitle = useSelector(store => store.goOrder.confirmBoxTitle);
    const confirmBoxColor = useSelector(store => store.goOrder.confirmBoxColor);
    const currentAccount = useSelector(store => store.user.currentAccount);
    const productInfo = useSelector(store => store.goOrder.productInfo);
    const checkLot = useSelector(store => store.goOrder.checkLot);

    const panelHeight = useSelector(store => store.goOrder.panelHeight);
    const dispatch = useDispatch();
    const winSize = useWindowSize();
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
            setTimeout(() => {
                setDrawerVisible(true);
            }, 0);
        }
    }, [bs]);

    useEffect(() => {
        console.log('loaded...');
        let elHeight = document.getElementById('container').clientHeight;
        setContainerHeight(elHeight);
    });

    const handleResize = () => {
        let elHeight = document.getElementById('container').clientHeight;
        setContainerHeight(elHeight);
    };

    const openContainerHeight = () => {
        if (bs === '') {
            return 'auto';
        }

        if (panelHeight == 360) {
            return winSize.height - 360 - 44 + 'px';
        } else {
            return 'auto';
        }
    };

    return (
        <>
            <div className="OrderGO__container" id="container">
                <CaHead />
                <PageHead title={'快速下單'} />
                {checkLogin() && <SolaceClientComponent subscribeTopic={topic} idno={currentAccount.idno} />}
                {!checkLogin() && <SolaceClientComponent subscribeTopic={topic} idno={''} />}
                <Header />
                <div className="open__container">
                    <Info />
                    <QuoteContainer />
                </div>
                <Drawer
                    closable={true}
                    visible={drawerVisible}
                    placement={'bottom'}
                    mask={false}
                    onClose={() => {
                        if (panelHeight == 80) {
                            dispatch(setPanelHeight(360));
                        } else {
                            dispatch(setPanelHeight(80));
                        }
                    }}
                    height={panelHeight}
                    closeIcon={
                        <img
                            style={{
                                marginTop: '-4px',
                                transform: panelHeight == 360 ? 'rotate(0)' : 'rotate(180deg)',
                                marginRight: '-3px',
                            }}
                            src={arrow}
                        />
                    }
                >
                    {/* <div style={{display: confirmBox ? 'none' : 'block'}}>
                        <PanelTabs />
                    </div> */}
                    <PanelTabs />
                    <MyTransition isVisible={confirmBox} classNames={'loginMobile2'}>
                        <OrderConfirmBox title={confirmBoxTitle} color={confirmBoxColor} />
                    </MyTransition>
                </Drawer>
            </div>
            {/* <chart /> */}
            <LeadingBtn containerHeight={containerHeight} show={leadingBtnShow} />
            <style jsx>{`
                .open__container {
                    height: ${openContainerHeight()};
                    overflow: auto;
                }
            `}</style>
            <style global jsx>{`
                .ant-drawer-bottom.ant-drawer-open.no-mask {
                    transition: all 0.3s !important;
                }
                .ant-drawer-bottom.ant-drawer-open .ant-drawer-content-wrapper {
                    box-shadow: 0 -6px 16px -8px rgba(0, 0, 0, 0.5), 0 -9px 28px 0 rgba(0, 0, 0, 0.1),
                        0 -12px 48px 16px rgba(0, 0, 0, 0.005);
                    /* border-radius: 8px; */
                    border-top-right-radius: 8px;
                    border-top-left-radius: 8px;
                }
                .ant-drawer-content {
                    border-top-right-radius: 8px;
                    border-top-left-radius: 8px;
                    overflow: hidden;
                }
                .ant-drawer-body {
                    overflow: hidden;
                    padding: 0;
                    padding-top: 14px;
                }
            `}</style>
        </>
    );
};

OrderGO.getLayout = Page => Page;

export default OrderGO;
