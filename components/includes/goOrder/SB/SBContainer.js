import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import Info from './Info';
import OrderDrawer from './OrderDrawer';
import OrderTab from './sbPanel/OrderTab';
import QuoteContainer from './QuoteContainer';
import { useWindowSize } from '../../../../hooks/useWindowSize';
// code , type ,  productInfo在redux goOrder裡
const SBContainer = () => {
    const panelHeight = useSelector(store => store.goOrder.panelHeight);
    const winSize = useWindowSize();
    const bs = useSelector(store => store.goOrderSB.bs);
    const openContainerHeight = useCallback(() => {
        if (bs === '') {
            return 'auto';
        }
        if (panelHeight > 100) {
            // return '504px';
            return winSize.height - 360 - 44 + 'px';
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
                    <Info />
                    <QuoteContainer />
                </div>
                <OrderDrawer>
                    <OrderTab />
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
