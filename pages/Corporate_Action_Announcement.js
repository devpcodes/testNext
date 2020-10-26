import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { useSelector } from 'react-redux';
import { PageHead } from '../components/includes/PageHead';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function Corporate_Action_Announcement() {
    const isMobile = useSelector(store => store.layout.isMobile);

    return (
        <>
            <PageHead title={'股務活動預告'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/Corporate_Action_Announcement`}
                    title="永豐金證券"
                    iHeight={isMobile ? 1950 : 1150}
                />
            </div>
        </>
    );
}

export default Corporate_Action_Announcement;
