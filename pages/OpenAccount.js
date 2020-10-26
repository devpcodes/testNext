import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { PageHead } from '../components/includes/PageHead';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

const OpenAccount = () => {
    return (
        <>
            <PageHead title={'我要開戶'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/OpenAccount`}
                    title="永豐金證券"
                    iHeight={1650}
                />
            </div>
        </>
    );
};

export default OpenAccount;
