import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { useSelector } from 'react-redux';
import { PageHead } from '../components/includes/PageHead';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function TradingCenter_TWStocks_Option() {
    const isLogin = useSelector(store => store.user.isLogin);
    return (
        <>
            <PageHead title={'選擇權報價'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/TradingCenter_TWStocks_Option`}
                    title="永豐金證券"
                    iHeight={800}
                    login={isLogin}
                />
            </div>
        </>
    );
}

export default TradingCenter_TWStocks_Option;
