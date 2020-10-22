import Head from 'next/head';
import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});
function TradingCenter_TWStocks_Option() {
    return (
        <>
            <Head>
                <title>選擇權報價</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/TradingCenter_TWStocks_Option`}
                    title="永豐金證券"
                    iHeight={800}
                />
            </div>
        </>
    );
}

export default TradingCenter_TWStocks_Option;
