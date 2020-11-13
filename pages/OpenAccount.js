import { useSelector } from 'react-redux';

import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { PageHead } from '../components/includes/PageHead';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

const OpenAccount = () => {
    const isMobile = useSelector(store => store.layout.isMobile);

    return (
        <>
            <PageHead title={'我要開戶'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/OpenAccount`}
                    title="永豐金證券"
                    iHeight={isMobile ? 3400 : 2000}
                />
            </div>
        </>
    );
};

export default OpenAccount;
