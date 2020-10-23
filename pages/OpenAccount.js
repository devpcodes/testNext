import Head from 'next/head';
import NewWebIframe from '../components/includes/NewWebIframe';

import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

const OpenAccount = () => {
    // const isMobile = useSelector(store => store.layout.isMobile);
    return (
        <>
            <Head>
                <title>我要開戶</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/OpenAccount`}
                    title="永豐金證券"
                    // iHeight={isMobile ? 1950 : 1150}
                    iHeight={1650}
                />
            </div>
        </>
    );
};

export default OpenAccount;
