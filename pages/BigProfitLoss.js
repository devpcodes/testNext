import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { PageHead } from '../components/includes/PageHead';
import { ProfitLoss } from '../components/includes/bigProfitLoss/ProfitLoss';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function BigProfitLoss() {
    return (
        <>
            <PageHead title={'損益查詢'} />
            <ProfitLoss />
        </>
    );
}

export default BigProfitLoss;
