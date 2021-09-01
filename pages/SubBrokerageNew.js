import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { PageHead } from '../components/includes/PageHead';
import SubBrokerageMain from '../components/includes/subBrokerage/SubBrokerageMain';
import { useAutoSelectAccount } from '../hooks/useAutoSelectAccount';
export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function SubBrokerageNew() {
    useAutoSelectAccount('H');
    return (
        <>
            <PageHead title={'海外股票交易帳務整合'} />
            <div>
                <SubBrokerageMain />
            </div>
        </>
    );
}

export default SubBrokerageNew;
