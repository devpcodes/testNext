import React, { useEffect, useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Modal, notification } from 'antd';
import { useRouter } from 'next/router';
import Head from 'next/head';
import jwt_decode from 'jwt-decode';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../includes/header';
import Footer from '../includes/footer';
import Login from '../includes/sinotradeLogin/login';
import SinoTradeLogin from '../includes/sinotradeLogin/SinoTradeLogin';
import MyTransition from '../includes/myTransition';
import CaHead from '../includes/CaHead';

import { showLoginHandler, setNavItems, setMaskVisible, setMenuOpen } from '../../store/components/layouts/action';
import { setIsLogin, setAccounts, setUserSettings, getUserSettings, setCurrentAccount } from '../../store/user/action';
import { setDomain, setCurrentPath } from '../../store/general/action';

import { checkLogin } from '../../services/components/layouts/checkLogin';
import { getCookie, removeCookie } from '../../services/components/layouts/cookieController';
import { accountGroupByType } from '../../services/user/accountGroupByType';
import { getToken } from '../../services/user/getToken';
import { objectToQueryHandler } from '../../services/objectToQueryHandler';
import { verifyMenu } from '../../services/components/layouts/verifyMenu';
import { checkCert, applyCert, renewCert } from '../../services/webCa';
import { getDomain } from '../../services/getDomain';

import { useCheckMobile } from '../../hooks/useCheckMobile';

const Layout = React.memo(({ children }) => {
    const router = useRouter();
    const [verifySuccess, setVerifySuccess] = useState(false);
    const [showBigLogin, setShowBigLogin] = useState(false);
    const [verifyErrMsg, setVerifyErrMsg] = useState('權限不足');

    const dispatch = useDispatch();
    const showLogin = useSelector(store => store.layout.showLogin);
    const isMobile = useSelector(store => store.layout.isMobile);
    const isLogin = useSelector(store => store.user.isLogin);
    const navData = useSelector(store => store.layout.navData);
    const userSettings = useSelector(store => store.user.userSettings);
    const accounts = useSelector(store => store.user.accounts);
    const domain = useSelector(store => store.general.domain);
    const currentPath = useSelector(store => store.general.currentPath);
    const showMask = useSelector(store => store.layout.showMask);

    const getMenuPath = useRef(false);
    // const needLogin = useRef(false);
    const prevPathname = useRef(false);
    // const isAuthenticated = useRef(true);
    const prevIsMobile = useRef(isMobile);
    const prevDomain = useRef(domain);
    const queryStr = useRef('');
    const isRendered = useRef(false);

    // window 寬度改變處理，回傳 isMobile
    useCheckMobile();

    useEffect(() => {
        prevIsMobile.current = isMobile;
        prevDomain.current = domain;

        // 不是第一次 render 才更新資料
        if (Object.keys(navData).length && isRendered.current) {
            console.log('================= update =================');

            updateNavData();
        }
    }, [isMobile, isLogin, domain]);

    //處理假登入路徑
    useEffect(() => {
        console.log('pa', router.asPath, router.asPath.indexOf('/SinoTrade_login'));
        if (router.asPath.indexOf('/SinoTrade_login') >= 0) {
            setShowBigLogin(true);
        }
    }, [router.asPath]);

    useEffect(() => {
        const updateUserSettings = () => {
            const userId = getCookie('user_id');
            userId && dispatch(getUserSettings(userId));
        };

        if (isLogin) {
            const tokenVal = jwt_decode(getToken());
            dispatch(setAccounts(tokenVal.acts_detail));
            updateUserSettings();
        } else {
            dispatch(setAccounts([]));
            dispatch(setUserSettings({}));
        }
    }, [isLogin]);

    useEffect(() => {
        // pwaHandler();
        doLoginHashHandler();
        const timeout = setTimeout(() => {
            // 第一次 render 且 redux 沒資料時，才 fetch 資料。setTimeout 是為了等 isMobile, isLogin, domain 的狀態就位。
            if (!Object.keys(navData).length) {
                console.log('================= first =================');

                updateNavData();
            }
        }, 10);

        sourceHandler();

        if (checkLogin()) {
            dispatch(setIsLogin(true));
        }

        isRendered.current = true;

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    useEffect(() => {
        const getDefaultAccount = accounts => {
            const groupedAccount = accountGroupByType(accounts);
            if (groupedAccount.S.length) {
                const defaultStockAccount = groupedAccount.S.find(
                    account => `${account.broker_id}-${account.account}` === userSettings.defaultStockAccount,
                );
                return defaultStockAccount || groupedAccount.S[0];
            } else if (groupedAccount.H.length) {
                return groupedAccount.H[0];
            } else if (groupedAccount.F.length) {
                return groupedAccount.F[0];
            } else {
                return accounts[0];
            }
        };
        const defaultAccount = getDefaultAccount(accounts) || {};
        dispatch(setCurrentAccount(defaultAccount));
    }, [userSettings]);

    useEffect(() => {
        console.log('path', router.pathname, router.query);
        if (router.pathname.indexOf('/SinoTrade_login') >= 0) {
            setShowBigLogin(true);
        }

        if (router.pathname.indexOf('errPage') >= 0 || router.pathname === '/') {
            setVerifySuccess(true);
        } else {
            showPageHandler(router.pathname);
        }
    }, [router.pathname]);

    useEffect(() => {
        queryStr.current = router.query;
    }, [router.query]);

    useEffect(() => {
        if (showMask || showLogin || showBigLogin) {
            document.body.style.overflow = 'hidden';
        }

        if (!showMask && !showLogin && !showBigLogin) {
            document.body.style.overflow = 'auto';
        }
    }, [showMask, showLogin, showBigLogin]);

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

    // 依據來源設置 fetch 選單所帶的 domain 值
    const sourceHandler = () => {
        dispatch(setDomain(getDomain()));
    };

    const updateNavData = () => {
        const data = {
            token: getToken(),
            domain: prevDomain.current,
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
                    .register(`${process.env.NEXT_PUBLIC_SUBPATH}sw.js`, { scope: '/newweb/' })
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
            console.log('path', router.pathname.indexOf('errPage'), router.pathname);
            if (router.pathname.indexOf('errPage') != -1) {
                return React.cloneElement(child, {
                    errMsg,
                });
            } else return child;
        });
    };

    //憑證檢查
    const CAHandler = function (token) {
        const tokenVal = jwt_decode(token);
        const checkData = checkCert(tokenVal.user_id);
        if (checkData.suggestAction != 'None') {
            setTimeout(() => {
                Modal.confirm({
                    title: '憑證系統',
                    content: `您現在無憑證。是否要載入憑證 ?`,
                    onOk() {
                        caResultDataHandler(checkData.suggestAction, tokenVal.user_id, token);
                    },
                    okText: '是',
                    cancelText: '否',
                    onCancel() {
                        sessionStorage.setItem('deployCA', false);
                    },
                });
            }, 600);
        }
    };

    //憑證安裝
    const caResultDataHandler = async function (suggestAction, userIdNo, token) {
        if (suggestAction === 'ApplyCert') {
            const msg = await applyCert(userIdNo, token);
            console.log('ApplyCert憑證回傳訊息', msg);
            notification.open({
                message: '系統訊息',
                description: msg,
                top: 70,
            });
        }
        if (suggestAction == 'RenewCert') {
            const msg = await renewCert(userIdNo, token);
            console.log('RenewCert憑證回傳訊息', msg);
            notification.open({
                message: '系統訊息',
                description: msg,
                top: 70,
            });
        }
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
                    href={`${process.env.NEXT_PUBLIC_SUBPATH}images/icons/32.png`}
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href={`${process.env.NEXT_PUBLIC_SUBPATH}images/icons/16.png`}
                />
                <meta name="theme-color" content="#000000" />
                <link rel="mask-icon" href={`${process.env.NEXT_PUBLIC_SUBPATH}images/icons/32.png`} color="#5bbad5" />
                <link rel="manifest" href={`${process.env.NEXT_PUBLIC_SUBPATH}manifest.json`} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                />
            </Head>
            <CaHead />
            <MyTransition isVisible={showBigLogin} classNames={isMobile ? 'loginMobile' : 'login'}>
                <SinoTradeLogin onClose={bigLoginClose} successHandler={bigLoginSuccess} />
            </MyTransition>
            <MyTransition isVisible={showLogin} classNames={'opacity'}>
                <Login popup={true} isPC={!isMobile} onClose={closeHandler} successHandler={loginSuccessHandler} />
            </MyTransition>
            <Header />
            {isMobile && showMask && <div onClick={maskClickHandler} className="page__mask"></div>}
            <div className="page__container">{verifySuccess && renderChildren(verifyErrMsg)}</div>
            <Footer />
            <style jsx>{`
                .page__container {
                    min-height: 500px;
                    margin-top: 70px;
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
export default Layout;
