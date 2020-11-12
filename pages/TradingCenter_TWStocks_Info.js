import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { PageHead } from '../components/includes/PageHead';
import { setNavItems } from '../store/components/layouts/action';
import { useSelector } from 'react-redux';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});
function TradingCenter_TWStocks_Info() {
    const isMobile = useSelector(store => store.layout.isMobile);
    return (
        <>
            <PageHead title={'台股公佈欄'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/TradingCenter_TWStocks_Info`}
                    title="永豐金證券"
                    iHeight={isMobile ? 1100 : 700}
                />
            </div>
        </>
    );
}

export default TradingCenter_TWStocks_Info;
