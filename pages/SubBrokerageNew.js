import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { PageHead } from '../components/includes/PageHead';
import SubBrokerageMain from '../components/includes/subBrokerage/SubBrokerageMain';
import { useAutoSelectAccount } from '../hooks/useAutoSelectAccount';
import ActiveReturn from '../components/includes/ActiveReturn';
export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function SubBrokerageNew() {
    useAutoSelectAccount('H');
    return (
        <>
            <ActiveReturn />
            <PageHead title={'海外股票交易帳務整合'} />
            <div>
                <SubBrokerageMain />
            </div>
        </>
    );
}

export default SubBrokerageNew;
