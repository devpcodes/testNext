import Head from 'next/head';
import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../actions/components/layouts/action';
import { useSelector } from 'react-redux';
export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});
function TradingCenter_TWStocks_ScreenInstant() {
    const isMobile = useSelector(store => store.layout.isMobile);
    return (
        <>
            <Head>
                <title>智慧選股</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/TradingCenter_TWStocks_ScreenInstant`}
                    title="永豐金證券"
                    iHeight={isMobile ? 2100 : 1500}
                />
            </div>
        </>
    );
}

export default TradingCenter_TWStocks_ScreenInstant;
