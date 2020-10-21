import Head from 'next/head';
import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});
function RichInfo_News() {
    return (
        <>
            <Head>
                <title>財經新聞</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <NewWebIframe iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/RichInfo_News`} title="永豐金證券" />
            </div>
        </>
    );
}

export default RichInfo_News;
