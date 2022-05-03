import MySubscriptionPage from '../../components/includes/mySubscription/page/MySubscriptionPage';
import { PageHead } from '../../components/includes/PageHead';
import Breadcrumb from '../../components/includes/breadcrumb/breadcrumb';
import { wrapper } from '../../store/store';
import { setNavItems } from '../../store/components/layouts/action';

export const getStaticProps = wrapper.getServerSideProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function MySubscription() {
    return (
        <div className="mySubscription__container">
            <PageHead title={'我的申購'} />
            <div>
                <Breadcrumb />
                <MySubscriptionPage />
            </div>
            <style jsx>{`
                .mySubscription__container {
                    padding-top: 20px;
                    padding-left: 10%;
                    padding-right: 10%;
                }
            `}</style>
        </div>
    );
}

export default MySubscription;
