import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import NewWebIframe from '../components/includes/NewWebIframe';
import { PageHead } from '../components/includes/PageHead';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

const TradingCenter_TWStocks_Self = function () {
    return (
        <>
            <PageHead title={'自選報價'} />
            <div style={{ padding: '0 50px' }}>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/TradingCenter_TWStocks_Self`}
                    title="永豐金證券"
                    iHeight={1200}
                />
            </div>
        </>
    );
};

export default TradingCenter_TWStocks_Self;
