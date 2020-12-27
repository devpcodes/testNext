import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { showLoginHandler } from '../store/components/layouts/action';
import { setCurrentPath } from '../store/general/action';
import { useRouter } from 'next/router';
import { checkLogin } from '../services/components/layouts/checkLogin';
//udn
export const useCheckLogin = () => {
    const dispatch = useDispatch();
    const isLogin = useSelector(store => store.user.isLogin);
    const [isLoginState, setisLoginState] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if (router.query.nav == 0) {
            if (!checkLogin()) {
                const lastPath = window.location.pathname.split('/').pop();
                const currentPath = `/${lastPath === 'newweb' ? '' : lastPath}`;
                window.location = `${process.env.NEXT_PUBLIC_SUBPATH}/SinoTrade_login?currentPath=${encodeURIComponent(
                    currentPath,
                )}`;
            } else {
                setisLoginState(true);
            }
        }
    }, [router.query]);

    useEffect(() => {
        //與上一個hook發生衝突
        if (window.location.search.indexOf('nav=0') >= 0) {
            return;
        }

        if (isLogin) {
            setisLoginState(true);
        } else {
            setisLoginState(false);
            dispatch(setCurrentPath(`${router.pathname}${window.location.search}`));
            router.push('', `/SinoTrade_login`, { shallow: true });
        }
    }, [isLogin]);

    return isLoginState;
};
