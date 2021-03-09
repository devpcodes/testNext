import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
const MyTransition = ({ isVisible, children, classNames }) => {
    // const isMobile = useSelector(store => store.layout.isMobile);
    const [isMobile, setIsMobile] = useState(true);
    useEffect(() => {
        let winWidth = window.innerWidth;
        if (winWidth <= 768) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
        console.log('mobile', isMobile);
    }, []);
    return (
        <>
            <CSSTransition unmountOnExit in={isVisible} timeout={300} classNames={classNames} appear>
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

                .loginMobile-enter {
                    opacity: 0;
                }
                .loginMobile-enter-active {
                    transform: translate(-768px, 0);
                    opacity: 1;
                    transition: all 0ms;
                }
                .loginMobile-enter-done {
                    transform: translate(0.1px, 0);
                    transition: transform 400ms;
                }
                .loginMobile-exit {
                    transform: translate(0.1px, 0);
                    opacity: 1;
                }
                .loginMobile-exit-active {
                    transform: translate(-768px, 0);
                    transition: all 500ms;
                }

                .login-enter {
                    transform: scale(0);
                }
                .login-enter-active {
                    transform: scale(1);
                    transition: all 300ms;
                }
                .login-exit {
                    transform: scale(1);
                    opacity: 1;
                }
                .login-exit-active {
                    transform: scale(0);
                    opacity: 0;
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

                .accounts-enter {
                    transform: translate(100%, 0);
                }
                .accounts-enter-active {
                    transform: translate(0, 0);
                    transition: all 300ms;
                }
                .accounts-exit {
                    transform: translate(0, 0);
                }
                .accounts-exit-active {
                    transform: translate(100%, 0);
                    transition: all 300ms;
                }

                .loginMobile2-enter {
                    transform: translate(-768px, 0);
                    opacity: 1;
                    transition: all 0ms;
                }
                .loginMobile2-enter-active {
                    transform: translate(0.1px, 0);
                    transition: transform 400ms;
                }
                .loginMobile2-exit {
                    transform: translate(0.1px, 0);
                    opacity: 1;
                }
                .loginMobile2-exit-active {
                    transform: translate(-768px, 0);
                    transition: all 600ms;
                }
            `}</style>
        </>
    );
};
MyTransition.propTypes = {
    isVisible: PropTypes.bool,
    children: PropTypes.element,
    classNames: PropTypes.string,
};
export default MyTransition;
