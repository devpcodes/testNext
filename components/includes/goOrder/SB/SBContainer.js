import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import Info from './Info';
import OrderDrawer from './OrderDrawer';
import OrderTab from './sbPanel/OrderTab';
import QuoteContainer from './QuoteContainer';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import OrderConfirmBox from './OrderConfirmBox';
import MyTransition from '../../myTransition';
// code , type ,  productInfo在redux goOrder裡
const SBContainer = ({ requestStockId }) => {
    const panelHeight = useSelector(store => store.goOrder.panelHeight);
    const winSize = useWindowSize();
    const bs = useSelector(store => store.goOrderSB.bs);
    const confirmBox = useSelector(store => store.goOrderSB.confirmBox);
    const confirmBoxTitle = useSelector(store => store.goOrderSB.confirmBoxTitle);
    const confirmBoxColor = useSelector(store => store.goOrderSB.confirmBoxColor);
    const openContainerHeight = useCallback(() => {
        if (bs === '') {
            return 'auto';
        }
        if (panelHeight > 100) {
            // return '504px';
            return winSize.height - 400 - 44 + 'px';
        } else {
            return 'auto';
        }
    }, [panelHeight, bs, winSize]);
    return (
        <>
            <div className="SB__container">
                {/* <InstallWebCA getCheckCA={getCheckCA} />
                {checkCA && <UpdateBar text={'請手動點擊更新，刷新報價'} />} */}
                <div className="open__container">
                    <Info stockid={requestStockId} />
                    <QuoteContainer />
                </div>
                <OrderDrawer>
                    <OrderTab />
                    <MyTransition isVisible={confirmBox} classNames={'loginMobile2'}>
                        <OrderConfirmBox title={confirmBoxTitle} color={confirmBoxColor} />
                    </MyTransition>
                </OrderDrawer>
            </div>
            <style jsx>{`
                .open__container {
                    height: ${openContainerHeight()};
                    overflow: auto;
                }
            `}</style>
        </>
    );
};

export default SBContainer;
