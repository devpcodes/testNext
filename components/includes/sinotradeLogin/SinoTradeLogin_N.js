import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import { notification } from 'antd';
import PropTypes from 'prop-types';
import Login from './login';
import loginImg from '../../../resources/images/pages/SinoTrade_login/img-login.jpg';
import logo from '../../../resources/images/logo/logo-dark.svg';
import close from '../../../resources/images/pages/SinoTrade_login/ic-close.png';
import { useLoginClosBtn } from '../../../hooks/useLoginClosBtn';

const SinoTradeLogin = function ({ onClose, successHandler }) {
    const router = useRouter();
    const [isPC, setIsPC] = useState(true);
    const [isIframe, setIsIframe] = useState(false);
    const noCloseBtn = useLoginClosBtn();
    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        resizeHandler();
        if (checkIframe()) {
            setIsIframe(true);
        }
        console.log('nocloseBtn', noCloseBtn);
        return () => {
            window.removeEventListener('resize', resizeHandler, false);
        };
    }, []);

    const resizeHandler = function () {
        let winWidth = window.innerWidth;
        if (winWidth <= 1000) {
            setIsPC(false);
        } else {
            setIsPC(true);
        }
    };

    const loginSuccessFun = function () {
        // notification.success({
        //     placement: 'topRight',
        //     message: '登入成功',
        //     duration: 3,
        //     top: 70,
        // });
        successHandler();
    };

    const loginFailFun = function () {};

    const checkIframe = function () {
        try {
            return window.self !== window.top;
        } catch (error) {}
        return false;
    };

    const logoClickHandler = function (e) {
        e.preventDefault();
        onClose();
        router.push('/');
    };

    return (
        <div className="loginPage__container">
            <div className="page__box">
                <div className="login__header">
                    <a onClick={logoClickHandler}>
                        <img src={logo} alt="永豐金證券" />
                    </a>
                    {!noCloseBtn ? (
                        <a
                            onClick={e => {
                                e.preventDefault();
                                onClose();
                            }}
                            role="button"
                        >
                            <img className="close" src={close} alt="關閉" />
                        </a>
                    ) : null}
                </div>
                {isPC ? (
                    <a
                        href="https://www.sinotrade.com.tw/openact?strProd=0037&strWeb=0035&utm_campaign=NewWeb&utm_source=NewWeb&utm_medium=footer開戶按鈕"
                        target="_blank"
                    >
                        <img className="login__img" src={loginImg} alt="永豐金證券" />
                    </a>
                ) : null}
                <Login
                    popup={false}
                    isPC={isPC}
                    onClose={onClose}
                    successHandler={loginSuccessFun}
                    failedHandler={loginFailFun}
                />
            </div>

            <style jsx>{`
                .loginPage__container {
                    position: fixed;
                    top: 0;
                    width: 100vw;
                    height: 100vh;
                    background-color: ${isPC ? 'white' : 'transparent'};
                    /* background-color: white; */
                    z-index: 999;
                    overflow-x: hidden;
                    overflow-y: ${isIframe || !isPC ? 'hidden' : 'auto'};
                }
                .page__box {
                    width: ${isPC ? '960px' : '100%'};
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                .login__img {
                    display: inline-block;
                    vertical-align: top;
                    margin-right: 19px;
                    width: 400px;
                }
                .login__header {
                    margin-left: 32px;
                    margin-bottom: 45px;
                    display: block;
                }
                @media (max-width: 1000px), print {
                    .login__header {
                        display: none;
                    }
                }
                .close {
                    float: right;
                    margin-right: 20px;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
};
SinoTradeLogin.propTypes = {
    onClose: PropTypes.func,
    successHandler: PropTypes.func,
};

export default SinoTradeLogin;
