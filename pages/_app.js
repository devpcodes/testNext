import 'antd/dist/antd.min.css';
import '../resources/styles/globals.css';
import { useRef, useState, useEffect } from 'react';
import { wrapper } from '../store/store';
import Layout from '../components/layouts/layout';
import SinoTradeLogin from '../components/includes/sinotradeLogin/SinoTradeLogin';
import MyTransition from '../components/includes/myTransition';
import { objectToQueryHandler } from '../services/objectToQueryHandler';

function MyApp({ Component, pageProps, router }) {
    const [isVisible, setIsVisible] = useState(true);
    const currentComp = useRef(null);
    const oldPathName = useRef(null);

    const getLayout = Component.getLayout || (page => <Layout children={page} />);
    const renderComp = getLayout(<Component {...pageProps} />);
    // useEffect(() => {
    //     if (router.pathname.indexOf('/SinoTrade_login') >= 0) {
    //         setIsVisible(true);
    //     }
    // }, [router.pathname]);

    // const showLoginClose = function () {
    //     setIsVisible(false);
    //     setTimeout(() => {
    //         let path = oldPathName.current != null ? oldPathName.current : '/';
    //         router.push(path, process.env.NEXT_PUBLIC_SUBPATH + path.substr(1));
    //     }, 400);
    // };

    // if (router.pathname.indexOf('/SinoTrade_login') >= 0) {
    //     return (
    //         <>
    //             <MyTransition isVisible={isVisible} classNames={'login'}>
    //                 <SinoTradeLogin onClose={showLoginClose} successHandler={showLoginClose} />
    //             </MyTransition>
    //             {currentComp.current}
    //         </>
    //     );
    // } else {
    //     currentComp.current = renderComp;
    //     oldPathName.current = router.pathname + objectToQueryHandler(router.query);
    //     return <>{renderComp}</>;
    // }

    return <>{renderComp}</>;
}
export default wrapper.withRedux(MyApp);
