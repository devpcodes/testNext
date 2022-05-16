import MySubscriptionPage from '../../components/includes/mySubscription/page/MySubscriptionPage';
import { PageHead } from '../../components/includes/PageHead';
import { wrapper } from '../../store/store';
import { setNavItems } from '../../store/components/layouts/action';

export const getStaticProps = wrapper.getServerSideProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function MySubscription() {
    // const isMobile = useCheckMobile();
    return (
        <div className="mySubscription__container">
            <PageHead title={'我的申購'} />
            <div>
                <MySubscriptionPage />
            </div>
            <style jsx>{`
                .mySubscription__container {
                    padding-top: 20px;
                    padding-left: 10%;
                    padding-right: 10%;
                }
                @media (max-width: 1024px) {
                    .mySubscription__container {
                        padding-left: 5%;
                        padding-right: 5%;
                    }
                }
                @media (max-width: 768px) {
                    .mySubscription__container {
                        padding-left: 0;
                        padding-right: 0;
                    }
                }
            `}</style>
        </div>
    );
}

export default MySubscription;
