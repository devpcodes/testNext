import { Children, cloneElement, useEffect, useState, useRef, useCallback, memo } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { notification, Modal, Button } from 'antd';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../includes/header';
import Footer from '../includes/footer';
import Login from '../includes/sinotradeLogin/login';
import SinoTradeLogin from '../includes/sinotradeLogin/SinoTradeLogin';
import MyTransition from '../includes/myTransition';
import CaHead from '../includes/CaHead';
import ReCaptchaComponent from '../includes/sinotradeLogin/ReCaptchaComponent';
import BirthdayChecker from '../includes/BirthdayChecker';

import {
    showLoginHandler,
    setNavItems,
    setMaskVisible,
    setMenuOpen,
    setRecaptchaReady,
    setModal,
} from '../../store/components/layouts/action';
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
import modalCloseIcon from '../../resources/images/components/tradingAccount/acc_close.svg';
import modalTitleConfirmIcon from '../../resources/images/components/tradingAccount/attention-error.svg';
import modalTitleConfirmIconSell from '../../resources/images/components/tradingAccount/attention-error-sell.svg';
import { checkServer } from '../../services/checkServer';

const noVerifyRouters = ['goOrder', 'errPage'];

const Layout = memo(({ children }) => {
    const router = useRouter();
    const [verifySuccess, setVerifySuccess] = useState(false);
    const [showBigLogin, setShowBigLogin] = useState(false);
    const [verifyErrMsg, setVerifyErrMsg] = useState('????????????');
    const [showNav, setShowNav] = useState(false);
    const [overFlow, setOverFlow] = useState('auto');

    // window ??????????????????????????? isMobile
    const isMobile = useCheckMobile();
    // ????????????/???????????????????????????????????????????????? { isLogin, accounts, userSettings }
    const { isLogin } = useUser();
    // ????????????????????????
    const platform = usePlatform();

    const dispatch = useDispatch();
    const showLogin = useSelector(store => store.layout.showLogin);
    const navData = useSelector(store => store.layout.navData);
    const currentPath = useSelector(store => store.general.currentPath);
    const showMask = useSelector(store => store.layout.showMask);
    const modal = useSelector(store => store.layout.modal);

    const getMenuPath = useRef(false);
    const prevPathname = useRef(false);
    const prevIsMobile = useRef(isMobile);
    const prevPlatform = useRef(platform);
    const queryStr = useRef('');
    const isRendered = useRef(false);
    useEffect(() => {
        if (sessionStorage.getItem('nav') === '0') {
            setShowNav(false);
        }
    }, [router.pathname]);
    useEffect(() => {
        prevIsMobile.current = isMobile;
        prevPlatform.current = platform;
        // ??????????????? render ???????????????
        if (Object.keys(navData).length && isRendered.current) {
            console.log('================= update =================');
            updateNavData();
        }
    }, [isMobile, isLogin, platform]);

    //?????????????????????
    useEffect(() => {
        // console.log('pa', router.asPath, router.asPath.indexOf('/SinoTrade_login'));
        if (router.asPath.indexOf('/SinoTrade_login') >= 0) {
            setShowBigLogin(true);
        }

        //???????????????
        if (router.asPath === '/subscriptionArea/') {
            router.push('/subscriptionArea/Subscription');
        }
        if (router.asPath === '/subscriptionArea/Loans/') {
            router.push('/subscriptionArea/MySubscription/Loans');
        }
    }, [router.asPath]);

    useEffect(() => {
        pwaHandler();
        doLoginHashHandler();
        const timeout = setTimeout(() => {
            // ????????? render ??? redux ?????????????????? fetch ?????????setTimeout ???????????? isMobile, isLogin, platform ??????????????????
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
        sessionAddSource();
        if (router.query.nav != '0' && sessionStorage.getItem('nav') !== '0') {
            setShowNav(true);
        } else {
            setShowNav(false);
            sessionStorage.setItem('nav', '0');
        }
    }, [router.query]);

    useEffect(() => {
        console.log('===========', showMask, showLogin, showBigLogin);
        if (showMask || showLogin || showBigLogin) {
            // document.body.style.overflow = 'hidden';
            setOverFlow('hidden');
        }

        if (!showMask && !showLogin && !showBigLogin) {
            // document.body.style.overflow = 'auto';
            setOverFlow('auto');
        }
    }, [showMask, showLogin, showBigLogin]);

    useEffect(() => {
        setTimeout(() => {
            document.body.style.overflow = overFlow;
        }, 500);
    }, [overFlow]);

    // useEffect(() => {
    //     console.log(router);
    //     if (isLogin && localStorage.getItem('INCB') === 'true') {
    //         BirthdayChecker();
    //     }
    //     if (localStorage.getItem('INCB') === null) {
    //         localStorage.setItem('INCB', true);
    //     }
    // }, [router.query]);

    // ?????????????????????????????????
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

    //inside iframe ????????????
    const doLoginHashHandler = () => {
        if (window.location.hash === '#doLogin') {
            const path = getCookie('doLoginPage') || getCookie('afterLoginUrl');
            removeCookie('doLoginPage');
            removeCookie('afterLoginUrl');
            const arr = path.split('/');
            const redirectPath = '/' + arr[arr.length - 1];
            dispatch(setCurrentPath(redirectPath));
            router.push(router.pathname, `/SinoTrade_login`, { shallow: true });
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

    // ????????????????????????????????????????????????????????????
    const sessionAddSource = () => {
        const sourceList = {
            mma: 'mma',
            udn: 'udn',
            line: 'u168',
            cnyes: 'cnyes',
            gugu: 'gugu',
        };
        const itemkey = router.query.platform ? router.query.platform.toLocaleLowerCase() : false;
        if (itemkey && sourceList[itemkey]) {
            sessionStorage.setItem('source', sourceList[itemkey]);
        }
    };

    //????????????????????????????????????
    const showPageHandler = async function (pathname) {
        try {
            let currentPath = pathname.substr(1);
            const token = getToken();
            const res = await verifyMenu(currentPath, token);
            if (!res.data.result.isPass) {
                //P = ????????????, N = ????????????
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
        console.log('prevPathname', prevPathname.current);
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
                router.push(currentPath);
            }
        }, 200);

        setTimeout(() => {
            dispatch(showLoginHandler(true));
        }, 1500);
    };

    //?????????????????????
    const noPermissionPage = function (errMsg) {
        prevPathname.current = router.pathname + objectToQueryHandler(queryStr.current);
        router.push('/errPage');
        setVerifySuccess(false);
        setVerifyErrMsg(errMsg);
        setTimeout(() => {
            dispatch(showLoginHandler(true));
        }, 500);
    };

    //pwa??????
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

    // ??????login popup
    const closeHandler = useCallback(() => {
        dispatch(showLoginHandler(false));
    }, []);

    // ???????????????popup???????????????????????????
    const loginSuccessHandler = useCallback(() => {
        updateNavData();
        dispatch(showLoginHandler(false));
        dispatch(setIsLogin(true));
        getMenuPath.current = false;
        setTimeout(() => {
            if (prevPathname.current) {
                router.push(prevPathname.current);
            }
        }, 500);
        // setTimeout(() => {
        //     CAHandler(getToken());
        // }, 700);
    }, []);

    // ????????????login
    const bigLoginClose = function () {
        setShowBigLogin(false);
        bigLoginRouterHandler('close');
    };

    //????????? ????????????
    const bigLoginSuccess = function () {
        setShowBigLogin(false);
        dispatch(setIsLogin(true));
        bigLoginRouterHandler();
        // CAHandler(getToken());
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
                router.push(path, `${path}`, { shallow: true });
            }
        }
    };

    //??????????????????errpage
    const renderChildren = function (errMsg) {
        return Children.map(children, child => {
            // console.log('path', router.pathname.indexOf('errPage'), router.pathname);
            if (router.pathname.indexOf('errPage') != -1) {
                return cloneElement(child, {
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

    const reCaptchaLoadReady = () => {
        dispatch(setRecaptchaReady(true));
    };

    const getModalIconHandler = useCallback(
        (type, bs) => {
            switch (type) {
                case 'confirm':
                    if (bs === 'S') {
                        return modalTitleConfirmIconSell;
                    }
                    return modalTitleConfirmIcon;
                default:
                    return modalTitleConfirmIcon;
            }
        },
        [modal],
    );

    const getModalFooter = useCallback(
        (type, text, ok) => {
            switch (type) {
                case 'info':
                    return (
                        <Button
                            type={'primary'}
                            onClick={
                                ok != null
                                    ? ok
                                    : () => {
                                          dispatch(setModal({ visible: false, footer: null }));
                                      }
                            }
                        >
                            {text}
                        </Button>
                    );
                default:
                    break;
            }
        },
        [modal],
    );
    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.gstatic.com"></link>
                <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"></link>
            </Head>
            <ReCaptchaComponent onLoadReady={reCaptchaLoadReady} />
            <CaHead />
            {noCloseBtns.includes(platform) || currentPath === '' || currentPath === '/goOrder' ? (
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
            {checkServer() ? (
                <div className="page__container">{children}</div>
            ) : (
                <div className="page__container">{verifySuccess && renderChildren(verifyErrMsg)}</div>
            )}
            <Footer showNav={showNav} />
            <Modal
                {...modal}
                title={
                    <>
                        {modal.noTitleIcon ? <></> : <img src={getModalIconHandler(modal.type, modal.bs)} />}
                        <span
                            style={{
                                marginLeft: modal.noTitleIcon ? 0 : '5px',
                            }}
                        >
                            {modal.title}
                        </span>
                    </>
                }
                className="confirm__container"
                okText={modal.okText || '??????'}
                cancelText={modal.cancelText || '??????'}
                closeIcon={modal.noCloseIcon ? <></> : <img src={modalCloseIcon} />}
                onCancel={
                    modal.onCancel != null
                        ? modal.onCancel
                        : () => {
                              dispatch(setModal({ visible: false }));
                          }
                }
                footer={
                    modal.footer != null ? modal.footer : getModalFooter(modal.type, modal.okText || '??????', modal.onOk)
                }
                destroyOnClose={true}
                width={modal.width || '382px'}
            >
                {modal.content}
            </Modal>
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
                * {
                    font-family: 'Roboto', Arial, '?????? Pro', 'PingFang TC', 'LiHei Pro', '???????????????',
                        'Microsoft JhengHei', sans-serif;
                }
                .grecaptcha-badge {
                    display: none !important;
                }
                .ant-modal-mask {
                    z-index: 9999;
                }
                .ant-modal-wrap {
                    z-index: 10000;
                }

                .confirm__container {
                    width: 382px;
                }
                .confirm__container .ant-modal-content {
                    border-radius: 4px;
                }
                .confirm__container .ant-modal-header {
                    // background: #f2f5fa;
                    background: white;
                }
                .confirm__container .ant-btn-primary {
                    background: #f45a4c;
                    border-radius: 2px;
                    border: solid 1px rgba(37, 74, 145, 0);
                    width: 86px;
                    height: 40px;
                    color: white !important;
                    font-size: 1.6rem;
                }
                .confirm__container .ant-modal-body {
                    padding-bottom: 36px;
                    font-size: 1.6rem;
                    color: #0d1623;
                }
                .confirm__container .ant-btn {
                    width: 86px;
                    height: 40px;
                    border-radius: 2px;
                    border: solid 1px #e6ebf5;
                    color: #0d1623;
                    font-size: 1.6rem;
                }
                .confirm__container .ant-modal-title {
                    font-size: 2rem;
                    font-weight: bold;
                }
                .confirm__container .ant-modal-title span {
                    margin-left: 5px;
                    vertical-align: middle;
                }
                .confirm__container .ant-modal-footer {
                    padding: 19px 22px;
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
