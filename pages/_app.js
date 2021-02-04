import Head from 'next/head';

import 'antd/dist/antd.min.css';
import '../resources/styles/globals.css';
import { useEffect } from 'react';
import TagManager from 'react-gtm-module';
import { wrapper } from '../store/store';
import Layout from '../components/layouts/layout';
import { initGA, logPageView } from '../services/analytics';

const tagManagerArgs = {
    gtmId: 'GTM-KHJQQ4C',
};

function MyApp({ Component, pageProps, router }) {
    useEffect(() => {
        //googletagmanager
        TagManager.initialize(tagManagerArgs);

        //神策
        let sensorGetCookie = function (cname) {
            var name = cname + '=';
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return '';
        };
        let sensorIsLogin = false;
        let sensorUserId = sensorGetCookie('user_id');
        if (sensorUserId !== '') {
            sensorIsLogin = true;
        }
        var sensorsPlatform = 'PC';
        sensorsPlatform = window.screen.width <= 768 ? '移動站' : 'PC端';
        var sensorsShowLog = location.host.indexOf('localhost') >= 0 ? true : false;
        var sensorsServerUrl =
            location.host === 'www.sinotrade.com.tw'
                ? 'https://DMP.sinotrade.com.tw/sa?project=default'
                : 'http://128.110.5.145:8106/sa?project=default';
        (function (para) {
            var p = para.sdk_url,
                n = para.name,
                w = window,
                d = document,
                s = 'script',
                x = null,
                y = null;
            if (typeof w['sensorsDataAnalytic201505'] !== 'undefined') {
                return false;
            }
            w['sensorsDataAnalytic201505'] = n;
            w[n] =
                w[n] ||
                function (a) {
                    return function () {
                        (w[n]._q = w[n]._q || []).push([a, arguments]);
                    };
                };
            var ifs = [
                'track',
                'quick',
                'register',
                'registerPage',
                'registerOnce',
                'trackSignup',
                'trackAbtest',
                'setProfile',
                'setOnceProfile',
                'appendProfile',
                'incrementProfile',
                'deleteProfile',
                'unsetProfile',
                'identify',
                'login',
                'logout',
                'trackLink',
                'clearAllRegister',
                'getAppStatus',
            ];
            for (var i = 0; i < ifs.length; i++) {
                w[n][ifs[i]] = w[n].call(null, ifs[i]);
            }
            if (!w[n]._t) {
                (x = d.createElement(s)), (y = d.getElementsByTagName(s)[0]);
                x.async = 1;
                x.src = p;
                x.setAttribute('charset', 'UTF-8');
                w[n].para = para;
                y.parentNode.insertBefore(x, y);
            }
        })({
            sdk_url:
                location.protocol +
                '//' +
                location.host +
                `${process.env.NEXT_PUBLIC_SUBPATH}` +
                '/js/sensorsdata.min.js',
            heatmap_url:
                location.protocol + '//' + location.host + `${process.env.NEXT_PUBLIC_SUBPATH}` + '/js/heatmap.min.js',
            name: 'sensors',
            server_url: sensorsServerUrl,
            heatmap: {},
            show_log: sensorsShowLog,
            send_type: 'ajax',
        });
        sensors.registerPage({
            is_login: sensorIsLogin,
            platform: sensorsPlatform,
        });
        sensors.quick('autoTrack');

        //GA
        gaHandler();
    }, []);
    const gaHandler = () => {
        if (!window.GA_INITIALIZED) {
            initGA();
            window.GA_INITIALIZED = true;
        }
        logPageView();
    };
    const getLayout = Component.getLayout || (page => <Layout children={page} />);
    const renderComp = getLayout(<Component {...pageProps} />);
    return (
        <>
            <Head>
                {/* <script type="text/javascript" src={`${process.env.NEXT_PUBLIC_SUBPATH}/js/solclient.js`}></script> */}
                <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1" />
                {/* Target older browsers like IE 10 and lower. */}
                <link rel="icon" href={`${process.env.NEXT_PUBLIC_SUBPATH}/favicon.ico`} />
                {/* The classic favicon displayed in tabs. */}
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href={`${process.env.NEXT_PUBLIC_SUBPATH}/images/icons/16.png`}
                />
                {/* Target safari on MacOS. */}
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href={`${process.env.NEXT_PUBLIC_SUBPATH}/images/icons/32.png`}
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="192x192"
                    href={`${process.env.NEXT_PUBLIC_SUBPATH}/images/icons/192.png`}
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="512x512"
                    href={`${process.env.NEXT_PUBLIC_SUBPATH}/images/icons/512.png`}
                />
                {/* Used for Safari pinned tabs. */}
                <link
                    rel="mask-icon"
                    href={`${process.env.NEXT_PUBLIC_SUBPATH}/images/icons/logo.svg`}
                    color="#c43826"
                />
                <link rel="shortcut icon" href={`${process.env.NEXT_PUBLIC_SUBPATH}/favicon.ico`} type="image/x-icon" />
                {/* Used by Android Chrome for the "Add to home screen" icon and settings. */}
                <link rel="manifest" href={`${process.env.NEXT_PUBLIC_SUBPATH}/manifest.json`} />
                {/* Used by Chrome, Firefox OS, and opera to change the browser address bar. */}
                <meta name="theme-color" content="#ffffff" />
                <meta name="mobile-web-app-capable" content="yes" />
                {/* APP icon on iOS */}
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href={`${process.env.NEXT_PUBLIC_SUBPATH}/images/icons/apple-touch-icon.png`}
                />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-title" content="永豐金證券" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black" />
                {/* Custom Splash Screen on iOS */}
                <link
                    href={`${process.env.NEXT_PUBLIC_SUBPATH}/images/splashscreens/iphone5_splash.png`}
                    media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href={`${process.env.NEXT_PUBLIC_SUBPATH}/images/splashscreens/iphone6_splash.png`}
                    media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href={`${process.env.NEXT_PUBLIC_SUBPATH}/images/splashscreens/iphoneplus_splash.png`}
                    media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href={`${process.env.NEXT_PUBLIC_SUBPATH}/images/splashscreens/iphonex_splash.png`}
                    media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href={`${process.env.NEXT_PUBLIC_SUBPATH}/images/splashscreens/iphonexr_splash.png`}
                    media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href={`${process.env.NEXT_PUBLIC_SUBPATH}/images/splashscreens/iphonexsmax_splash.png`}
                    media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href={`${process.env.NEXT_PUBLIC_SUBPATH}/images/splashscreens/ipad_splash.png`}
                    media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href={`${process.env.NEXT_PUBLIC_SUBPATH}/images/splashscreens/ipadpro1_splash.png`}
                    media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href={`${process.env.NEXT_PUBLIC_SUBPATH}/images/splashscreens/ipadpro3_splash.png`}
                    media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href={`${process.env.NEXT_PUBLIC_SUBPATH}/images/splashscreens/ipadpro2_splash.png`}
                    media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
                    rel="apple-touch-startup-image"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                />
            </Head>
            {renderComp}
        </>
    );
}
export default wrapper.withRedux(MyApp);
