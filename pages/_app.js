import 'antd/dist/antd.min.css';
import '../resources/styles/globals.css';
import { useRef, useState, useEffect } from 'react';
import Layout from '../components/layouts/layout';
import { Provider } from 'react-redux';
import { useStore } from '../store/store';
import SinoTradeLogin from '../components/includes/sinotradeLogin/SinoTradeLogin';
import MyTransition from '../components/includes/myTransition';

function MyApp({ Component, pageProps, router }) {
    const store = useStore(pageProps.initialReduxState);
    const [isVisible, setIsVisible] = useState(true);
    const currentComp = useRef(null);
    const oldPathName = useRef(null);

    const getLayout = Component.getLayout || ((page) => <Layout children={page} />);
    const renderComp = getLayout(<Component {...pageProps} />);
    useEffect(() => {
        if (router.pathname === '/SinoTrade_login') {
            setIsVisible(true);
        }
    }, [router.pathname]);

    const showLoginClose = function () {
        setIsVisible(false);
        setTimeout(() => {
            router.push(oldPathName.current || '/');
        }, 400);
    };

    if (router.pathname === '/SinoTrade_login') {
        return (
            <Provider store={store}>
                <MyTransition isVisible={isVisible} classNames={'login'}>
                    <SinoTradeLogin onClose={showLoginClose} successHandler={showLoginClose} />
                </MyTransition>

                {currentComp.current}
            </Provider>
        );
    } else {
        currentComp.current = renderComp;
        oldPathName.current = router.pathname;
        return <Provider store={store}>{renderComp}</Provider>;
    }
}
export default MyApp;
