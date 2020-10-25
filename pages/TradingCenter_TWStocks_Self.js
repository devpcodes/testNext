import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import NewWebIframe from '../components/includes/NewWebIframe';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

const TradingCenter_TWStocks_Self = function () {
    return (
        <div>
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/TradingCenter_TWStocks_Self`}
                    title="永豐金證券"
                    iHeight={1200}
                />
            </div>
        </div>
    );
};
TradingCenter_TWStocks_Self.displayName = 'Home';

export default TradingCenter_TWStocks_Self;
