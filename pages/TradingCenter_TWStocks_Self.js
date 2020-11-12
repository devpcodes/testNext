import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import NewWebIframe from '../components/includes/NewWebIframe';
import { PageHead } from '../components/includes/PageHead';
import { useSelector } from 'react-redux';
export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

const TradingCenter_TWStocks_Self = function () {
    const isMobile = useSelector(store => store.layout.isMobile);
    return (
        <>
            <PageHead title={'自選報價'} />
            <div style={{ padding: isMobile ? '0' : '0 30px' }}>
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
