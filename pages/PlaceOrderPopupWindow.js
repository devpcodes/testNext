import { useEffect, useRef } from 'react';
import NewWebIframe from '../components/includes/NewWebIframe';
import { PageHead } from '../components/includes/PageHead';
import { useRouter } from 'next/router';

function PlaceOrderPopupWindow() {
    const router = useRouter();
    const iframeDom = useRef(null);
    const timer = useRef(null);

    useEffect(() => {
        iframeDom.current.contentWindow.opener = window.opener;

        //資料沒進補救
        timer.current = window.setInterval(setOpener, 500);
        return () => {
            window.clearInterval(timer.current);
        };
    }, []);

    useEffect(() => {
        if (router.query?.opener === 'OK') {
            window.clearInterval(timer.current);
        }
    }, [router.query]);

    const setOpener = () => {
        // console.log('test', window.opener);
        if (iframeDom.current != null && window.opener.parent != null) {
            iframeDom.current.contentWindow.opener = window.opener;
            window.clearInterval(timer.current);
            window.location.href = process.env.NEXT_PUBLIC_SUBPATH + '/PlaceOrderPopupWindow?opener=OK';
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
