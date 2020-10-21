import Head from 'next/head';
import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { useSelector } from 'react-redux';
export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function Corporate_Action_Announcement() {
    const isMobile = useSelector(store => store.layout.isMobile);
    return (
        <>
            <Head>
                <title>股務活動預告</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/Corporate_Action_Announcement`}
                    title="永豐金證券"
                    iHeight={isMobile ? 1950 : 1150}
                />
            </div>
        </>
    );
}

export default Corporate_Action_Announcement;
