/* eslint-disable no-undef */
import Head from 'next/head';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import NewWebIframe from '../components/includes/NewWebIframe';
import { useSelector } from 'react-redux';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});
const Home = function () {
    const isMobile = useSelector(store => store.layout.isMobile);
    return (
        <div>
            <Head>
                <title>永豐金理財網</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}`}
                    title="永豐金證券"
                    iHeight={isMobile ? 4500 : 1900}
                />
            </div>
        </div>
    );
};
Home.displayName = 'Home';

export default Home;
