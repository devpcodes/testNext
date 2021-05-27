import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { PageHead } from '../components/includes/PageHead';
import Header from '../components/includes/goOrder/header/Header';
import SelfSelectToolBar from '../components/includes/selfSelect/SelfSelectToolBar';
import SelfSelectTable from '../components/includes/selfSelect/SelfSelectTable';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function Self_select_stocks() {
    return (
        <>
            <Header />
            <div className="select__box">
                <SelfSelectToolBar />
                <PageHead title={'我的自選'} />
                <SelfSelectTable />
            </div>

            <style jsx>{`
                .select__box {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px 15px 22px 15px;
                }
            `}</style>
        </>
    );
}

if (true) {
    Self_select_stocks.getLayout = Page => Page;
}
export default Self_select_stocks;
