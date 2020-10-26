import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { useSelector } from 'react-redux';
import { PageHead } from '../components/includes/PageHead';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function User_AssetOverview() {
    const isMobile = useSelector(store => store.layout.isMobile);

    return (
        <>
            <PageHead title={'資產總覽'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/User_AssetOverview`}
                    title="永豐金證券"
                    iHeight={isMobile ? 850 : 850}
                />
            </div>
        </>
    );
}

export default User_AssetOverview;
