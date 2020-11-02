import { useEffect, useRef } from 'react';
import NewWebIframe from '../components/includes/NewWebIframe';
import { PageHead } from '../components/includes/PageHead';

function H5_Future_Duplex() {
    const iframeDom = useRef(null);
    const source = useRef(null);

    useEffect(() => {
        window.addEventListener('message', messageEventHandler);

        return () => {
            window.removeEventListener('message', messageEventHandler);
        };
    }, []);

    const messageEventHandler = e => {
        if (e.data.length != null) {
            iframeDom.current.contentWindow.postMessage(e.data, '*');
            source.current = e.source;
        }
        if (e.data.product != null) {
            source.current.postMessage(e.data, '*');
            window.close();
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
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/H5_Future_Duplex`}
                    title="永豐金證券"
                    iHeight={550}
                    getIframeDom={getIframeDom}
                />
            </div>
        </>
    );
}

H5_Future_Duplex.getLayout = page => (
    <>
        <H5_Future_Duplex>{page}</H5_Future_Duplex>
    </>
);

export default H5_Future_Duplex;
