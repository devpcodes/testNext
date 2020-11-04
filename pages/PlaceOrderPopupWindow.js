import { useEffect, useRef } from 'react';
import NewWebIframe from '../components/includes/NewWebIframe';
import { PageHead } from '../components/includes/PageHead';

function PlaceOrderPopupWindow() {
    const iframeDom = useRef(null);
    // const source = useRef(null);

    useEffect(() => {
        // source.current = window.opener;
        iframeDom.current.contentWindow.opener = window.opener;
        console.log(`source:`, iframeDom.current.contentWindow.opener);
        console.log(`window.opener:`, window.opener);
    }, []);

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
