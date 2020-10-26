import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { PageHead } from '../components/includes/PageHead';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function Batch_Order() {
    return (
        <>
            <PageHead title={'批次下單'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/Batch_Order`}
                    title="永豐金證券"
                    iHeight={900}
                />
            </div>
        </>
    );
}

export default Batch_Order;
