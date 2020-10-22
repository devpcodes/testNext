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
function Line_TradingAccount() {
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
                <title>交易帳務</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/Line_TradingAccount${queryStr}`}
                    // iframeSrc={'https://webrd.sinotrade.com.tw/TradingAccount'}
                    iHeight={1000}
                    title="永豐金證券"
                />
            </div>
        </>
    );
}

export default Line_TradingAccount;
