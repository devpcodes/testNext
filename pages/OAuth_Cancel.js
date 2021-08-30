import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { PageHead } from '../components/includes/PageHead';
import OAuthCancel from '../components/includes/OAuthCancelMain';
export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function OAuth_Cancel() {
    return (
        <>
            <PageHead title={'取消授權'} />
            <div>
                <OAuthCancel />
            </div>
        </>
    );
}

export default OAuth_Cancel;
