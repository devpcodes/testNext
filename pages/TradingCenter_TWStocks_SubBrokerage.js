import Head from 'next/head';
import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function TradingCenter_TWStocks_SubBrokerage() {
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

    const objectToQueryHandler = obj => {
        var str = '';
        for (var key in obj) {
            if (str != '') {
                str += '&';
            }
            str += key + '=' + encodeURIComponent(obj[key]);
        }
        return str;
    };

    return (
        <>
            <Head>
                <title>海外股票</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/TradingCenter_TWStocks_SubBrokerage${
                        queryStr ? '?' + queryStr : ''
                    }`}
                    title="永豐金證券"
                />
            </div>
        </>
    );
}

export default TradingCenter_TWStocks_SubBrokerage;
