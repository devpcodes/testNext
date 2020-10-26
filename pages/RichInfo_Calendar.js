import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { PageHead } from '../components/includes/PageHead';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function RichInfo_Calendar() {
    return (
        <>
            <PageHead title={'理財行事曆'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/RichInfo_Calendar`}
                    title="永豐金證券"
                    iHeight={1200}
                />
            </div>
        </>
    );
}

export default RichInfo_Calendar;
