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
        page: getQueryString('page')
            ? `${process.env.NEXT_PUBLIC_SUBPATH}${getQueryString('page')}`
            : `${process.env.NEXT_PUBLIC_SUBPATH}`,
        otp: getQueryString('otp'),
    };

    const canTrustDict = {
        Bond_Securities: {
            target: `${process.env.NEXT_PUBLIC_SUBPATH}`,
            needLogin: true,
            errorPage: `${process.env.NEXT_PUBLIC_SUBPATH}`,
            loginType: 'trust',
        },
        MMA: {
            target: `${process.env.NEXT_PUBLIC_SUBPATH}`,
            needLogin: true,
            errorPage: `${process.env.NEXT_PUBLIC_SUBPATH}`,
            loginType: 'trust',
        },
        Line: {
            target: `${process.env.NEXT_PUBLIC_SUBPATH}`,
            needLogin: false,
            errorPage: `${process.env.NEXT_PUBLIC_SUBPATH}`,
            loginType: 'trust',
        },
    };

    const doLogin = async () => {
        try {
            if (canTrustDict[queryStringDict.platform].needLogin) {
                const res = await submit(queryStringDict.otp);
                if (res.data.success === true) {
                    sessionStorage.setItem('source', queryStringDict.platform.toLowerCase());
                    location.href = queryStringDict.page;
                }
            }
        } catch (e) {
            location.href = canTrustDict[queryStringDict.platform].errorPage;
            alert('登入失敗，請重新登入');
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
