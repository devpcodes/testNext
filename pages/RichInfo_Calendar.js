import Head from 'next/head';
import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../actions/components/layouts/action';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});
function RichInfo_Calendar() {
    return (
        <>
            <Head>
                <title>理財行事曆</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <NewWebIframe iframeSrc="/webrd/RichInfo_Calendar" title="永豐金證券" />
            </div>
        </>
    );
}

export default RichInfo_Calendar;
