import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import NewWebIframe from '../components/includes/NewWebIframe';
import { PageHead } from '../components/includes/PageHead';
import { objectToQueryHandler } from '../services/objectToQueryHandler';

function H5_goOrder() {
    const router = useRouter();
    const [queryStr, setQueryStr] = useState('');

    useEffect(() => {
        const qStr = objectToQueryHandler(router.query);
        if (qStr) {
            setQueryStr(qStr);
        }
    }, []);

    useEffect(() => {
        const qStr = objectToQueryHandler(router.query);
        if (qStr) {
            setQueryStr(qStr);
        }
    }, [router.query]);

    const getIframeDom = dom => {
        console.log('dom', dom);
    };

    return (
        <>
            <PageHead title={'即時盯盤'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/H5_goOrder${queryStr}`}
                    title="永豐金證券"
                    iHeight={88}
                    getIframeDom={getIframeDom}
                />
            </div>
        </>
    );
}

H5_goOrder.getLayout = page => (
    <>
        <H5_goOrder>{page}</H5_goOrder>
    </>
);

export default H5_goOrder;
