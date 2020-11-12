import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { objectToQueryHandler } from '../services/objectToQueryHandler';
import { PageHead } from '../components/includes/PageHead';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function TradingCenter_TWStocks_SubBrokerage() {
    const router = useRouter();
    const isMobile = useSelector(store => store.layout.isMobile);
    const [queryStr, setQueryStr] = useState('');
    const [height, setHeight] = useState(1450);
    const [tab, setTab] = useState('');

    const getHeightByTab = tab => {
        switch (tab) {
            case '2':
                return isMobile ? 950 : 1650;
            case '3':
                return isMobile ? 1000 : 1600;
            case '4':
                return isMobile ? 1050 : 2100;
            case '5':
                return 1450;
            case '7':
                return 1450;
            default:
                return 1450;
        }
    };

    useEffect(() => {
        const iFrameHeight = getHeightByTab(tab);
        setTimeout(() => {
            setHeight(iFrameHeight);
        }, 100);
    }, [tab, isMobile]);

    useEffect(() => {
        const qStr = objectToQueryHandler(router.query);
        if (qStr) {
            setQueryStr(qStr);
            router.query?.tab && setTab(router.query.tab);
        }
    }, [router.query]);

    return (
        <>
            <PageHead title={'海外股票'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/TradingCenter_TWStocks_SubBrokerage${queryStr}`}
                    title="永豐金證券"
                    iHeight={height}
                />
            </div>
        </>
    );
}

export default TradingCenter_TWStocks_SubBrokerage;
