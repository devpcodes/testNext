import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { useSelector } from 'react-redux';
import { PageHead } from '../components/includes/PageHead';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function Subscription() {
    const isMobile = useSelector(store => store.layout.isMobile);

    return (
        <>
            <PageHead title={'股票申購'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/Subscription`}
                    title="永豐金證券"
                    iHeight={isMobile ? 7000 : 3100}
                />
            </div>
        </>
    );
}

export default Subscription;
