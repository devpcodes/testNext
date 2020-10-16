import Head from 'next/head';
import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../actions/components/layouts/action';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});
function TradingAccount() {
    return (
        <>
            <Head>
                <title>交易帳務</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <NewWebIframe iframeSrc="/webrd/TradingAccount?mkt=futuresOptions" title="永豐金證券" />
            </div>
        </>
    );
}

export default TradingAccount;
