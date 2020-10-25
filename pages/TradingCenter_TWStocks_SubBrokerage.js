import Head from 'next/head';
import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { objectToQueryHandler } from '../services/objectToQueryHandler';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function TradingCenter_TWStocks_SubBrokerage() {
    const router = useRouter();
    const isLogin = useSelector(store => store.user.isLogin);
    const [queryStr, setQueryStr] = useState('');
    const [height, setHeight] = useState(1450);

    console.log('------render------');

    console.log(`queryStr:`, queryStr);
    console.log(`height:`, height);

    const getHeightByTab = query => {
        const tab = query?.tab;
        switch (tab) {
            case '2':
                return 1650;
            case '3':
                return 1450;
            case '4':
                return 2000;
            case '5':
                return 1450;
            case '7':
                return 1450;
            default:
                return 1450;
        }
    };

    useEffect(() => {
        const iFrameHeight = getHeightByTab(router.query);
        setHeight(iFrameHeight);
        console.log(`========iFrameHeight:`, iFrameHeight);
    }, [queryStr]);

    useEffect(() => {
        const qStr = objectToQueryHandler(router.query);
        if (qStr) {
            setQueryStr(qStr);
        }
        console.log(`========qStr:`, qStr);
    }, [router.query]);

    return (
        <>
            <Head>
                <title>海外股票</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/TradingCenter_TWStocks_SubBrokerage${queryStr}`}
                    title="永豐金證券"
                    iHeight={height}
                    login={isLogin}
                />
            </div>
        </>
    );
}

export default TradingCenter_TWStocks_SubBrokerage;
