import 'antd/dist/antd.min.css';
import '../resources/styles/globals.css';
import { useEffect } from 'react';
// import TagManager from 'react-gtm-module';
import { wrapper } from '../store/store';
import Layout from '../components/layouts/layout';

const tagManagerArgs = {
    gtmId: 'GTM-KHJQQ4C',
};

function MyApp({ Component, pageProps, router }) {
    useEffect(() => {
        //googletagmanager
        // TagManager.initialize(tagManagerArgs);

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
                'js/sensorsdata.min.js',
            heatmap_url:
                location.protocol + '//' + location.host + `${process.env.NEXT_PUBLIC_SUBPATH}` + 'js/heatmap.min.js',
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
    }, []);
    const getLayout = Component.getLayout || (page => <Layout children={page} />);
    const renderComp = getLayout(<Component {...pageProps} />);
    return <>{renderComp}</>;
}
export default wrapper.withRedux(MyApp);
