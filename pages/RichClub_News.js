import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { PageHead } from '../components/includes/PageHead';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function RichClub_News() {
    return (
        <>
            <PageHead title={'豐雲學堂'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/RichClub_News`}
                    title="永豐金證券"
                    iHeight={2000}
                />
            </div>
        </>
    );
}

export default RichClub_News;
