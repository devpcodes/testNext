import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { PageHead } from '../components/includes/PageHead';
import { ProfitLoss } from '../components/includes/hfProfitLoss/ProfitLoss';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function hfProfitLoss() {
    return (
        <>
            <PageHead title={'定時洗價損益'} />
            <ProfitLoss />
        </>
    );
}

export default hfProfitLoss;
