import Head from 'next/head';
import { useEffect, useState } from 'react';
import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../actions/components/layouts/action';
import { objectToQueryHandler } from '../services/objectToQueryHandler';
import { useRouter } from 'next/router';
export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});
function Inside_Frame() {
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
                <title>基本資料異動</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/Inside_Frame${queryStr}`}
                    title="永豐金證券"
                />
            </div>
        </>
    );
}

export default Inside_Frame;
