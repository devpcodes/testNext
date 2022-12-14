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
                const cnyesQuery = Object.assign(currentQuery, newQuery, { platform: 'cnyes', source: 'cnyes' });
                queryString = objectToQueryHandler(cnyesQuery);
                break;
            }
            case 'line': {
                const lineQuery = Object.assign(newQuery, { platform: 'Line' });
                queryString = objectToQueryHandler(lineQuery);
                break;
            }
            case 'udn': {
                const udnQuery = Object.assign(newQuery, { platform: 'udn', source: 'udn' });
                queryString = objectToQueryHandler(udnQuery);
                break;
            }
            case 'gugu': {
                const guguQuery = Object.assign(newQuery, { source: 'gugu' });
                queryString = objectToQueryHandler(guguQuery);
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
            'https://www.sinotrade.com.tw/richclub/dawhotou/campaign?strProd=0037&strWeb=0035&utm_campaign=newweb_topbar_op&utm_source=newweb&utm_medium=button',
        );
    }, []);

    const goOrder = useCallback(() => {
        const iHeight = 700;
        const iWidth = 440;
        const iTop = (window.screen.availHeight - 30 - iHeight) / 2; //?????????????????????;
        const iLeft = window.screen.availLeft + (window.screen.availWidth - 10 - iWidth) / 2; //?????????????????????;
        return window.open(
            `${getGoOrderUrl(router.query, platform)}`,
            'goOrder',
            `height=${iHeight},innerHeight=${iHeight},width=${iWidth},innerWidth=${iWidth},top=${iTop},left=${iLeft}`,
        );
    }, [router.query, platform]);

    const goLogIn = useCallback(() => {
        let dynmaicPath = '';
        dynmaicPath = router.pathname.split('[');
        if (dynmaicPath.length > 1) {
            dynmaicPath = dynmaicPath[1].substring(0, dynmaicPath[1].length - 1);
        } else {
            dynmaicPath = '';
        }
        if (router.pathname !== '/errPage') {
            if (router.query[dynmaicPath]) {
                dispatch(setCurrentPath(`${router.asPath}`));
            } else {
                dispatch(setCurrentPath(`${router.pathname}${window.location.search}`));
            }
        }

        // ???????????? SinoTrade_login ??????
        // console.log('pathname', router.pathname, router.asPath, router.query.code)
        if (router.query[dynmaicPath]) {
            router.push(
                {
                    pathname: router.pathname,
                    query: { [dynmaicPath]: router.query[dynmaicPath] },
                },
                `/SinoTrade_login`,
                { shallow: true },
            );
        } else {
            router.push(router.pathname, `/SinoTrade_login`, { shallow: true });
        }
    }, [router.pathname]);

    const loginBtn = <HeaderBtn content={isMobile ? '??????' : '????????????'} type={'primary'} clickHandler={goLogIn} />;

    if (!hasMounted) {
        return null;
    }

    return (
        <div className="callToAction__container">
            {isMobile ? null : (
                <HeaderBtn
                    content={isLogin ? '????????????' : '????????????'}
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
