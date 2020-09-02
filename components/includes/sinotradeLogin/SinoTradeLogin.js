import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Head from 'next/head';
import Login from './login';
import loginImg from '../../../resorces/images/pages/SinoTrade_login/group-3.png';
import logo from '../../../resorces/images/pages/SinoTrade_login/logo-dark.png';
import close from '../../../resorces/images/pages/SinoTrade_login/ic-close.png'

const SinoTradeLogin = function({ isVisible, onClose }) {
    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        resizeHandler();

        return () => {
            window.removeEventListener('resize', resizeHandler, false);
        };
    }, []);
    
    const [isPC, setIsPC] = useState(false);

    const resizeHandler = function() {
        let winWidth = document.body.clientWidth;
        if(winWidth <= 1000){
            setIsPC(false)
        }else{
            setIsPC(true)
        }
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="child"
                    initial={{ 
                        scale: 0, 
                        originX: "50vw", 
                        originY: "50vh",  
                    }}
                    animate={{ 
                        scale: 1,       
                        originX: "50vw", 
                        originY: "50vh",            
                        transition: {
                            duration: .3
                        }
                    }}
                    exit={{ scale: 0, opacity: 0}}
                >
                    <div className="loginPage__container">
                        <Head>
                            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
                        </Head>
                        <div className="page__box">
                            <div className="login__header">
                                <img src={logo} alt="永豐金證券"/>
                                <img className="close" src={close} onClick={onClose}/>
                            </div>
                            {isPC ? <img className="login__img" src={loginImg} alt="永豐金證券"/> : null}
                            <Login popup={false} isPC={isPC}/>
                        </div>
                        <style jsx>{`
                            .loginPage__container {
                                position: ${isPC ? 'fixed' : 'static'};
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

export default SinoTradeLogin;