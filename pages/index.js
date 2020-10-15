/* eslint-disable no-undef */
import Head from 'next/head';
import { wrapper } from '../store/store';
import { setNavItems } from '../actions/components/layouts/action';
import NewWebIframe from '../components/includes/NewWebIframe';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

const Home = function () {
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <NewWebIframe iframeSrc="/webrd" title="永豐金證券" />
            </div>
        </div>
    );
};
Home.displayName = 'Home';

export default Home;
