import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import jwt_decode from "jwt-decode";
import {useSelector, useDispatch} from 'react-redux';
import Head from 'next/head';
import Header from '../includes/header';
import Footer from '../includes/footer';
import {
    resize,
    setIsLogin,
    showLoginHandler,
    setAccounts,
    setNavItems,
} from '../../actions/components/layouts/action';
import { checkLogin } from '../../services/components/layouts/checkLogin';
import { checkMobile } from '../../services/components/layouts/checkMobile';
import Login from '../includes/sinotradeLogin/login';
import MyTransition from '../includes/myTransition';
import { getCookie } from '../../services/components/layouts/cookieController';

const Layout = React.memo((props) => {
    const router = useRouter();
    const [showPage, setShowPage] = useState(false);
    const dispatch = useDispatch();

    const showLogin = useSelector(store => store.layout.showLogin);
    const isMobile = useSelector(store => store.layout.isMobile);
    const isLogin = useSelector((store) => store.layout.isLogin);
    const navData = useSelector((store) => store.server.navData);

    useEffect(() => {
        const updateNavData = () => {
            !Object.keys(navData).length && dispatch(setNavItems(getCookie('token')));
        };

        pwaHandler();
        window.addEventListener('resize', resizeHandler);
        resizeHandler();
        updateNavData();
        if (checkLogin()) {
            dispatch(setIsLogin(true));
        }
        return () => {
            window.removeEventListener('resize', resizeHandler, false);
        };
    }, []);

    useEffect(() => {
        if (checkLogin()) {
            const tokenVal = jwt_decode(getCookie('token'));
            dispatch(setAccounts(tokenVal.acts_detail));
        } else {
            dispatch(setAccounts([]));
        }
        return () => {};
    }, [isLogin]);

    useEffect(() => {
        showPageHandler();
    }, [router.pathname]);

    const showPageHandler = function(){
        let currentPath = router.pathname.substr(1);
        if(currentPath !== ''){
            pageVerifyHandler(navData.main, currentPath);
        }else{
            setShowPage(true);
        }
    }

    const pageVerifyHandler = function(data, currentPath, getPath) {
        data.some((obj) => {
            if(obj.url != null) {
                if(obj.url === currentPath) {
                    dispatch(showLoginHandler(true));
                    getPath = true;
                    return true;
                }
            }else{
                if(obj.items != null){
                    if(getPath){
                        return true;
                    }
                    pageVerifyHandler(obj.items, currentPath)
                }
            }
        })
    }

    const pwaHandler = function() {
        if(process.env.NODE_ENV === 'production'){
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js', {scope: '/'})
                .then(reg => {
                    // console.log('SW registered!', reg);
                })
                .catch(err => console.log('Boo!', err));
            }
        }
    }

    const resizeHandler = function() {
        let winWidth = document.body.clientWidth;
        if(checkMobile(winWidth)){
            dispatch(resize(winWidth, true));
        }else{
            dispatch(resize(winWidth, false));
        }
    }

    const showLoginClick = function() {
        dispatch(showLoginHandler(true));
    }

    const closeHandler = function(){
        dispatch(showLoginHandler(false));
    }

    const loginSuccessHandler = function(){
        dispatch(showLoginHandler(false));
        setShowPage(true);
    }
    return (
        <>
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="https://richclub.azureedge.net/public/apple-icon-180x180.png"/>
                <link rel='icon' type='image/png' sizes='32x32' href='/images/icons/32.png' />
                <link rel='icon' type='image/png' sizes='16x16' href='/images/icons/16.png' />
                <meta name='theme-color' content='#000000' />
                <link rel='mask-icon' href='/images/icons/32.png' color='#5bbad5' />
                <link rel='manifest' href='/manifest.json' />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
            </Head>
            <MyTransition
                isVisible={showLogin}
                classNames={'opacity'}
            >
                <Login popup={true} isPC={!isMobile} onClose={closeHandler} successHandler={loginSuccessHandler}/>
            </MyTransition>
            <Header showLoginClick={showLoginClick}/>
                {showPage && props.children}
            <Footer/>
        </>
    )
})

// export default connect(mapStateToProps, { resize, isLogin, showLoginHandler })(Layout);
export default Layout;