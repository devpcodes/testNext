import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { useSelector } from 'react-redux';
import { PageHead } from '../components/includes/PageHead';
import { objectToQueryHandler } from '../services/objectToQueryHandler';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function TradingCenter_TWStocks_Stock() {
    const router = useRouter();
    const [queryStr, setQueryStr] = useState('');
    const isLogin = useSelector(store => store.user.isLogin);
    const isMobile = useSelector(store => store.layout.isMobile);

    useEffect(() => {
        const qStr = objectToQueryHandler(router.query);
        if (qStr) {
            setQueryStr(qStr);
        }
    }, [router.query]);

    return (
        <>
            <PageHead title={'個股報價'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/TradingCenter_TWStocks_Stock${queryStr}`}
                    iHeight={isMobile ? 3000 : 2500}
                    title="永豐金證券"
                    login={isLogin}
                />
            </div>
        </>
    );
}

export default TradingCenter_TWStocks_Stock;
