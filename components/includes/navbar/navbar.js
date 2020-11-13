import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { setMenuOpen } from '../../../store/components/layouts/action';
import Link from 'next/link';
import theme from '../../../resources/styles/theme';
import NavList from '../navbar/navList';
import logo from '../../../resources/images/components/header/sinopac_securities_logo.png';
import closeMenu from '../../../resources/images/components/header/ic_closemenu.png';
import closeImg from '../../../resources/images/components/header/ic_close_horizontal_flip.png';
import openImg from '../../../resources/images/components/header/ic_open.png';
import { setCurrentPath } from '../../../store/general/action';
import { setMaskVisible } from '../../../store/components/layouts/action';
// firefox 手機板隱藏 navbar scrollBar
// level(1) 選單點選第二次隱藏

const Navbar = React.memo(props => {
    let index = 0;
    const router = useRouter();
    const serverMainlNav = useSelector(store => store.server.navData?.main);
    const clientMainlNav = useSelector(store => store.layout.navData?.main);
    const accountMarket = useSelector(store => store.user.currentAccount?.accttype);
    const isLogin = useSelector(store => store.user.isLogin);
    const showMenu = useSelector(store => store.layout.showMenu);
    const isMobile = useSelector(store => store.layout.isMobile);
    const mainNav = clientMainlNav ? clientMainlNav : serverMainlNav;
    const marketMappingList = {
        S: 'stock',
        F: 'futuresOptions',
        H: 'recommissioned',
    };
    const dispatch = useDispatch();

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        console.log(accountMarket);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    useEffect(() => {
        if (isMobile) {
            dispatch(setMaskVisible(showMenu));
        }
    }, [showMenu]);

    const resizeHandler = function () {
        let winWidth = window.innerWidth;
        if (winWidth <= 1024) {
            dispatch(setMenuOpen(false));
        }
    };

    const menuClickHandler = function () {
        dispatch(setMenuOpen(false));
    };

    const menuItemClickHandler = dom => {
        if (dom.target.parentElement.getElementsByClassName('navbar__lv2')[0].classList.contains('navbar__lv2--show')) {
            dom.target.parentElement.getElementsByClassName('navbar__lv2')[0].classList.remove('navbar__lv2--show');
            dom.target.parentElement.classList.remove('navbar__lv1__item--show');
        } else {
            dom.target.parentElement.getElementsByClassName('navbar__lv2')[0].classList.add('navbar__lv2--show');
            dom.target.parentElement.classList.add('navbar__lv1__item--show');
        }
    };

    const setCurrentPathHandler = () => {
        dispatch(setMenuOpen(false));
        dispatch(setCurrentPath(`${router.pathname}${window.location.search}`));
    };

    const goLogin = () => {
        setCurrentPathHandler();
        dispatch(setMenuOpen(false));
        router.push('', `/SinoTrade_login`, { shallow: true });
    };

    const goSignUp = () => {
        return window.open(
            'https://www.sinotrade.com.tw/openact?strProd=0037&strWeb=0035&utm_campaign=NewWeb&utm_source=NewWeb&utm_medium=未登入選單開戶按鈕',
        );
    };

    return (
        <div className={`${showMenu ? '' : 'navbar--hide'}`}>
            <div className="navbar__lv1__item navbar__lv1__item__title menu__ctrl">
                <Link href={'/'}>
                    <a className="header__logo">
                        <img src={logo}></img>
                    </a>
                </Link>
                <a className="close__menu" onClick={menuClickHandler}>
                    <img src={closeMenu}></img>
                </a>
            </div>
            <div className="navbar__content">
                <ul className="navbar">
                    {!!mainNav &&
                        mainNav.map((lv1Item, lv1Index) => (
                            <li className="navbar__lv1__item" key={lv1Index}>
                                {lv1Item.items && lv1Item.items.length ? (
                                    <a
                                        className={`navbar__lv1__item__title ${lv1Item.url ? 'no__lv2' : ''}`}
                                        onClick={menuItemClickHandler}
                                    >
                                        <span className="active__mark"></span>
                                        {lv1Item.title}
                                    </a>
                                ) : (
                                    <Link href={lv1Item.url}>
                                        <a
                                            className={`navbar__lv1__item__title ${lv1Item.url ? 'no__lv2' : ''}`}
                                            onClick={menuItemClickHandler}
                                        >
                                            <span className="active__mark"></span>
                                            {lv1Item.title}
                                        </a>
                                    </Link>
                                )}
                                {lv1Item.items && lv1Item.items.length && (
                                    <ul className={`navbar__lv2 ${lv1Index > mainNav.length / 2 ? 'right' : ''}`}>
                                        {lv1Item.items.map((lv2Item, lv2Index) => {
                                            index += 1;
                                            return (
                                                <li className="navbar__lv2__item" key={lv2Index}>
                                                    <NavList
                                                        navItems={lv1Item.items}
                                                        lv2Data={lv2Item}
                                                        twoColumnPX={1024}
                                                        id={index}
                                                    />
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </li>
                        ))}
                </ul>
            </div>
            <div className="navbar__lv1__item navbar__shortcuts__li">
                <div className="navbar__shortcuts">
                    {isLogin ? (
                        <>
                            <Link href={'/goOrder'}>
                                <a onClick={setCurrentPathHandler} className="navbar__order">
                                    快速下單
                                </a>
                            </Link>
                            <Link
                                href={
                                    !!accountMarket
                                        ? `TradingAccount?mkt=${marketMappingList[accountMarket]}`
                                        : `TradingAccount`
                                }
                            >
                                <a onClick={setCurrentPathHandler} className="navbar__account">
                                    我的帳務
                                </a>
                            </Link>
                        </>
                    ) : (
                        <>
                            <a onClick={goSignUp} className="navbar__order">
                                快速開戶
                            </a>
                            <a onClick={goLogin} className="navbar__account">
                                客戶登入
                            </a>
                        </>
                    )}
                </div>
            </div>
            <style jsx>{`
                .navbar {
                    display: flex;
                    height: 100%;
                    padding: 0;
                    margin: 0;
                    vertical-align: top;
                    z-index: 501;
                }
                .navbar--hide {
                    display: flex;
                }
                .navbar__lv1__item.menu__ctrl {
                    display: none;
                }
                .navbar__lv1__item {
                    width: 105px;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    list-style: none;
                    font-size: 1.9rem;
                    color: ${theme.colors.text};
                    height: 100%;
                    position: relative;
                }
                .navbar__lv1__item__title {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    line-height: 70px;
                }

                .navbar__shortcuts__li {
                    display: none;
                }
                .active__mark {
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 0 5.5px 8px 5.5px;
                    border-color: transparent transparent ${theme.colors.secondary} transparent;
                    position: absolute;
                    bottom: -1px;
                    left: calc(50% - 6px);
                    display: none;
                }

                .navbar__lv2 {
                    margin: 0;
                    padding: 0;
                    position: absolute;
                    display: flex;
                    top: 70px;
                    left: 0;
                    padding: 18px 36px;
                    border-top: 6px solid ${theme.colors.secondary};
                    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.3);
                    background: #fff;
                    z-index: 501;
                    text-align: left;
                    visibility: hidden;
                    opacity: 0;
                    transition: visibility 0.4s, opacity 0.4s linear;
                }
                .navbar__lv2.right {
                    left: unset;
                    right: 0;
                }

                .navbar__lv2__item {
                    list-style: none;
                    padding: 0;
                    margin-right: 37px;
                }
                .navbar__lv2__item:last-child {
                    margin-right: 0;
                }

                @media (min-width: 1024px) {
                    .navbar__lv1__item:hover .navbar__lv1__item__title,
                    .navbar__lv1__item.active {
                        color: ${theme.colors.secondary};
                        line-height: 64px;
                    }
                    .navbar__lv1__item:hover .active__mark,
                    .navbar__lv1__item.active .active__mark {
                        display: block;
                    }
                    .navbar__lv1__item:hover .navbar__lv2 {
                        visibility: visible;
                        opacity: 1;
                        display: flex;
                    }
                    .navbar__lv1__item:hover .navbar__lv1__item__title:after {
                        transition: all 0.3s;
                        transform: rotate(-0deg);
                    }
                }

                @media (max-width: 1024px) {
                    .navbar__lv2--show {
                        visibility: visible;
                        opacity: 1;
                        display: flex;
                    }
                    .navbar__content {
                        width: 316px;
                        height: 100%;
                        min-height: calc(100% - 140px);
                        max-height: calc(100% - 140px);
                        overflow-y: auto;
                        overflow-x: hidden;
                        -ms-overflow-style: none;
                        position: fixed;
                        top: 70px;
                        left: 0;
                        background: ${theme.colors.darkBg};
                        border-right: solid ${theme.colors.darkBg} 1px;
                        box-shadow: ${isMobile ? '0 2px 15px 0 rgba(0,0,0,0.3)' : 'none'};
                    }
                    .navbar {
                        flex-direction: column;
                        height: auto;
                    }

                    .navbar__content::-webkit-scrollbar {
                        display: none;
                    }
                    .close__menu {
                        float: right;
                    }
                    .navbar--hide {
                        display: none;
                    }
                    .navbar__lv1__item.menu__ctrl {
                        display: block;
                    }
                    .navbar__lv1__item.navbar__shortcuts__li {
                        display: block;
                        height: 70px;
                        position: fixed;
                        bottom: 0;
                        left: 0;
                        width: 316px;
                        background: ${theme.colors.darkBg};
                    }
                    .navbar__shortcuts {
                        display: flex;
                        flex-direction: row;
                    }
                    .navbar__order,
                    .navbar__account {
                        display: block;
                        height: 65px;
                        line-height: 65px;
                        width: 50%;
                        text-align: center;
                    }
                    .navbar__order {
                        border-bottom: 5px solid ${theme.colors.secondary};
                    }
                    .navbar__account {
                        border-bottom: 5px solid ${theme.colors.primary};
                    }
                    .navbar__lv1__item.menu__ctrl {
                        position: fixed;
                        top: 0;
                        left: 0;
                        background: ${theme.colors.darkBg};
                        z-index: 503;
                        width: 316px;
                    }
                    .active__mark {
                        display: none !important;
                    }
                    .navbar__lv1__item {
                        width: 100%;
                        text-align: left;
                        height: auto;
                    }
                    .navbar__lv1__item .navbar__lv2--show {
                        display: flex;
                        transition: all 0.3s;
                    }
                    .navbar__lv1__item__title {
                        height: auto;
                        padding: 0 30px;
                        color: #fff;
                    }

                    .navbar__lv1__item__title:after {
                        content: '';
                        width: 32px;
                        height: 32px;
                        background-image: url(${openImg});
                        margin-left: 4px;
                        transition: all 0.3s;
                        transform: rotate(-180deg);
                        display: inline-block;
                        vertical-align: middle;
                    }

                    .navbar__lv1__item__title.no__lv2:after {
                        display: none;
                    }

                    .navbar__lv1__item__title.menu__ctrl:after {
                        display: none;
                    }

                    .navbar__lv1__item--show .navbar__lv1__item__title:after {
                        background-image: url(${closeImg});
                        transform: rotate(0);
                    }

                    .navbar__lv1__item--show .navbar__lv1__item__title {
                        color: ${theme.colors.secondary};
                    }

                    .navbar__lv2 {
                        position: relative;
                        top: 0;
                        left: 0;
                        display: none;
                        width: 316px !important;
                        flex-direction: column;
                    }
                    .navbar__lv2__item {
                        margin: 0;
                    }
                }
            `}</style>
        </div>
    );
});

export default Navbar;
