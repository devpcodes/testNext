import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import NewWebIframe from '../components/includes/NewWebIframe';
import { useSelector } from 'react-redux';
import { PageHead } from '../components/includes/PageHead';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

const Home = function () {
    const isMobile = useSelector(store => store.layout.isMobile);
    return (
        <div>
            <PageHead title={'永豐金理財網'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}`}
                    title="永豐金證券"
                    iHeight={isMobile ? 4500 : 1900}
                />
            </div>
        </div>
    );
};

export default Home;
