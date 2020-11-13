import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { showLoginHandler } from '../../../store/components/layouts/action';
import { setMenuOpen } from '../../../store/components/layouts/action';
import { setCurrentPath } from '../../../store/general/action';
import { trust } from '../../../services/components/header/navTurst';
import theme from '../../../resources/styles/theme';

import Link from 'next/link';

const NavList = React.memo(props => {
    const router = useRouter();
    const [lv3MobileVisible, setLv3MobileVisible] = useState(false);
    const isLogin = useSelector(store => store.user.isLogin);
    const dispatch = useDispatch();

    const trusting = useRef(false);
    const trustingBody = useRef({});
    const trustingUrl = useRef('');

    useEffect(() => {
        if (isLogin && trusting.current) {
            console.log('trusting', trustingUrl.current, trustingBody.current);
            trustHandler(trustingUrl.current, trustingBody.current);
        }
    }, [isLogin]);

    const clickHandler = () => {
        props.toggleList && setLv3MobileVisible(!lv3MobileVisible);
    };

    const openWindow = (url, popupWinWidth, popupWinHeight, popupWinName) => {
        const left = (screen.width - popupWinWidth) / 2;
        const top = (screen.height - popupWinHeight) / 4;
        window.open(url, popupWinName, `width=${popupWinWidth},height=${popupWinHeight},top=${top},left=${left}`);
    };

    const noLoginTrustHandler = (trustUrl, trustBody) => {
        trusting.current = true;
        trustingUrl.current = trustUrl;
        trustingBody.current = trustBody;
        dispatch(showLoginHandler(true));
    };

    const stopTrustingHandler = () => {
        trusting.current = false;
        trustingUrl.current = '';
        trustingBody.current = {};
    };

    const trustHandler = async (trustUrl, trustBody) => {
        const res = await trust(trustUrl, trustBody);
        stopTrustingHandler();
        window.open(res.data.result.url, '_blank');
    };

    const openTrust = (trustUrl, trustBody) => {
        !isLogin ? noLoginTrustHandler(trustUrl, trustBody) : trustHandler(trustUrl, trustBody);
    };

    const linkSetCurrentPath = () => {
        dispatch(setCurrentPath(`${router.pathname}${window.location.search}`));
        dispatch(setMenuOpen(false));
    };

    return (
        <div className="navlist">
            <h6
                className={`navbar__lv2__item__title ${
                    props.toggleList && !lv3MobileVisible ? 'navbar__lv2__item__title--hide' : ''
                }`}
                onClick={clickHandler}
            >
                {props.lv2Data.title}
            </h6>
            <ul className={`navbar__lv3 ${props.toggleList && !lv3MobileVisible ? 'navbar__lv3--hide' : ''}`}>
                {props.lv2Data.items.map((lv3Item, lv3Index) => (
                    <li className="navbar__lv3__item" key={lv3Index}>
                        {lv3Item.isOpen && (
                            <a
                                onClick={
                                    lv3Item.isOpen
                                        ? () =>
                                              openWindow(
                                                  `${process.env.NEXT_PUBLIC_SUBPATH}${lv3Item.url}`,
                                                  lv3Item.openWidth,
                                                  lv3Item.openHeight,
                                                  lv3Item.title,
                                              )
                                        : () => {
                                              return false;
                                          }
                                }
                                className="navbar__lv3__item__title"
                            >
                                <span className={lv3Item.icon ? lv3Item.icon : ''}>{lv3Item.title}</span>
                            </a>
                        )}
                        {lv3Item.url && !lv3Item.isOpen && !lv3Item.isTrust && !lv3Item.isFullUrl && (
                            <Link href={lv3Item.url}>
                                <a
                                    onClick={linkSetCurrentPath}
                                    target={lv3Item.isBlank ? '_blank' : ''}
                                    className="navbar__lv3__item__title"
                                >
                                    <span className={lv3Item.icon ? lv3Item.icon : ''}>{lv3Item.title}</span>
                                </a>
                            </Link>
                        )}
                        {lv3Item.url && !lv3Item.isOpen && !lv3Item.isTrust && lv3Item.isFullUrl && (
                            <a
                                href={lv3Item.url}
                                target={lv3Item.isBlank ? '_blank' : ''}
                                className="navbar__lv3__item__title"
                            >
                                <span className={lv3Item.icon ? lv3Item.icon : ''}>{lv3Item.title}</span>
                            </a>
                        )}
                        {lv3Item.isTrust && (
                            <a
                                onClick={
                                    lv3Item.isTrust
                                        ? () => openTrust(lv3Item.trustUrl, lv3Item.trustBody)
                                        : () => {
                                              return false;
                                          }
                                }
                                className="navbar__lv3__item__title"
                            >
                                <span className={lv3Item.icon ? lv3Item.icon : ''}>{lv3Item.title}</span>
                            </a>
                        )}
                    </li>
                ))}
            </ul>

            <style jsx>{`
                .navlist {
                    width: 122px;
                }

                .navbar__lv2__item__title {
                    font-size: 16px;
                    color: ${theme.colors.secondary};
                    border-bottom: 2px dotted ${theme.colors.secondary};
                    padding: 0 0 10px 0;
                    margin: 0 0 18px 0;
                    font-weight: bold;
                }

                .navbar__lv3 {
                    list-style: none;
                    padding: 0;
                }

                .navbar__lv3__item {
                    margin: 8px 0;
                }

                .navbar__lv3__item__title {
                    font-size: 16px;
                    color: ${theme.colors.darkBg};
                    display: block;
                }
                .navbar__lv3__item__title:hover {
                    color: ${theme.colors.secondary};
                }
                .NEW::after,
                .HOT::after {
                    display: inline-block;
                    width: 37px;
                    height: 18px;
                    text-align: center;
                    margin-left: 5px;
                    vertical-align: text-bottom;
                    font-size: 12px;
                    transform: scale(0.9);
                }
                .NEW::after {
                    background: ${theme.colors.menuTagNew};
                    color: ${theme.colors.text};
                    content: 'NEW';
                }

                .HOT::after {
                    background: ${theme.colors.primary};
                    color: ${theme.colors.text};
                    content: 'HOT';
                }

                @media (max-width: ${props.twoColumnPX}px) {
                    .navlist {
                        width: 100%;
                        margin-bottom: 27px;
                    }
                    .navbar__lv2__item__title {
                        margin: 0 0 4px 0;
                    }
                    .navbar__lv3__item {
                        width: 50%;
                        display: inline-block;
                    }
                    .navbar__lv3__item__title:hover {
                        color: ${theme.colors.secondary};
                    }
                }
            `}</style>
        </div>
    );
});

export default NavList;
