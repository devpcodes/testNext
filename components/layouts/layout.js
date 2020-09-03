import React, { useEffect } from 'react';
import Head from 'next/head';
import Header from '../includes/header';
import Footer from '../includes/footer';
import { connect } from 'react-redux'
import { resize, isLogin, showLoginHandler } from '../../actions/components/layouts/action';
import { checkLogin } from '../../services/components/layouts/checkLogin';
import { checkMobile } from '../../services/components/layouts/checkMobile';
import SinoTradeLogin from '../includes/sinotradeLogin/SinoTradeLogin'
const Layout = React.memo((props) => {
    useEffect(() => {
        pwaHandler();
        window.addEventListener('resize', resizeHandler);
        resizeHandler();
        props.isLogin(checkLogin());

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
            props.resize(winWidth, true);
        }else{
            props.resize(winWidth, false);
        }
    }

    const showLoginClick = function() {
        props.showLoginHandler(true);
    }

    const showLoginClose = function() {
        props.showLoginHandler(false);
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
            <SinoTradeLogin isVisible={props.showLogin} onClose={showLoginClose}/>
            <Header showLoginClick={showLoginClick}/>
                {props.children}
            <Footer/>
        </>
    )
})

function mapStateToProps(state) {
	const { showLogin } = state.layout
	return {
        showLogin,
	}
}

export default connect(mapStateToProps, { resize, isLogin, showLoginHandler })(Layout);