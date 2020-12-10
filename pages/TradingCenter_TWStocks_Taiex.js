import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { useSelector } from 'react-redux';
import { PageHead } from '../components/includes/PageHead';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function TradingCenter_TWStocks_Taiex() {
    const isMobile = useSelector(store => store.layout.isMobile);
    const isLogin = useSelector(store => store.user.isLogin);
    return (
        <>
            <PageHead title={'大盤報價'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/TradingCenter_TWStocks_Taiex`}
                    title="永豐金證券"
                    iHeight={isMobile ? 1700 : 1500}
                    login={isLogin}
                />
            </div>
        </>
    );
}

export default TradingCenter_TWStocks_Taiex;
