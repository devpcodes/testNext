import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { PageHead } from '../components/includes/PageHead';
import AccountInfo from '../components/includes/AccountInfo';
export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function AccountInfomation() {
    return (
        <>
            <PageHead title={'帳戶基本資料'} />
            <div>
                <AccountInfo />
            </div>
        </>
    );
}

export default AccountInfomation;
