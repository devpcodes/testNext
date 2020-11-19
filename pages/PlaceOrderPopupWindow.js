import { useEffect, useRef } from 'react';
import NewWebIframe from '../components/includes/NewWebIframe';
import { PageHead } from '../components/includes/PageHead';
import { checkServer } from '../services/checkServer';
function PlaceOrderPopupWindow() {
    const iframeDom = useRef(null);
    const timer = useRef(null);

    if (!checkServer) {
        timer.current = window.setInterval(setOpener, 200);
    }

    useEffect(() => {
        iframeDom.current.contentWindow.opener = window.opener;
        return () => {
            window.clearInterval(timer.current);
        };
    }, []);

    const setOpener = () => {
        if (iframeDom.current != null) {
            iframeDom.current.contentWindow.opener = window.opener;
        }
    };

    const getIframeDom = dom => {
        iframeDom.current = dom;
    };

    return (
        <>
            <PageHead title={'即時盯盤'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/PlaceOrderPopupWindow`}
                    title="永豐金證券"
                    iHeight={446}
                    getIframeDom={getIframeDom}
                />
            </div>
        </>
    );
}

PlaceOrderPopupWindow.getLayout = Page => Page;

export default PlaceOrderPopupWindow;
