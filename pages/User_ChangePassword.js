// import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { PageHead } from '../components/includes/PageHead';
import ChangePasswordPage from '../components/includes/userChangePassword/page/ChangePasswordPage';
export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function User_ChangePassword() {
    return (
        <>
            <PageHead title={'密碼修改'} />
            <ChangePasswordPage />
        </>
    );
}

export default User_ChangePassword;
