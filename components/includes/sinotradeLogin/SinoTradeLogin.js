import React, { useEffect, useState } from 'react';
import { notification } from 'antd';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from "framer-motion";
import Login from './login';
import loginImg from '../../../resorces/images/pages/SinoTrade_login/group-3.png';
import logo from '../../../resorces/images/pages/SinoTrade_login/logo-dark.png';
import close from '../../../resorces/images/pages/SinoTrade_login/ic-close.png'

const SinoTradeLogin = function({ isVisible, onClose, successHandler }) {
    const [isPC, setIsPC] = useState(true);

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        resizeHandler();

        return () => {
            window.removeEventListener('resize', resizeHandler, false);
        };
    }, []);
    
    const resizeHandler = function() {
        let winWidth = document.body.clientWidth;
        if(winWidth <= 1000){
            setIsPC(false)
        }else{
            setIsPC(true)
        }
    }

    const loginSuccessFun = function(){
        notification.success({
            placement: 'topRight',
            message: '登入成功',
            duration: 3
        });
        setTimeout(() => {
            successHandler();
        }, 200);
    }

    const loginFailFun = function(){

    }

    const initial = {
        scale: 0, 
        originX: "50vw", 
        originY: "50vh",  
    }

    const animate = { 
        scale: 1, 
        opacity: 1,      
        originX: "50vw", 
        originY: "50vh",            
        transition: {
            duration: .3,
        }
    }

    const exit = {
        scale: 0, 
        opacity: 0,
        transition: {
            duration: .3,
            ease: 'easeIn'
        }
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="child"
                    initial={isPC ? initial : {x: `-${document != null ? document.body.clientWidth : 0}px`}}
                    animate={isPC ? animate : {x: 0, transition: {duration: .3}}}
                    exit={isPC? exit : {x: `-${document != null ? document.body.clientWidth : 100}px`, transition: {ease: 'easeOut',duration: .2}}}
                >
                    <div className="loginPage__container">
                        <div className="page__box">
                            <div className="login__header">
                                <img src={logo} alt="永豐金證券"/>
                                <img className="close" src={close} onClick={onClose}/>
                            </div>
                            {isPC ? <img className="login__img" src={loginImg} alt="永豐金證券"/> : null}
                            <Login popup={false} isPC={isPC} onClose={onClose} successHandler={loginSuccessFun} failedHandler={loginFailFun}/>
                        </div>

                        <style jsx>{`
                            .loginPage__container {
                                position: fixed;
                                width: 100vw;
                                height: 100vh;
                                background-color: white;
                                z-index: 999;
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
                            }
                            .login__header {
                                margin-left: 32px;
                                margin-bottom: 45px;
                                display: block;
                            }
                            @media (max-width:1000px), print{
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
                </motion.div>
            )}
        </AnimatePresence>
 
        
    )
}
SinoTradeLogin.propTypes = {
    isVisible: PropTypes.bool,
    onClose: PropTypes.func,
    successHandler: PropTypes.func
}

export default SinoTradeLogin;