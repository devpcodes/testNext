import Head from 'next/head';
import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../actions/components/layouts/action';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});
function User_ChangePassword() {
    return (
        <>
            <Head>
                <title>密碼修改</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <NewWebIframe iframeSrc="/webrd/User_ChangePassword" title="永豐金證券" />
            </div>
        </>
    );
}

export default User_ChangePassword;
