import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { useSelector } from 'react-redux';
import { PageHead } from '../components/includes/PageHead';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function TradingCenter_TWStocks_ScreenInstant() {
    const isMobile = useSelector(store => store.layout.isMobile);
    return (
        <>
            <PageHead title={'智慧選股'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/TradingCenter_TWStocks_ScreenInstant`}
                    title="永豐金證券"
                    iHeight={isMobile ? 2100 : 1500}
                />
            </div>
        </>
    );
}

export default TradingCenter_TWStocks_ScreenInstant;
