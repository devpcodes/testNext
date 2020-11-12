import { useRouter } from 'next/router';
import { submit } from '../services/components/login/trustLogin';
import { useEffect } from 'react';
import { checkServer } from '../services/checkServer';

const Navigation = () => {
    const router = useRouter();

    useEffect(() => {
        doLogin();
    }, []);

    const getQueryString = name => {
        const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        const isServer = checkServer();
        if (!isServer) {
            const r = location.search.substr(1).match(reg);
            if (r != null) return unescape(decodeURI(r[2]));
        }
        return null;
    };

    const queryStringDict = {
        platform: getQueryString('platform'),
        source: getQueryString('source'),
        page: getQueryString('page') ? getQueryString('page') : ``,
        otp: getQueryString('otp'),
    };

    const canTrustDict = {
        Bond_Securities: {
            target: ``,
            needLogin: true,
            errorPage: ``,
            loginType: 'trust',
        },
        MMA: {
            target: ``,
            needLogin: true,
            errorPage: ``,
            loginType: 'trust',
        },
        Line: {
            target: ``,
            needLogin: false,
            errorPage: ``,
            loginType: 'trust',
        },
    };

    const doLogin = async () => {
        try {
            if (canTrustDict[queryStringDict.platform].needLogin) {
                const res = await submit(queryStringDict.otp);
                if (res.data.success === true) {
                    sessionStorage.setItem('source', queryStringDict.platform.toLowerCase());
                    router.push(`/${queryStringDict.page}`);
                }
            }
        } catch (e) {
            router.push(`/${canTrustDict[queryStringDict.platform].errorPage}`);
            // 注意：這裡不需要再 alert 任何錯誤訊息，myAxios.js 已在上層處理 api 的 error handle (顯示錯誤訊息)
        }
    };

    return <></>;
};

Navigation.getLayout = Page => Page;

export default Navigation;
