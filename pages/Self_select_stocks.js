import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { PageHead } from '../components/includes/PageHead';
import Header from '../components/includes/goOrder/header/Header';
import SelfSelectToolBar from '../components/includes/selfSelect/SelfSelectToolBar';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function Self_select_stocks() {
    return (
        <>
            <Header />
            <SelfSelectToolBar />
            <PageHead title={'我的自選'} />
        </>
    );
}

if (true) {
    Self_select_stocks.getLayout = Page => Page;
}
export default Self_select_stocks;
