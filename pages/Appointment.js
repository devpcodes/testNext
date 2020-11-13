import { useSelector } from 'react-redux';

import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { PageHead } from '../components/includes/PageHead';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

const Appointment = () => {
    const isMobile = useSelector(store => store.layout.isMobile);

    return (
        <>
            <PageHead title={'預約開戶'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/service_reserveAccount`}
                    title="永豐金證券"
                    iHeight={isMobile ? 1800 : 1100}
                />
            </div>
        </>
    );
};

export default Appointment;
