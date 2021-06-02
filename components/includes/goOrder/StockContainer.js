import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer } from 'antd';
import { Info } from './infoArea/Info';
import QuoteContainer from './quotes/QuoteContainer';
import OrderConfirmBox from './OrderConfirmBox';
import PanelTabs from './panel/PanelTabs';
import MyTransition from '../myTransition';
import { setPanelHeight } from '../../../store/goOrder/action';
import { useWindowSize } from '../../../hooks/useWindowSize';

import arrow from '../../../resources/images/components/goOrder/arrow-chevron-down.png';
export const StockContainer = ({ requestStockId }) => {
    const dispatch = useDispatch();
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [heightStyle, setHeightStyle] = useState({ height: 'auto' });

    const confirmBox = useSelector(store => store.goOrder.confirmBox);
    const confirmBoxTitle = useSelector(store => store.goOrder.confirmBoxTitle);
    const confirmBoxColor = useSelector(store => store.goOrder.confirmBoxColor);
    const bs = useSelector(store => store.goOrder.bs);
    const panelHeight = useSelector(store => store.goOrder.panelHeight);

    const winSize = useWindowSize();

    const checkCA = useSelector(store => store.goOrder.checkCA);
    const isLogin = useSelector(store => store.user.isLogin);
    useEffect(() => {
        if (bs !== '') {
            setTimeout(() => {
                setDrawerVisible(true);
            }, 0);
        }
    }, [bs]);

    const openContainerHeight = () => {
        if (bs === '') {
            return 'auto';
        }
        if (panelHeight == 360) {
            // if (isLogin && checkCA) {
            //     return '288px';
            // } else {
            //     return '288px';
            // }

            return winSize.height - 360 - 44 + 'px'; // 345px
        } else {
            return 'auto';
        }
    };
    // useEffect(() => {
    //     if (bs === '') {
    //         return setHeightStyle({ height: 'auto' });
    //     }
    //     if (panelHeight == 360) {
    //         setTimeout(() => {
    //             setHeightStyle({ height: `${winSize.height - 360 - 44}` + 'px' });
    //         }, 100);
    //     } else {
    //         setTimeout(() => {
    //             setHeightStyle({ height: 'auto' });
    //         }, 100);
    //     }
    // }, [panelHeight, bs, winSize]);
    // const setHeightStyle = () => {
    //     if (bs === '') {
    //         return setHeightStyle({height: 'auto'});
    //     }
    //     if (panelHeight == 360) {
    //         // if (isLogin && checkCA) {
    //         //     return '348px';
    //         // } else {
    //         //     return '348px';
    //         // }
    //         setTimeout(() => {
    //             setHeightStyle({height: `${winSize.height - 360 - 44}` + 'px'})
    //             // return {height: `${winSize.height - 360 - 44}` + 'px'} // 345px
    //         }, 100);

    //     } else {
    //         setTimeout(() => {
    //             setHeightStyle({height: 'auto'})
    //         }, 100);

    //     }
    // }
    return (
        <>
            <div className="open__container">
                <Info stockid={requestStockId} />
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
                            transform: panelHeight == 360 ? 'rotate(180deg)' : 'rotate(0)',
                            marginRight: '-3px',
                        }}
                        src={arrow}
                    />
                }
                className="OrderGO__drawer"
            >
                <PanelTabs />
                <MyTransition isVisible={confirmBox} classNames={'loginMobile2'}>
                    <OrderConfirmBox title={confirmBoxTitle} color={confirmBoxColor} />
                </MyTransition>
            </Drawer>
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
