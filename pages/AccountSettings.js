import { useSelector } from 'react-redux';
import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { PageHead } from '../components/includes/PageHead';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function AccountSettings() {
    const isMobile = useSelector(store => store.layout.isMobile);

    return (
        <>
            <PageHead title={'個人化設定'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/AccountSettings`}
                    title="永豐金證券"
                    iHeight={isMobile ? 470 : 710}
                />
            </div>
        </>
    );
}

export default AccountSettings;
