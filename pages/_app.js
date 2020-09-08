import 'antd/dist/antd.min.css';
import '../resorces/styles/globals.css';
import { useRef, useState, useEffect } from 'react';
import Layout from '../components/layouts/layout';
import withRedux from '../components/hoc/withReduxApp';
import { Provider } from 'react-redux';
import SinoTradeLogin from '../components/includes/sinotradeLogin/SinoTradeLogin';

export async function getServerSideProps(ctx) {
    const { Component } = ctx
    let pageProps = {}
    // 拿到Component上定义的getInitialProps
    if (Component.getInitialProps) {
      	// 执行拿到返回结果`
      	pageProps = await Component.getInitialProps(ctx)
    }
    // 返回给组件
    return {
      	pageProps,
    }
}

function MyApp({ Component, pageProps, reduxStore, router }) {
    const [isVisible, setIsVisible] = useState(true);
    const currentComp = useRef(null);
    const oldPathName = useRef(null);

    const getLayout = Component.getLayout || (page => <Layout children={page} />)
    const renderComp = getLayout(<Component {...pageProps} />)
    useEffect(() => {
        if(router.pathname === '/SinoTrade_login'){
            setIsVisible(true);
        }
    }, [router.pathname]);

    const showLoginClose = function(){
        setIsVisible(false);
        setTimeout(() => {
            router.push(oldPathName.current || '/');
        }, 400);
    }

    if(router.pathname === '/SinoTrade_login'){
        return (
            <Provider store={reduxStore}>
                <SinoTradeLogin isVisible={isVisible} onClose={showLoginClose} successHandler={showLoginClose}/>
                {currentComp.current}
            </Provider>
        )
    }else{
        currentComp.current = renderComp;
        oldPathName.current = router.pathname;
        return (
            <Provider store={reduxStore}>
                {renderComp}
            </Provider>
        )
    }


    // return (
    //     <Provider store={reduxStore}>
    //         {renderComp}
    //     </Provider>
    // )
}
export default withRedux(MyApp)
