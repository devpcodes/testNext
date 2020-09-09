import React, { useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {useSelector, useDispatch} from 'react-redux';
import Head from 'next/head';
import Header from '../includes/header';
import Footer from '../includes/footer';
import { resize, isLogin, showLoginHandler } from '../../actions/components/layouts/action';
import { checkLogin } from '../../services/components/layouts/checkLogin';
import { checkMobile } from '../../services/components/layouts/checkMobile';
import Login from '../includes/sinotradeLogin/login';

const Layout = React.memo((props) => {
    const dispatch = useDispatch();
    const showLogin = useSelector(store => store.layout.showLogin);
    const isMobile = useSelector(store => store.layout.isMobile);

    useEffect(() => {
        pwaHandler();
        window.addEventListener('resize', resizeHandler);
        resizeHandler();
        dispatch(isLogin(checkLogin()))
        return () => {
            window.removeEventListener('resize', resizeHandler, false);
        };
    }, []);

    const pwaHandler = function() {
        if(process.env.NODE_ENV === 'production'){
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js', {scope: '/'})
                .then(reg => {
                    // console.log('SW registered!', reg);
                })
                .catch(err => console.log('Boo!', err));
            }
        }
    }

    const resizeHandler = function() {
        let winWidth = document.body.clientWidth;
        if(checkMobile(winWidth)){
            dispatch(resize(winWidth, true));
        }else{
            dispatch(resize(winWidth, false));
        }
    }

    const showLoginClick = function() {
        dispatch(showLoginHandler(true));
    }

    const closeHandler = function(){
        dispatch(showLoginHandler(false));
    }
    return (
        <>
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="https://richclub.azureedge.net/public/apple-icon-180x180.png"/>
                <link rel='icon' type='image/png' sizes='32x32' href='/images/icons/32.png' />
                <link rel='icon' type='image/png' sizes='16x16' href='/images/icons/16.png' />
                <meta name='theme-color' content='#000000' />
                <link rel='mask-icon' href='/images/icons/32.png' color='#5bbad5' />
                <link rel='manifest' href='/manifest.json' />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
            </Head>
            <AnimatePresence>
                {showLogin && (
                    <motion.div
                        key="login"
                        initial={{opacity: 0 }}
                        animate={{opacity: 1, transition:{duration: .3}}}
                        exit={{opacity: 0, transition:{duration: .3}}}
                    >
                        <Login popup={true} isPC={!isMobile} onClose={closeHandler}/>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <Header showLoginClick={showLoginClick}/>
                {props.children}
            <Footer/>
        </>
    )
})

// export default connect(mapStateToProps, { resize, isLogin, showLoginHandler })(Layout);
export default Layout;