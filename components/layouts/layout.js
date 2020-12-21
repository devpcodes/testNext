import React, { useEffect, useState, useRef, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../includes/header';
import Footer from '../includes/footer';
import Login from '../includes/sinotradeLogin/login';
import SinoTradeLogin from '../includes/sinotradeLogin/SinoTradeLogin';
import MyTransition from '../includes/myTransition';
import CaHead from '../includes/CaHead';

import { showLoginHandler, setNavItems, setMaskVisible, setMenuOpen } from '../../store/components/layouts/action';
import { setIsLogin } from '../../store/user/action';
import { setCurrentPath } from '../../store/general/action';

import { getCookie, removeCookie } from '../../services/components/layouts/cookieController';
import { getToken } from '../../services/user/accessToken';
import { objectToQueryHandler } from '../../services/objectToQueryHandler';
import { verifyMenu } from '../../services/components/layouts/verifyMenu';
import { CAHandler } from '../../services/webCa';

import { useCheckMobile } from '../../hooks/useCheckMobile';
import { useUser } from '../../hooks/useUser';
import { usePlatform } from '../../hooks/usePlatform';
import { noCloseBtns } from '../../hooks/useLoginClosBtn';
const noVerifyRouters = ['goOrder', 'errPage'];

const Layout = memo(({ children }) => {
    const router = useRouter();
    const [verifySuccess, setVerifySuccess] = useState(false);
    const [showBigLogin, setShowBigLogin] = useState(false);
    const [verifyErrMsg, setVerifyErrMsg] = useState('權限不足');
    const [showNav, setShowNav] = useState(false);

    // window 寬度改變處理，回傳 isMobile
    const isMobile = useCheckMobile();
    // 客戶登入/登出的帳號及個人化設定處理，回傳 { isLogin, accounts, userSettings }
    const { isLogin } = useUser();
    // 來源別相關的處理
    const platform = usePlatform();

    const dispatch = useDispatch();
    const showLogin = useSelector(store => store.layout.showLogin);
    const navData = useSelector(store => store.layout.navData);
    const currentPath = useSelector(store => store.general.currentPath);
    const showMask = useSelector(store => store.layout.showMask);

    const getMenuPath = useRef(false);
    const prevPathname = useRef(false);
    const prevIsMobile = useRef(isMobile);
    const prevPlatform = useRef(platform);
    const queryStr = useRef('');
    const isRendered = useRef(false);
    useEffect(() => {
        prevIsMobile.current = isMobile;
        prevPlatform.current = platform;
        // 不是第一次 render 才更新資料
        if (Object.keys(navData).length && isRendered.current) {
            console.log('================= update =================');
            updateNavData();
        }
    }, [isMobile, isLogin, platform]);

    //處理假登入路徑
    useEffect(() => {
        // console.log('pa', router.asPath, router.asPath.indexOf('/SinoTrade_login'));
        if (router.asPath.indexOf('/SinoTrade_login') >= 0) {
            setShowBigLogin(true);
        }
    }, [router.asPath]);

    useEffect(() => {
        // pwaHandler();
        doLoginHashHandler();
        const timeout = setTimeout(() => {
            // 第一次 render 且 redux 沒資料時，才 fetch 資料。setTimeout 是為了等 isMobile, isLogin, platform 的狀態就位。
            if (!Object.keys(navData).length) {
                console.log('================= first =================');
                updateNavData();
            }
        }, 10);

        isRendered.current = true;

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    useEffect(() => {
        // console.log('path', router.pathname, router.query);
        if (router.pathname.indexOf('/SinoTrade_login') >= 0) {
            setShowBigLogin(true);
        }

        if (noVerifyRouter()) {
            setVerifySuccess(true);
        } else {
            showPageHandler(router.pathname);
        }
    }, [router.pathname]);

    useEffect(() => {
        queryStr.current = router.query;

        if (router.query.nav != '0') {
            setShowNav(true);
        } else {
            setShowNav(false);
        }
    }, [router.query]);

    useEffect(() => {
        if (showMask || showLogin || showBigLogin) {
            document.body.style.overflow = 'hidden';
        }

        if (!showMask && !showLogin && !showBigLogin) {
            document.body.style.overflow = 'auto';
        }
    }, [showMask, showLogin, showBigLogin]);

    // 不需檢查是否登入的頁面
    const noVerifyRouter = () => {
        const arr = noVerifyRouters.filter(val => {
            if (router.pathname.indexOf(val) >= 0) {
                return true;
            }
        });

        if (arr.length != 0 || router.pathname === '/') {
            return true;
        } else {
            return false;
        }
    };

    //inside iframe 逾時處理
    const doLoginHashHandler = () => {
        if (window.location.hash === '#doLogin') {
            const path = getCookie('doLoginPage') || getCookie('afterLoginUrl');
            removeCookie('doLoginPage');
            removeCookie('afterLoginUrl');
            const arr = path.split('/');
            const redirectPath = '/' + arr[arr.length - 1];
            dispatch(setCurrentPath(redirectPath));
            router.push('', `/SinoTrade_login`, { shallow: true });
        }
    };

    const updateNavData = () => {
        const data = {
            token: getToken(),
            platform: prevPlatform.current,
            isMobile: prevIsMobile.current,
        };
        dispatch(setNavItems(data));
    };

    //驗證有沒有瀏覽頁面的權限
    const showPageHandler = async function (pathname) {
        try {
            let currentPath = pathname.substr(1);
            const token = getToken();
            const res = await verifyMenu(currentPath, token);
            if (!res.data.result.isPass) {
                //P = 權限不足, N = 需要登入
                if (res.data.result.errorCode === 'N') {
                    noLoginPage(res.data.result.message);
                } else {
                    noPermissionPage(res.data.result.message);
                }
            } else {
                setVerifySuccess(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const noLoginPage = function (errMsg) {
        prevPathname.current = router.pathname + objectToQueryHandler(queryStr.current);
        setVerifySuccess(false);
        notification.error({
            placement: 'topRight',
            message: errMsg,
            duration: 2,
            top: 70,
        });

        setTimeout(() => {
            // router.back();
            if (currentPath === '' || currentPath === '/') {
                router.push('/');
            } else {
                router.push(currentPath.substr(1));
            }
        }, 200);

        setTimeout(() => {
            dispatch(showLoginHandler(true));
        }, 1500);
    };

    //無權限頁面處理
    const noPermissionPage = function (errMsg) {
        prevPathname.current = router.pathname + objectToQueryHandler(queryStr.current);
        router.push('/errPage');
        setVerifySuccess(false);
        setVerifyErrMsg(errMsg);
        setTimeout(() => {
            dispatch(showLoginHandler(true));
        }, 500);
    };

    //pwa註冊
    const pwaHandler = function () {
        if (process.env.NODE_ENV === 'production') {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker
                    .register(`${process.env.NEXT_PUBLIC_SUBPATH}/sw.js`, { scope: '/newweb/' })
                    .then(() => {
                        // console.log('SW registered!', reg);
                    })
                    .catch(err => console.log('Boo!', err));
            }
        }
    };

    // 關閉login popup
    const closeHandler = useCallback(() => {
        dispatch(showLoginHandler(false));
    }, []);

    // 跳出的登入popup，登入成功後的處理
    const loginSuccessHandler = useCallback(() => {
        updateNavData();
        dispatch(showLoginHandler(false));
        dispatch(setIsLogin(true));
        getMenuPath.current = false;
        setTimeout(() => {
            notification.success({
                placement: 'topRight',
                message: '登入成功',
                duration: 3,
                top: 70,
            });
            if (prevPathname.current) {
                router.push(prevPathname.current);
            }
        }, 500);
        setTimeout(() => {
            CAHandler(getToken());
        }, 700);
    }, []);

    // 關閉大的login
    const bigLoginClose = function () {
        setShowBigLogin(false);
        bigLoginRouterHandler('close');
    };

    //登入頁 登入成功
    const bigLoginSuccess = function () {
        setShowBigLogin(false);
        dispatch(setIsLogin(true));
        bigLoginRouterHandler();
        CAHandler(getToken());
    };

    const bigLoginRouterHandler = function (type) {
        if (router.pathname.indexOf('errPage') != -1 && prevPathname.current != null && type == null) {
            router.push(prevPathname.current);
            return;
        }

        if (router.query.currentPath != null) {
            changeRouterByCurrentPath(decodeURIComponent(router.query.currentPath));
        } else {
            changeRouterByCurrentPath(currentPath);
        }
    };

    const changeRouterByCurrentPath = function (path) {
        if (!path) {
            router.push('/');
        } else {
            if (path === '/') {
                router.push(path, '/', { shallow: true });
            } else {
                router.push(path, `${path.substr(1)}`, { shallow: true });
            }
        }
    };

    //傳錯誤訊息給errpage
    const renderChildren = function (errMsg) {
        return React.Children.map(children, child => {
            // console.log('path', router.pathname.indexOf('errPage'), router.pathname);
            if (router.pathname.indexOf('errPage') != -1) {
                return React.cloneElement(child, {
                    errMsg,
                });
            } else return child;
        });
    };

    const maskClickHandler = function () {
        if (isMobile) {
            dispatch(setMenuOpen(false));
            dispatch(setMaskVisible(false));
        }
    };
    return (
        <>
            <Head>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="https://richclub.azureedge.net/public/apple-icon-180x180.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href={`${process.env.NEXT_PUBLIC_SUBPATH}/images/icons/32.png`}
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href={`${process.env.NEXT_PUBLIC_SUBPATH}/images/icons/16.png`}
                />
                <meta name="theme-color" content="#000000" />
                <link rel="mask-icon" href={`${process.env.NEXT_PUBLIC_SUBPATH}/images/icons/32.png`} color="#5bbad5" />
                {/* <link rel="manifest" href={`${process.env.NEXT_PUBLIC_SUBPATH}/manifest.json`} /> */}
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                />
            </Head>
            <CaHead />
            {noCloseBtns.includes(platform) ? (
                <MyTransition isVisible={showBigLogin}>
                    <SinoTradeLogin onClose={bigLoginClose} successHandler={bigLoginSuccess} />
                </MyTransition>
            ) : (
                <MyTransition isVisible={showBigLogin} classNames={isMobile ? 'loginMobile' : 'login'}>
                    <SinoTradeLogin onClose={bigLoginClose} successHandler={bigLoginSuccess} />
                </MyTransition>
            )}
            <MyTransition isVisible={showLogin} classNames={'opacity'}>
                <Login popup={true} isPC={!isMobile} onClose={closeHandler} successHandler={loginSuccessHandler} />
            </MyTransition>
            <Header showNav={showNav} />
            {isMobile && showMask && <div onClick={maskClickHandler} className="page__mask"></div>}
            <div className="page__container">{verifySuccess && renderChildren(verifyErrMsg)}</div>
            <Footer showNav={showNav} />
            <style jsx>{`
                .page__container {
                    min-height: 500px;
                    margin-top: ${showNav ? '70px' : '0'};
                }
                .page__mask {
                    position: fixed;
                    top: 70px;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    z-index: 400;
                    height: calc(100% - 70px);
                    background-color: rgba(0, 0, 0, 0.7);
                }
            `}</style>
            <style jsx global>{`
                .ant-modal-mask {
                    z-index: 9999;
                }
                .ant-modal-wrap {
                    z-index: 10000;
                }
            `}</style>
        </>
    );
});

Layout.propTypes = {
    children: PropTypes.element,
};

Layout.displayName = 'Layout';

export default Layout;
