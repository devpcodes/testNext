import Head from 'next/head';
import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../actions/components/layouts/action';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});
function Auction() {
    return (
        <>
            <Head>
                <title>競價拍賣</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <NewWebIframe iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/Auction`} title="永豐金證券" />
            </div>
        </>
    );
}

export default Auction;
