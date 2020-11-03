import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { PageHead } from '../components/includes/PageHead';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function Service_ForgetPassword() {
    return (
        <>
            <PageHead title={'密碼專區'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/Service_ForgetPassword`}
                    title="永豐金證券"
                    iHeight={800}
                />
            </div>
        </>
    );
}

export default Service_ForgetPassword;
