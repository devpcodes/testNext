import { submit } from '../services/components/login/trustLogin';
import { useEffect } from 'react';

const Navigation = () => {
    useEffect(() => {
        doLogin();
    }, []);

    const getQueryString = name => {
        const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        const isServer = typeof window === 'undefined';
        if (!isServer) {
            const r = location.search.substr(1).match(reg);
            if (r != null) return unescape(decodeURI(r[2]));
        }
        return null;
    };

    const queryStringDict = {
        platform: getQueryString('platform'),
        source: getQueryString('source'),
        page: getQueryString('page') ? getQueryString('page') : '/',
        otp: getQueryString('otp'),
    };

    const canTrustDict = {
        Bond_Securities: {
            target: '/',
            needLogin: true,
            errorPage: '/',
            loginType: 'trust',
        },
        MMA: {
            target: '/',
            needLogin: true,
            errorPage: '/',
            loginType: 'trust',
        },
        Line: {
            target: '/',
            needLogin: false,
            errorPage: '/',
            loginType: 'trust',
        },
    };

    const doLogin = async () => {
        try {
            if (canTrustDict[queryStringDict.platform].needLogin) {
                const res = await submit(queryStringDict.otp);
                console.log(res);
                if (res.data.success === true) {
                    sessionStorage.setItem('source', queryStringDict.platform.toLowerCase());
                    // 導回設定頁面
                }
            }
        } catch (e) {
            console.log(e);
            // alert('失敗');
            // 導回未登入首頁 ??
        }
    };

    return <></>;
};

Navigation.getLayout = page => (
    <>
        <Navigation>{page}</Navigation>
    </>
);

export default Navigation;
