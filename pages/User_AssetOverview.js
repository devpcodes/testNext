import Head from 'next/head';
import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { useSelector } from 'react-redux';
export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});
function User_AssetOverview() {
    const isMobile = useSelector(store => store.layout.isMobile);
    return (
        <>
            <Head>
                <title>資產總覽</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/User_AssetOverview`}
                    title="永豐金證券"
                    iHeight={isMobile ? 850 : 850}
                />
            </div>
        </>
    );
}

export default User_AssetOverview;
