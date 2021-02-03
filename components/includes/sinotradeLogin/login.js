import { useRef, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'antd';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Form, Input, Button, Checkbox } from 'antd';
import logo from '../../../resources/images/logo/logo-icon.svg';
import check from '../../../resources/images/components/login/ic-check.png';
import close from '../../../resources/images/components/login/ic-closemenu.png';
import closeMobile from '../../../resources/images/pages/SinoTrade_login/ic-close.png';
import { submit } from '../../../services/components/login/login';
import { checkBrowser } from '../../../services/checkBrowser';
import { useLoginClosBtn } from '../../../hooks/useLoginClosBtn';
import logoDark from '../../../resources/images/logo/logo-dark.svg';
import udnAD from '../../../resources/images/components/login/udnAD.jpg';
import MD5 from 'crypto-js/md5';
// import ReCaptchaComponent from './ReCaptchaComponent';

const Login = function ({ popup, isPC, onClose, successHandler }) {
    const router = useRouter();
    const [form] = Form.useForm();
    const accountInput = useRef(null);

    const recaptchaReady = useSelector(store => store.layout.recaptchaReady);
    const platform = useSelector(store => store.general.platform);

    const [encryptAccount, setEncryptAccount] = useState('');
    const [accountFontSize, setAccountFontSize] = useState('1.8rem');
    const [isLoading, setIsLoading] = useState(false);
    const [isIframe, setIsIframe] = useState(false);

    const [containerHeight, setContainerHeight] = useState('100vh');
    // const [reCaptchaReady, setReCaptchaReady] = useState(false);
    const noCloseBtn = useLoginClosBtn();
    useEffect(() => {
        console.log('didmount');
        const account = localStorage.getItem('userID');
        if (account) {
            console.log('account', account);
            form.setFieldsValue({
                account,
            });
            const encryptStr = encryptionHandler(account);
            setEncryptAccount(encryptStr);
            setAccountFontSize('0rem');
            form.setFieldsValue({
                remember: true,
            });
        } else {
            setTimeout(() => {
                if (checkIframe()) {
                    setEncryptAccount('');
                    form.setFieldsValue({
                        account: '',
                    });
                    setAccountFontSize('1.8rem');
                }
            }, 1000);
        }

        window.addEventListener('keypress', winKeyDownHandler, false);
        window.addEventListener('resize', handleResize);
        handleResize();
        if (checkIframe()) {
            setIsIframe(true);
        }

        // setTimeout(() => {
        //     // console.log(form.getFieldValue('account').length);

        // }, 500);

        return () => {
            window.removeEventListener('keypress', winKeyDownHandler, false);
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    // useEffect(() => {
    //     if (document.getElementsByClassName('grecaptcha-badge').length > 0) {
    //         document.getElementsByClassName('grecaptcha-badge')[0].style.display = 'none';
    //     }
    // });

    let account;
    const fieldsChange = function (changedFields) {
        if (changedFields.length !== 0) {
            if (changedFields[0].name[0] === 'account') {
                // encryptionHandler(changedFields[0].value)
                account = changedFields[0].value;
            }
        }
    };

    const handleResize = () => {
        let imgWidth = 860;
        let newH = Math.round((272 * window.innerWidth) / imgWidth);
        console.log('nnn', newH);
        setContainerHeight(window.innerHeight - newH + 'px');
    };

    const winKeyDownHandler = function (e) {
        // if (e.key === 'Enter') {
        //     form.validateFields()
        //         .then(() => {
        //             finishHandler();
        //         })
        //         .catch(() => {
        //             console.log('err');
        //         });
        // }
    };

    const encryptionHandler = function (str) {
        if (str.length > 3) {
            const firstStr = str.substr(0, 3);
            const lastStr = str.substr(7, 9);
            let star = '';
            for (let index = 0; index < str.length - 3; index++) {
                if (index >= 4) {
                    break;
                }
                star += '*';
            }
            str = firstStr + star + lastStr;
        }
        return str;
    };

    const blurHandler = function () {
        if (account) {
            const encryptStr = encryptionHandler(account);
            setEncryptAccount(encryptStr);
            setAccountFontSize('0rem');
        }
    };

    const accClickHandler = function () {
        form.setFieldsValue({
            account: '',
        });
        setEncryptAccount('');
        setAccountFontSize('1.8rem');
        accountInput.current.focus();
    };

    //登入動作處理
    const finishHandler = async function () {
        if (isLoading) {
            return false;
        }
        var errors = form.getFieldsError();
        errors = errors.filter(val => {
            return val.errors.length !== 0;
        });
        if (errors.length === 0 && recaptchaReady) {
            setIsLoading(true);
            //reCAPTCHA
            window.grecaptcha.ready(() => {
                window.grecaptcha
                    .execute(process.env.NEXT_PUBLIC_reCAPTCHA, { action: 'submit' })
                    .then(async reCAPTCHAToken => {
                        try {
                            const res = await submit(
                                form.getFieldValue('account'),
                                MD5(form.getFieldValue('password')).toString(),
                                reCAPTCHAToken,
                            );
                            setIsLoading(false);
                            if (res.data.success) {
                                //記身份證字號
                                if (form.getFieldValue('remember')) {
                                    localStorage.setItem('userID', form.getFieldValue('account'));
                                } else {
                                    localStorage.removeItem('userID');
                                }

                                if (!checkFirstLogin(res.data)) {
                                    //傳資料給神策
                                    sensorsHandler(form.getFieldValue('account'));
                                }
                            }
                        } catch (error) {
                            setIsLoading(false);
                            sensors.track('LoginResults', {
                                is_success: false,
                                failure_reason: '',
                                is_login: false,
                                page_url: window.location.href,
                                page_title: document.title,
                                page_url_path: window.location.pathname,
                            });
                        }
                    });
            });
        }
    };

    const checkFirstLogin = function (data) {
        if (data.result.isFirstLogin != null && data.result.isFirstLogin) {
            Modal.success({
                content: `初次登入，請修改密碼後重新登入，謝謝`,
                onOk() {
                    onClose();
                    if (isIframe) {
                        iframeHandler(location.origin + process.env.NEXT_PUBLIC_SUBPATH + '/User_ChangePassword');
                        setTimeout(() => {
                            // router.push('', `/SinoTrade_login`, { shallow: true });
                            location.href = `${process.env.NEXT_PUBLIC_SUBPATH}/SinoTrade_login`;
                        }, 1000);
                    } else {
                        router.push('/User_ChangePassword');
                    }
                },
            });
            return true;
        }

        return false;
    };

    //傳資料給神策(暫拿掉)
    const sensorsHandler = function (user_id) {
        console.log('browser', checkBrowser(), process.env.NEXT_PUBLIC_ENV);
        if (checkBrowser() === 'ie' && process.env.NEXT_PUBLIC_ENV === 'development') {
            afterSensors();
            return;
        }
        //登入完傳值給神策
        // afterSensors();
        try {
            sensors.login(user_id, function () {
                sensors.track(
                    'LoginResults',
                    {
                        is_success: true,
                        failure_reason: '',
                        is_login: true,
                        page_url: window.location.href,
                        page_title: document.title,
                        page_url_path: window.location.pathname,
                    },
                    afterSensors,
                );
            });
        } catch (error) {
            afterSensors();
        }
    };

    //神策傳送成功後 做的事
    const afterSensors = function () {
        //iframe登入處理(來自舊理財網)
        if (isIframe) {
            iframeHandler(location.origin + process.env.NEXT_PUBLIC_SUBPATH);
        } else {
            successHandler();
        }
    };

    //忘記密碼
    const forgetPassword = function () {
        if (isIframe) {
            iframeHandler(location.origin + process.env.NEXT_PUBLIC_SUBPATH + '/Service_ForgetPassword');
        } else {
            onClose();
            router.push(`/Service_ForgetPassword`);
        }
    };

    //判斷是不是iframe
    const checkIframe = function () {
        try {
            return window.self !== window.top;
        } catch (error) {}
        return false;
    };

    //參考舊理財網
    const iframeHandler = function (url) {
        parent.postMessage(
            {
                origin: 'NewWeb',
                redirectURL: url,
                msg: '',
            },
            '*',
        );

        if (form.getFieldValue('remember') && localStorage.getItem('userID')) {
            form.setFieldsValue({
                password: '',
            });
        } else {
            setEncryptAccount('');
            setAccountFontSize('1.8rem');
            form.setFieldsValue({
                account: '',
            });
            form.setFieldsValue({
                password: '',
            });
        }
    };

    const signUpHandler = function (e) {
        e.preventDefault();
        iframeHandler(
            'https://www.sinotrade.com.tw/openact?strProd=0037&strWeb=0035&utm_campaign=NewWeb&utm_source=NewWeb&utm_medium=footer開戶按鈕',
        );
    };

    const overflowHandler = () => {
        if (popup) {
            if (isPC) {
                return {
                    overflowY: 'inherit',
                };
            } else {
                return {
                    overflowY: 'auto',
                };
            }
        }

        if (isIframe) {
            return {
                overflowY: 'hidden',
            };
        } else {
            return {
                overflowY: 'auto',
            };
        }
    };
    // const reCaptchaLoadReady = () => {
    //     setReCaptchaReady(true);
    // };
    const getSignUpUrl = () => {
        if (platform === 'udn') {
            return 'https://www.sinotrade.com.tw/openact?strProd=0037&strWeb=0035&utm_campaign=OP_inchannel&utm_source=newweb&utm_medium=login';
        } else {
            return 'https://www.sinotrade.com.tw/openact?strProd=0037&strWeb=0035&utm_campaign=NewWeb&utm_source=NewWeb&utm_medium=footer開戶按鈕';
        }
    };

    const logoHandler = () => {
        // let title = null;
        if (isIframe) {
            return;
        }

        if (platform === 'udn' && !isPC) {
            return (
                <div className="udn__container">
                    <img className="logo__dark" src={logoDark} alt="永豐金證券" />
                </div>
            );
        } else {
            if (isPC) {
                return (
                    <>
                        <p className="login__title">歡迎來到永豐金證券</p>
                    </>
                );
            } else {
                return (
                    <>
                        <div className="login__logo"></div>
                        <p className="login__title">歡迎來到永豐金證券</p>
                    </>
                );
            }
        }
    };

    const adHandler = () => {
        if (platform === 'udn' && !isPC) {
            return (
                <div className="ad_container">
                    <a href="https://www.sinotrade.com.tw/openact?strProd=0037&strWeb=0035&utm_campaign=OP_inchannel&utm_source=newweb&utm_medium=login">
                        <img className="ad__img" src={udnAD} />
                    </a>
                </div>
            );
        }
    };

    return (
        <div className="login__container">
            {/* <ReCaptchaComponent onLoadReady={reCaptchaLoadReady} /> */}
            <div className="login__box" style={overflowHandler()}>
                {!isPC && !isIframe && !noCloseBtn ? (
                    <div
                        className="close__box"
                        onClick={onClose}
                        onKeyDown={event => {
                            if (event.key === 'Enter') {
                                onClose();
                            }
                        }}
                        role="button"
                        tabIndex="0"
                    >
                        <img alt="關閉" src={closeMobile} />
                    </div>
                ) : null}
                {popup && !noCloseBtn ? (
                    <div
                        className="close"
                        onClick={onClose}
                        onKeyDown={event => {
                            if (event.key === 'Enter') {
                                onClose();
                            }
                        }}
                        role="button"
                        tabIndex="0"
                    >
                        <span className="close__img"></span>
                    </div>
                ) : null}
                {logoHandler()}
                {/* {isPC ? null : !isIframe && <div className="login__logo"></div>} */}
                {/* {!isIframe && <p className="login__title">歡迎來到永豐金證券</p>} */}
                {isPC ? (
                    <div className="loginService__box">
                        <span className="service__title">登入後享受更多服務</span>
                        <div className="service__infoBox">
                            <span className="service__item">下單交易</span>
                            <span className="service__item">帳務損益</span>
                            <span className="service__item">更多個人化服務</span>
                        </div>
                    </div>
                ) : null}
                <Form
                    form={form}
                    name="complex-form"
                    onFieldsChange={fieldsChange}
                    onFinish={finishHandler}
                    initialValues={{ remember: false }}
                    style={{ marginTop: isIframe ? '12px' : 0 }}
                >
                    <div className="account__box">
                        <Form.Item
                            hasFeedback
                            name="account"
                            label=""
                            validateFirst
                            rules={[
                                {
                                    required: true,
                                    message: '請輸入身份證字號',
                                },
                                {
                                    max: 10,
                                    message: '超過限定字數',
                                },
                                {
                                    validator: (rule, value) => {
                                        const patt = /^[a-zA-Z0-9]{0,}$/;
                                        if (patt.test(value)) {
                                            return Promise.resolve();
                                        } else {
                                            return Promise.reject('含錯誤字元');
                                        }
                                    },
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    transition: 'none',
                                    width: '100%',
                                    height: isIframe ? '34px' : '54px',
                                    border: 'solid 1px #e6ebf5',
                                    fontSize: accountFontSize,
                                }}
                                placeholder="請輸入身份證字號"
                                onBlur={blurHandler}
                                ref={accountInput}
                            />
                        </Form.Item>
                        <span
                            role="presentation"
                            style={{ display: encryptAccount ? 'block' : 'none', color: '#737373', width: '100%' }}
                            onClick={accClickHandler}
                        >
                            {encryptAccount}
                        </span>
                    </div>

                    <Form.Item
                        hasFeedback
                        name="password"
                        label=""
                        validateFirst
                        rules={[
                            {
                                required: true,
                                message: '必填欄位',
                            },
                            {
                                validator: (rule, value) => {
                                    if (value.length >= 1 && value.length <= 12) {
                                        return Promise.resolve();
                                    } else {
                                        return Promise.reject('輸入字數錯誤');
                                    }
                                },
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="密碼(7-12位元)"
                            style={{
                                width: '100%',
                                height: isIframe ? '34px' : '54px',
                                border: 'solid 1px #e6ebf5',
                                fontSize: '1.8rem',
                            }}
                        />
                    </Form.Item>
                    <div className="remember__box">
                        <Form.Item name="remember" rules={[]} noStyle valuePropName="checked">
                            <Checkbox style={{ fontSize: '1.8rem', color: '#0d1623' }}>記住我的身份證字號</Checkbox>
                        </Form.Item>
                        <a onClick={forgetPassword} className="a__link forgetPassword">
                            忘記密碼
                        </a>
                    </div>

                    <Form.Item label="">
                        <Button
                            loading={isLoading}
                            type="primary"
                            htmlType="submit"
                            style={{ marginTop: isIframe ? '10px' : '20px' }}
                        >
                            登入
                        </Button>
                    </Form.Item>
                </Form>
                <p className="a__box" style={{ marginBottom: '0.5rem', marginTop: '-19px' }}>
                    {!isIframe ? (
                        <a
                            target="_blank"
                            href={getSignUpUrl()}
                            // href="https://www.sinotrade.com.tw/openact?strProd=0037&strWeb=0035&utm_campaign=NewWeb&utm_source=NewWeb&utm_medium=footer開戶按鈕"
                            className="a__link"
                        >
                            還不是永豐金證券客戶
                        </a>
                    ) : (
                        <a
                            target="_blank"
                            href="https://www.sinotrade.com.tw/openact?strProd=0037&strWeb=0035&utm_campaign=NewWeb&utm_source=NewWeb&utm_medium=footer開戶按鈕"
                            className="a__link"
                            onClick={signUpHandler}
                        >
                            還不是永豐金證券客戶
                        </a>
                    )}
                </p>
                <div style={{ textAlign: 'center', color: '#a9b6cb', fontSize: '1.2rem', letterSpacing: '0.3px' }}>
                    此頁面受到 Google reCAPTCHA 保護，以確認您不是機器人，進一步了解
                    <a href="https://policies.google.com/privacy" style={{ color: '#3d7699' }}>
                        {' '}
                        《隱私權聲明》{' '}
                    </a>{' '}
                    與
                    <a href="https://policies.google.com/terms" style={{ color: '#3d7699' }}>
                        {' '}
                        《服務條款》{' '}
                    </a>{' '}
                    。
                </div>
            </div>
            {popup ? (
                <div
                    className="overLay"
                    onClick={onClose}
                    onKeyDown={event => {
                        if (event.key === 'Enter') {
                            onClose();
                        }
                    }}
                    role="button"
                    tabIndex="0"
                ></div>
            ) : null}
            {adHandler()}
            <style jsx>{`
                .login__container {
                    position: relative;
                    display: ${popup ? 'block' : isPC ? 'inline-block' : 'block'};
                    z-index: 9999;
                }
                .close {
                    width: 52px;
                    height: 52px;
                    background-color: #0d1623;
                    position: absolute;
                    top: -52px;
                    right: 0;
                    cursor: pointer;
                }
                .close__box {
                    text-align: right;
                    padding-top: 10px;
                }
                .close__img {
                    background: url(${close}) no-repeat center center;
                    width: 32px;
                    height: 33px;
                    margin-top: 10px;
                    margin-left: 10px;
                    display: inline-block;
                    transition: all 0.1s;
                }
                .close__img:hover {
                    transform: scale(0.9, 0.9) translateZ(0);
                }
                /* .login__box {
                    position: ${popup ? 'fixed' : 'static'};
                    width: ${isPC ? '512px' : '101%'};
                    height: ${isPC ? '548px' : '100vh'};
                    z-index: 9999;
                    top: ${isPC ? 'calc((100vh - 548px)/2)' : '0'};
                    left: 50%;
                    transform: ${popup ? 'translate(-50%, 0)' : 'translate(0, 0)'};
                    padding: ${isPC ? '0 41px' : '0 20px'};
                    padding-top: ${popup ? '0' : '1px'};
                    background-color: ${isPC ? '#f9fbff' : 'white'};
                    border: ${popup ? 'none' : 'solid 1px #e6ebf5'};
                    overflow-y: ${isIframe ? 'hidden' : 'auto'};
                } */
                .overLay {
                    position: fixed;
                    display: ${isPC ? 'block' : 'none'};
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 2;
                    cursor: pointer;
                }
                /* .login__logo {
                    width: 8.7rem;
                    height: 9rem;
                    background: url(${logo}) no-repeat center center;
                    margin: 0 auto;
                    margin-top: 37px;
                } */
                .input::placeholder {
                    font-size: 1.8rem;
                }
                .forgetPassword {
                    float: right;
                }
                .a__link {
                    font-size: 1.8rem;
                    color: #c43826;
                }
                p {
                    text-align: center;
                    font-size: 2.4rem;
                    font-weight: bold;
                    color: #0d1623;
                    margin-top: 20px;
                }
                /* .login__title {
                    font-size: ${isPC ? '3.6rem' : '2.4rem'};
                    text-align: ${isPC ? 'left' : 'center'};
                    margin-top: ${isPC ? '42px' : '20px'};
                    margin-bottom: ${isPC ? '6px' : '20px'};
                } */
                .service__title {
                    display: block;
                    font-size: 1.8rem;
                    font-weight: bold;
                    margin-top: -5px;
                    text-align: left;
                }
                .service__item {
                    display: inline-block;
                    width: calc(100% / 3);
                    color: #7086b1;
                    font-size: 1.8rem;
                    font-weight: bold;
                    margin: 17px 0;
                    position: relative;
                    text-align: left;
                }
                .service__item::before {
                    content: url(${check});
                    position: absolute;
                    top: 3px;
                    left: -25px;
                }
                .service__infoBox {
                    padding-left: 25px;
                    margin-bottom: 10px;
                }
                .a__box {
                    margin-top: -10px;
                }
                .account__box {
                    position: relative;
                }
                .account__box span {
                    position: absolute;
                    top: ${isIframe ? '4px' : '14px'};
                    font-size: 1.8rem;
                    padding-left: 12px;
                }
                .remember__box {
                    text-align: left;
                }
            `}</style>
            <style global jsx>{`
                .login__box {
                    position: ${popup ? 'fixed' : 'static'};
                    width: ${isPC ? '512px' : '101%'};
                    height: ${isPC ? '548px' : '100vh'};
                    z-index: 9999;
                    top: ${isPC ? 'calc((100vh - 548px)/2)' : '0'};
                    left: 50%;
                    transform: ${popup ? 'translate(-50%, 0)' : 'translate(0, 0)'};
                    padding: ${isPC ? '0 41px' : platform === 'udn' ? '7%' : '0 20px'};
                    padding-top: ${popup ? '0' : '1px'};
                    background-color: ${isPC ? '#f9fbff' : 'white'};
                    border: ${popup ? 'none' : 'solid 1px #e6ebf5'};
                    overflow-y: ${isIframe ? 'hidden' : 'auto'};
                }
                @media (max-width: 330px), print {
                    .login__box {
                        padding: ${isPC ? '0 41px' : '0 20px'};
                    }
                }
                .ad_container {
                    position: absolute;
                    top: ${containerHeight || '100vh'};
                    left: 0;
                    min-width: 100%;
                    z-index: 10000;
                }
                .ad__img {
                    width: 100%;
                }
                .udn__container {
                    margin-bottom: 20px;
                    margin-top: 30px;
                }
                @media (max-width: 330px), print {
                    .udn__container {
                        margin-top: 20px;
                    }
                }
                .logo__dark {
                    width: 223px;
                    /* height: 53px; */
                }

                .login__logo {
                    width: 8.7rem;
                    height: 9rem;
                    background: url(${logo}) no-repeat center center;
                    margin: 0 auto;
                    margin-top: 37px;
                }
                .login__title {
                    font-size: ${isPC ? '3.6rem' : '2.4rem'};
                    text-align: ${isPC ? 'left' : 'center'};
                    margin-top: ${isPC ? '42px' : '20px'};
                    margin-bottom: ${isPC ? '6px' : '20px'};
                    font-weight: bold;
                    color: rgb(13, 22, 35);
                }
                .grecaptcha-badge {
                    display: none !important;
                }
                .login__container .ant-btn-primary {
                    background: #c43826;
                    height: ${isIframe ? '34px' : '54px'};
                    border: none;
                    width: 100%;
                    font-size: 1.8rem;
                }
                .login__container .ant-btn-primary:hover {
                    background: #9d1200;
                }
                .ant-modal-confirm-body .ant-modal-confirm-content {
                    font-size: 1.6rem;
                }
                .ant-form-item {
                    margin: ${isIframe ? '0 0 15px' : '0 0 24px'};
                }
                .ant-modal {
                    top: ${isIframe ? '0' : '100px'};
                }

                /* Change Autocomplete styles in Chrome*/
                input:-webkit-autofill,
                input:-webkit-autofill:hover,
                input:-webkit-autofill:focus,
                textarea:-webkit-autofill,
                textarea:-webkit-autofill:hover,
                textarea:-webkit-autofill:focus,
                select:-webkit-autofill,
                select:-webkit-autofill:hover,
                select:-webkit-autofill:focus {
                    transition: background-color 5000s ease-in-out 0s;
                }
            `}</style>
        </div>
    );
};

Login.propTypes = {
    isPC: PropTypes.bool,
    popup: PropTypes.bool,
    onClose: PropTypes.func,
    successHandler: PropTypes.func,
};

export default Login;
