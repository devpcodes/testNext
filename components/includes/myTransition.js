import React, { useEffect, useState } from 'react';
import { CSSTransition } from "react-transition-group";
import { useSelector } from 'react-redux';
const MyTransition = ({ isVisible, children, classNames }) => {
    // const isMobile = useSelector(store => store.layout.isMobile);
    const [isMobile, setIsMobile] = useState(true);
    useEffect(() => {
        let winWidth = window.innerWidth;
        if(winWidth <= 768){
            setIsMobile(true);
        }else{
            setIsMobile(false);
        }
    }, []);
    return (
        <>
            <CSSTransition
                unmountOnExit
                in={isVisible}
                timeout={300}
                classNames={classNames}
                appear
            >
                {children}
            </CSSTransition>

            <style global jsx>{`
                .opacity-enter {
                    opacity: 0;
                }
                .opacity-enter-active {
                    opacity: 1;
                    transition: opacity 300ms;
                }
                .opacity-exit {
                    opacity: 1;
                }
                .opacity-exit-active {
                    opacity: 0;
                    transition: opacity 300ms;
                }
                
                .login-enter {
                    transform: ${isMobile && classNames === 'login' ? 'translate(-100%, 0)' : 'scale(0)'};
                }
                .login-enter-active {
                    transform: ${isMobile && classNames === 'login' ? 'translate(0, 0)' : 'scale(1)'};
                    transition: all 300ms;
                    
                }
                .login-exit {
                    transform: ${isMobile && classNames === 'login' ? 'translate(0, 0)' : 'scale(1)'};
                    opacity: 1;
                }
                .login-exit-active {
                    transform: ${isMobile && classNames === 'login' ? 'translate(-100%, 0)' : 'scale(0)'};
                    opacity: ${isMobile ? 1 : 0};
                    transition: all 300ms;
                }

                .maxHeight-enter {
                    max-height: 0;
                    overflow: hidden;
                }
                .maxHeight-enter-active {
                    overflow: hidden;
                    max-height: 490px;
                    transition: all 400ms ease-in;
                }
                .maxHeight-exit {
                    overflow: hidden;
                    max-height: 490px;
                }
                .maxHeight-exit-active {
                    overflow: hidden;
                    max-height: 0;
                    transition: all 300ms ease-out;
                }


            `}</style>
        </>
    )
}

export default MyTransition