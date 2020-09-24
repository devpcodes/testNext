import React, { useEffect, useState, useRef, useCallback } from 'react';
import { notification } from 'antd';
import { useRouter } from 'next/router'
import jwt_decode from "jwt-decode";
import {useSelector, useDispatch} from 'react-redux';
import Head from 'next/head';
import Header from '../includes/header';
import Footer from '../includes/footer';
import { resize, showLoginHandler, setNavItems } from '../../actions/components/layouts/action';
import { setIsLogin, setAccounts } from '../../actions/user/action';
import { checkLogin } from '../../services/components/layouts/checkLogin';
import { checkMobile } from '../../services/components/layouts/checkMobile';
import Login from '../includes/sinotradeLogin/login';
import MyTransition from '../includes/myTransition';
import { getCookie } from '../../services/components/layouts/cookieController';

const Layout = React.memo((props) => {
    const router = useRouter();
    const [verifySuccess, setVerifySuccess] = useState(false);

    const dispatch = useDispatch();
    const showLogin = useSelector(store => store.layout.showLogin);
    const isMobile = useSelector(store => store.layout.isMobile);
    const isLogin = useSelector((store) => store.user.isLogin);
    const navData = useSelector((store) => store.layout.navData);

    const getMenuPath = useRef(false);
    const needLogin = useRef(false);
    const prevPathname = useRef(false);
    const isAuthenticated = useRef(true);

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
        if(router.pathname.indexOf('errPage') >= 0 || router.pathname === '/'){
            setVerifySuccess(true);
        }else{
            showPageHandler();
        }
    }, [router.pathname, navData]);

    //驗證有沒有瀏覽頁面的權限
    const showPageHandler = function(){
        let currentPath = router.pathname.substr(1);
        if(currentPath !== ''){
            if(navData.main != null){
                pageVerifyHandler(navData.main, currentPath);
                menuUrlHandler();
            }
        }
    }

    //查詢當前網址是不是menu裡的url
    const pageVerifyHandler = function(data, currentPath, getPath) {
        if(data == null){
            return;
        }
        data.some((obj) => {
            if(obj.url != null) {
                if(obj.url === currentPath) {
                    getMenuPath.current = true;
                    isAuthenticated.current = obj.isAuthenticated;
                    needLogin.current = obj.needLogin;
                    getPath = true;//跳出回圈用的
                    return true;
                }
            }else{
                if(obj.items != null){
                    if(getPath){
                        return true;//跳出回圈用的
                    }
                    pageVerifyHandler(obj.items, currentPath)
                }
            }
        })
    }

    //for loop menu選單路徑完成時的處理
    const menuUrlHandler = function() {
        if(getMenuPath.current){
            loginPageHandler(isLogin, needLogin.current)
        }else{
            setVerifySuccess(true);
        }
    }

    /**
     * 是否需要登入
     * @param {bool} isLogin 是否已登入
     * @param {bool} needLogin 是否需登入
     */
    const loginPageHandler = function(isLogin, needLogin) {
        if(!isLogin && needLogin){
            noPermissionPage();
        }else{
            authPageHandler();
        }
    }

    //是否有權限
    const authPageHandler = function(){
        if(isAuthenticated.current){
            setVerifySuccess(true); 
        }else{
            noPermissionPage();
        }
    }

    //無權限頁面處理
    const noPermissionPage = function(){
        prevPathname.current = router.pathname;
        router.push('errPage');
        setVerifySuccess(false);
        setTimeout(() => {
            dispatch(showLoginHandler(true));
        }, 500);
    }

    //pwa註冊
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

    // WINDOW寬度改變處理
    const resizeHandler = function() {
        let winWidth = document.body.clientWidth;
        if(checkMobile(winWidth)){
            dispatch(resize(winWidth, true));
        }else{
            dispatch(resize(winWidth, false));
        }
    }

    // 關閉login popup
    const closeHandler = useCallback(() => {
        dispatch(showLoginHandler(false));
    }, [])

    // 跳出的登入popup，登入成功後的處理
    const loginSuccessHandler = useCallback(() => {
        dispatch(setNavItems(getCookie('token')));
        dispatch(showLoginHandler(false));
        dispatch(setIsLogin(true));
        setTimeout(() => {
            notification.success({
                placement: 'topRight',
                message: '登入成功',
                duration: 3,
                top: 70
            });
            router.push(prevPathname.current)
        }, 500);
    }, [])

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
            <Header/>
                <div className="page__container">
                    { verifySuccess === true && props.children }
                </div>
            <Footer/>
            <style jsx>{`
                .page__container{
                    min-height: 500px;
                }
            `}</style>
        </>
    )
})

// export default connect(mapStateToProps, { resize, isLogin, showLoginHandler })(Layout);
export default Layout;