import { wrapper } from '../store/store';
import { setNavItems } from '../actions/components/layouts/action';
import NewWebIframe from '../components/includes/NewWebIframe';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

const TradingCenter_TWStocks_Self = function () {
    return (
        <div>
            <div>
                <NewWebIframe
                    iframeSrc="https://webrd.sinotrade.com.tw/TradingCenter_TWStocks_Self"
                    title="永豐金證券"
                />
            </div>
            <style jsx>{`
                iframe {
                    border: none;
                }
            `}</style>
        </div>
    );
};
TradingCenter_TWStocks_Self.displayName = 'Home';

export default TradingCenter_TWStocks_Self;
