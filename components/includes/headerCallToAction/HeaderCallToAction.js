import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { HeaderBtn } from '../HeaderBtn';
import { AccountButton } from './AccountButton';

import { setCurrentPath } from '../../../store/general/action';

import { objectToQueryHandler } from '../../../services/objectToQueryHandler';

import { useHasMounted } from '../../../hooks/useHasMounted';

export const HeaderCallToAction = () => {
    const hasMounted = useHasMounted();

    const router = useRouter();
    const dispatch = useDispatch();

    const isLogin = useSelector(store => store.user.isLogin);
    const isMobile = useSelector(store => store.layout.isMobile);
    const platform = useSelector(store => store.general.platform);

    const getGoOrderUrl = (currentQuery, platform) => {
        const newQuery = {
            nav: 0,
        };

        let queryString;
        switch (platform) {
            case 'mma': {
                const mmaQuery = Object.assign(currentQuery, newQuery, { platform: 'MMA', source: 'mma' });
                queryString = objectToQueryHandler(mmaQuery);
                break;
            }
            case 'cnyes': {
                const mmaQuery = Object.assign(currentQuery, newQuery, { platform: 'cnyes', source: 'cnyes' });
                queryString = objectToQueryHandler(mmaQuery);
                break;
            }
            case 'line': {
                const lineQuery = Object.assign(newQuery, { platform: 'Line' });
                queryString = objectToQueryHandler(lineQuery);
                break;
            }
            case 'udn': {
                const lineQuery = Object.assign(newQuery, { platform: 'udn', source: 'udn' });
                queryString = objectToQueryHandler(lineQuery);
                break;
            }
            default:
                queryString = objectToQueryHandler(newQuery);
                break;
        }
        return `${process.env.NEXT_PUBLIC_SUBPATH}/goOrder${queryString}`;
    };

    const goSignUp = useCallback(() => {
        return window.open(
            'https://www.sinotrade.com.tw/openact?utm_campaign=OP_inchannel&utm_source=newweb&utm_medium=button_top&strProd=0037&strWeb=0035',
        );
    }, []);

    const goOrder = useCallback(() => {
        const iHeight = 700;
        const iWidth = 440;
        const iTop = (window.screen.availHeight - 30 - iHeight) / 2; //視窗的垂直位置;
        const iLeft = window.screen.availLeft + (window.screen.availWidth - 10 - iWidth) / 2; //視窗的水平位置;
        return window.open(
            `${getGoOrderUrl(router.query, platform)}`,
            'goOrder',
            `height=${iHeight},innerHeight=${iHeight},width=${iWidth},innerWidth=${iWidth},top=${iTop},left=${iLeft}`,
        );
    }, [router.query, platform]);

    const goLogIn = useCallback(() => {
        if (router.pathname !== '/errPage') {
            dispatch(setCurrentPath(`${router.pathname}${window.location.search}`));
        }
        // 無真正的 SinoTrade_login 頁面
        router.push(router.pathname, `/SinoTrade_login`, { shallow: true });
    }, [router.pathname]);

    const loginBtn = <HeaderBtn content={isMobile ? '登入' : '客戶登入'} type={'primary'} clickHandler={goLogIn} />;

    if (!hasMounted) {
        return null;
    }

    return (
        <div className="callToAction__container">
            {isMobile ? null : (
                <HeaderBtn
                    content={isLogin ? '快速下單' : '快速開戶'}
                    type={'secondary'}
                    clickHandler={isLogin ? goOrder : goSignUp}
                />
            )}
            {isLogin ? <AccountButton /> : loginBtn}
            <style jsx>{`
                .callToAction__container {
                    display: flex;
                    position: relative;
                }
            `}</style>
        </div>
    );
};
