import Head from 'next/head';
import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../actions/components/layouts/action';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});
function Service_ForgetPassword_Apply() {
    return (
        <>
            <Head>
                <title>線上補發</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <NewWebIframe iframeSrc="/webrd/Service_ForgetPassword_Apply" title="永豐金證券" />
            </div>
        </>
    );
}

export default Service_ForgetPassword_Apply;
