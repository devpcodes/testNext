import Head from 'next/head';
import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../actions/components/layouts/action';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});
function Inside_Frame() {
    return (
        <>
            <Head>
                <title>基本資料異動</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <NewWebIframe
                    iframeSrc="/webrd/Inside_Frame?URL=https://servicerd.sinotrade.com.tw/pss/personalInfo/trust_login/"
                    title="永豐金證券"
                />
            </div>
        </>
    );
}

export default Inside_Frame;
