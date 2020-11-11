import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Modal } from 'antd';
import { notification } from 'antd';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';
import Header from '../includes/header';
import Footer from '../includes/footer';
import { resize, showLoginHandler, setNavItems } from '../../store/components/layouts/action';
import { setIsLogin, setAccounts, setUserSettings, getUserSettings, setCurrentAccount } from '../../store/user/action';
import { setDomain } from '../../store/general/action';
import { checkLogin } from '../../services/components/layouts/checkLogin';
import { checkMobile } from '../../services/components/layouts/checkMobile';
import Login from '../includes/sinotradeLogin/login';
import SinoTradeLogin from '../includes/sinotradeLogin/SinoTradeLogin';
import MyTransition from '../includes/myTransition';
import { getCookie } from '../../services/components/layouts/cookieController';
import { accountGroupByType } from '../../services/user/accountGroupByType';
import { objectToQueryHandler } from '../../services/objectToQueryHandler';
import { verifyMenu } from '../../services/components/layouts/verifyMenu';
import CaHead from '../includes/CaHead';
import { checkCert, applyCert, renewCert } from '../../services/webCa';
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

    useEffect(() => {
        prevIsMobile.current = isMobile;
        prevDomain.current = domain;

        // 不是第一次 render 才更新資料
        if (Object.keys(navData).length && isRendered.current) {
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
            const tokenVal = jwt_decode(getCookie('token'));
            dispatch(setAccounts(tokenVal.acts_detail));
            updateUserSettings();
        } else {
            dispatch(setAccounts([]));
            dispatch(setUserSettings({}));
        }
    }, [isLogin]);

    useEffect(() => {
        // pwaHandler();
        window.addEventListener('resize', resizeHandler);
        resizeHandler();
        const timeout = setTimeout(() => {
            // 第一次 render 且 redux 沒資料時，才 fetch 資料。setTimeout 是為了等 isMobile, isLogin, domain 的狀態就位。
            if (!Object.keys(navData).length) {
                updateNavData();
            }
        }, 10);
        sourceHandler();

        if (checkLogin()) {
            dispatch(setIsLogin(true));
        }

        isRendered.current = true;

        return () => {
            window.removeEventListener('resize', resizeHandler, false);
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

    // 由 queryString 取得來源
    const getSourceFromQueryString = () => {
        const params = new URLSearchParams(window.location.search);
        let sourceFromQueryString;

        if (params.has('platform')) {
            switch (params.get('platform')) {
                case 'Line':
                    sourceFromQueryString = 'Line';
                    break;
                default:
                    sourceFromQueryString = '';
                    break;
            }
        }

        return sourceFromQueryString;
    };

    // 依據來源設置 fetch 選單所帶的 domain 值
    const sourceHandler = () => {
        const sourceFromQueryString = getSourceFromQueryString();
        const sourceFromSessionStorage = sessionStorage.getItem('platform') || sessionStorage.getItem('source');
        let source = sourceFromQueryString || sourceFromSessionStorage;
        let domain;

        switch (source) {
            case 'mma':
                domain = 'mma';
                break;
            case 'Line':
                domain = 'line';
                break;
            default:
                domain = 'newweb';
                break;
        }

        dispatch(setDomain(domain));
    };

    const updateNavData = () => {
        const data = {
            token: getCookie('token'),
            domain: prevDomain.current,
            isMobile: prevIsMobile.current,
        };
        dispatch(setNavItems(data));
    };

    //驗證有沒有瀏覽頁面的權限
    const showPageHandler = async function (pathname) {
        let currentPath = pathname.substr(1);
        const token = getCookie('token');
        const res = await verifyMenu(currentPath, token);
        if (!res.data.result.isPass) {
            noPermissionPage(res.data.result.message);
        } else {
            setVerifySuccess(true);
        }
    };

    //無權限頁面處理
    const noPermissionPage = function (errMsg) {
        prevPathname.current = router.pathname + objectToQueryHandler(queryStr.current);
        router.push('/errPage', `${process.env.NEXT_PUBLIC_SUBPATH}errPage`);
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

    // WINDOW寬度改變處理
    const resizeHandler = function () {
        let winWidth = window.innerWidth;
        if (checkMobile(winWidth)) {
            dispatch(resize(winWidth, true));
        } else {
            dispatch(resize(winWidth, false));
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
            router.push(
                prevPathname.current,
                `${process.env.NEXT_PUBLIC_SUBPATH}${prevPathname.current.split('/')[1]}`,
            );
        }, 500);
        setTimeout(() => {
            CAHandler(getCookie('token'));
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
        CAHandler(getCookie('token'));
    };

    const bigLoginRouterHandler = function (type) {
        if (router.pathname.indexOf('errPage') != -1 && prevPathname.current != null && type == null) {
            router.push(
                prevPathname.current,
                `${process.env.NEXT_PUBLIC_SUBPATH}${prevPathname.current.split('/')[1]}`,
            );
            return;
        }
        if (!currentPath) {
            router.push('/', `${process.env.NEXT_PUBLIC_SUBPATH}`);
        } else {
            router.push(currentPath, `${process.env.NEXT_PUBLIC_SUBPATH}${currentPath.substr(1)}`, { shallow: true });
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
            console.log('await msg', msg);
        }
        if (suggestAction == 'RenewCert') {
            const msg = await renewCert(userIdNo, token);
            console.log('await msg', msg);
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
            {isMobile && showMask && <div className="page__mask"></div>}
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
