import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { PageHead } from '../components/includes/PageHead';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function Subbrokerage() {
    return (
        <>
            <PageHead title={'海外股票交易帳務整合'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/Subbrokerage`}
                    title="永豐金證券"
                    iHeight={1000}
                />
            </div>
        </>
    );
}

export default Subbrokerage;
