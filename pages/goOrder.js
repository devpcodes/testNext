import Head from 'next/head';
import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../actions/components/layouts/action';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});
function GoOrder() {
    return (
        <>
            <Head>
                <title>快速下單</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <NewWebIframe iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/goOrder`} title="永豐金證券" />
            </div>
        </>
    );
}
// eslint-disable-next-line react/display-name
// GoOrder.getLayout = page => (
//     <>
//       <GoOrder>{page}</GoOrder>
//     </>
// )

export default GoOrder;
