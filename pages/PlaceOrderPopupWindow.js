import { useEffect, useRef } from 'react';
import NewWebIframe from '../components/includes/NewWebIframe';
import { PageHead } from '../components/includes/PageHead';

function PlaceOrderPopupWindow() {
    const iframeDom = useRef(null);
    const source = useRef(null);

    useEffect(() => {
        window.addEventListener('message', messageEventHandler);

        return () => {
            window.removeEventListener('message', messageEventHandler);
        };
    }, []);

    const messageEventHandler = e => {
        if (e.data.optionList != null) {
            iframeDom.current.contentWindow.postMessage(e.data, '*');
            source.current = e.source;
        }
        if (e.data.optionList == null) {
            if (e.data.product != null) {
                source.current.postMessage(e.data, '*');
                window.close();
            }
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

PlaceOrderPopupWindow.getLayout = page => (
    <>
        <PlaceOrderPopupWindow>{page}</PlaceOrderPopupWindow>
    </>
);

export default PlaceOrderPopupWindow;
