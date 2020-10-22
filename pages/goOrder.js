import Head from 'next/head';
import { useState, useEffect } from 'react';
import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { objectToQueryHandler } from '../services/objectToQueryHandler';
import { useRouter } from 'next/router';
export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});
function GoOrder() {
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
    return (
        <>
            <Head>
                <title>快速下單</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/goOrder${queryStr}`}
                    title="永豐金證券"
                    iHeight={830}
                />
            </div>
        </>
    );
}
// eslint-disable-next-line react/display-name
// GoOrder.getLayout = page => (
//     <>
//       <GoOrder>{page}</GoOrder>
//     </>
// )

export default GoOrder;
