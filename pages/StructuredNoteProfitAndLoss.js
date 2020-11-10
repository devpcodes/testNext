import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { PageHead } from '../components/includes/PageHead';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function StructuredNoteProfitAndLoss() {
    return (
        <>
            <PageHead title={'結構性商品損益'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/StructuredNoteProfitAndLoss`}
                    title="永豐金證券"
                    iHeight={850}
                />
            </div>
        </>
    );
}

export default StructuredNoteProfitAndLoss;
