import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer } from 'antd';

import { PageHead } from '../components/includes/PageHead';
import { Info } from '../components/includes/goOrder/infoArea/Info';
import { Header } from '../components/includes/goOrder/header/Header';
import SolaceClientComponent from '../components/includes/SolaceClientComponent';
import QuoteContainer from '../components/includes/goOrder/quotes/QuoteContainer';
import LeadingBtn from '../components/includes/goOrder/LeadingBtn';
import { setPanelHeight } from '../store/goOrder/action';

const OrderGO = () => {
    const [topic, setTopic] = useState([]);
    const [containerHeight, setContainerHeight] = useState(0);
    const [leadingBtnShow, setLeadingBtnShow] = useState(true);
    const [drawerVisible, setDrawerVisible] = useState(false);
    // const [drawerHeight, setDrawerHeight] = useState(300);
    const code = useSelector(store => store.goOrder.code);
    const lot = useSelector(store => store.goOrder.lot);
    const bs = useSelector(store => store.goOrder.bs);
    const panelHeight = useSelector(store => store.goOrder.panelHeight);
    const dispatch = useDispatch();

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

    return (
        <>
            <div className="OrderGO__container" id="container">
                <PageHead title={'快速下單'} />
                <Header />
                <Info />
                <SolaceClientComponent subscribeTopic={topic} only={true} />
                <QuoteContainer />
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
                >
                    <p>Some contents...</p>
                </Drawer>
            </div>
            <LeadingBtn containerHeight={containerHeight} show={leadingBtnShow} />
            <style global jsx>{`
                .ant-drawer-bottom.ant-drawer-open.no-mask {
                    transition: all 0.3s !important;
                }
                .ant-drawer-bottom.ant-drawer-open .ant-drawer-content-wrapper {
                    box-shadow: 0 -6px 16px -8px rgba(0, 0, 0, 0.5), 0 -9px 28px 0 rgba(0, 0, 0, 0.1),
                        0 -12px 48px 16px rgba(0, 0, 0, 0.005);
                    border-radius: 8px;
                }
                .ant-drawer-content {
                    border-radius: 8px;
                }
                .ant-drawer-body {
                    overflow: hidden;
                }
            `}</style>
        </>
    );
};

OrderGO.getLayout = Page => Page;

export default OrderGO;
