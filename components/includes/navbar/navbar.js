import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMenuOpen } from '../../../actions/components/layouts/action';
import Link from 'next/link'
import theme from '../../../resources/styles/theme'
import NavList from "../navbar/navList"
import logo from '../../../resources/images/components/header/sinopac_securities_logo.png';
import closeMenu from '../../../resources/images/components/header/ic_closemenu.png';
import closeImg from '../../../resources/images/components/header/ic_close_horizontal_flip.png';
import openImg from '../../../resources/images/components/header/ic_open.png';

// firefox 手機板隱藏 navbar scrollBar
// level(1) 選單點選第二次隱藏


const Navbar = React.memo((props) => {

    const serverMainlNav = useSelector((store) => store.server.navData?.main);
    const clientMainlNav = useSelector((store) => store.layout.navData?.main);
    const isMobile = useSelector((store) => store.layout.isMobile);
    const showMenu = useSelector(store => store.layout.showMenu);

    const mainNav = clientMainlNav ? clientMainlNav : serverMainlNav;
    const dispatch = useDispatch();

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
    }, []);

    const resizeHandler = function(){
        let winWidth = window.innerWidth;
        if (winWidth <= 1024){
            dispatch(setMenuOpen(false));
        } 
    }

    const menuClickHandler = function(){
        dispatch(setMenuOpen(false));
    }

    const menuItemClickHandler = (dom) => {
        if (dom.target.parentElement.getElementsByClassName("navbar__lv2")[0].classList.contains("navbar__lv2--show")) {
            dom.target.parentElement.getElementsByClassName("navbar__lv2")[0].classList.remove("navbar__lv2--show")
            dom.target.parentElement.classList.remove("navbar__lv1__item--show")
        } else {
            dom.target.parentElement.getElementsByClassName("navbar__lv2")[0].classList.add("navbar__lv2--show")
            dom.target.parentElement.classList.add("navbar__lv1__item--show")
        }
        
    }

    return (
        <ul className={`navbar ${showMenu ? '' : 'navbar--hide'}`} >
            
            <li className="navbar__lv1__item mobile__menu__ctrl" > 
                <span className="navbar__lv1__item__title menu__ctrl">
                    <Link href="/">
                        <a className="header__logo">
                            <img src={logo}></img>
                        </a>
                    </Link>
                    <Link href="/">
                        <a className="close__menu" onClick={menuClickHandler}>
                            <img src={closeMenu}></img>
                        </a>
                    </Link>
                </span> 
            </li>
            {mainNav.map((lv1Item, lv1Index) => (
                
                <li className="navbar__lv1__item" key={lv1Index}>
                    <Link href="/">
                        <a className="navbar__lv1__item__title" onClick={menuItemClickHandler}>
                            <span className="active__mark"></span>
                            {lv1Item.title} 

                        </a>
                    </Link>
                    
                    <ul className={`navbar__lv2 ${lv1Index > (mainNav.length/2) ? "right" : "" }` } style={{ width: 168 * lv1Item.items.length }}>
                        {lv1Item.items.map((lv2Item, lv2Index) => (
                            <li className="navbar__lv2__item" key={lv2Index} >
                                <NavList navItems={lv1Item.items} lv2Data={lv2Item} twoColumnPX={1024}/>
                            </li>
                        ))}
                    </ul>
                    
                </li>
            ))}
            <li className="navbar__lv1__item navbar__shortcuts__li"> 
                <div className="navbar__shortcuts">
                <Link href="/">
                    <a className="navbar__order">快速下單</a>
                </Link>
                <Link href="/">
                    <a className="navbar__account">我的帳務</a>
                </Link>
                </div>
            </li>
            <style jsx>{`
                .navbar {
                    display: flex;
                    height: 100%;
                    padding: 0;
                    margin: 0;
                    vertical-align: top;
                    z-index: 1001;
                }
                .navbar--hide {
                    display: flex;
                }
                .navbar__lv1__item.mobile__menu__ctrl {
                    display:none;
                }
                .navbar__lv1__item {
                    width: 105px;
                    text-align:center;
                    display: flex;
                    flex-direction: column;
                    list-style: none;
                    font-size: 18px;
                    color: ${theme.colors.text};
                    height:100%;
                    position:relative;
                }
                .navbar__lv1__item__title {
                    position: relative;
                    width:100%;
                    height:100%;
                    line-height:70px;
                }
                .navbar__shortcuts__li {
                    display:none;
                }
                .active__mark {
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 0 5.5px 8px 5.5px;
                    border-color: transparent transparent ${theme.colors.secondary} transparent;
                    position: absolute;
                    bottom: 0;
                    left: calc(50% - 6px);
                    display:none;
                }

                .navbar__lv2 {
                    margin:0;
                    padding:0;
                    display: none;
                    position:absolute;
                    top: 70px;
                    left: 0;
                    padding: 18px 36px;
                    border-top: 6px solid ${theme.colors.secondary};
                    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.3);
                    background: #FFF;
                    z-index: 1001;
                    text-align: left;
                }
                .navbar__lv2.right {
                    left: unset;
                    right: 0;
                }
    
                .navbar__lv2__item { 
                    list-style: none;
                    padding:0;
                    margin-right: 37px;
                    
                }
                .navbar__lv2__item:last-child {
                    margin-right: 0;
                }

                @media (min-width:1024px) {
                    .navbar__lv1__item:hover .navbar__lv1__item__title ,.navbar__lv1__item.active{
                        color: ${theme.colors.secondary};
                    }
                    .navbar__lv1__item:hover .active__mark, .navbar__lv1__item.active .active__mark{
                        display:block;
                    }
                    .navbar__lv1__item:hover .navbar__lv2 { 
                        display:flex;
                    }
                    .navbar__lv1__item:hover .navbar__lv1__item__title:after { 
                        transition: all .3s;
                        transform: rotate(-0deg);
                    }
                }

                @media (max-width:1024px) {

                    .navbar__lv2--show {
                        display:flex;
                    }

                    .navbar {
                        -ms-overflow-style: none;
                        background : ${theme.colors.darkBg};
                        flex-direction: column;
                        position: fixed;
                        width: 316px;
                        top: 70px;
                        left:0;
                        overflow-y:auto;
                        overflow-x:hidden;
                        height: auto;
                        min-height: calc(100% - 140px);
                        max-height: calc(100% - 140px);
                        border-right: solid ${theme.colors.darkBg} 1px;
                    }
                    .navbar::-webkit-scrollbar {
                        display: none;
                    }
                    .close__menu {
                        float:right;
                    }
                    .navbar--hide {
                        display: none;
                    }
                    .navbar__lv1__item.mobile__menu__ctrl {
                        display: block;
                    }
                    .navbar__lv1__item.navbar__shortcuts__li {
                        display: block;
                        height: 70px;
                        position: fixed;
                        bottom: 0;
                        width: 316px;
                        background: ${theme.colors.darkBg};
                    }
                    .navbar__shortcuts {
                        display: flex;
                        flex-direction: row;
                    }
                    .navbar__order, .navbar__account {
                        display: block;
                        height: 65px;
                        line-height:65px;
                        width:50%;
                        text-align: center;
                    }
                    .navbar__order {
                        border-bottom: 5px solid ${theme.colors.secondary};
                    }
                    .navbar__account {
                        border-bottom: 5px solid ${theme.colors.primary};
                    }
                    .menu__ctrl {
                        position: fixed;
                        top: 0;
                        background: #000;
                        z-index: 1003;
                        width: 316px;
                    }
                    .active__mark  {
                        display : none!important;
                    }
                    .navbar__lv1__item {
                        width:100%;
                        text-align:left;
                        height:auto;
                    }
                    .navbar__lv1__item .navbar__lv2--show { 
                        display:flex;
                        transition: all .3s;
                    }
                    .navbar__lv1__item__title {
                        height: auto;
                        padding: 0 30px;
                        color:#FFF;
                    }
                    
                    .navbar__lv1__item__title:after {
                        content: '';
                        width: 32px;
                        height: 32px;
                        background-image: url(${openImg});
                        margin-left: 4px;
                        transition: all .3s;
                        transform: rotate(-180deg);
                        display: inline-block;
                        vertical-align: middle;
                    }

                    .navbar__lv1__item__title.menu__ctrl:after {
                        display:none;
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
                        width: 316px!important;
                        flex-direction: column;
                    }
                    .navbar__lv2__item {
                        margin: 0;
                    }
				}

            `}</style>
        </ul>
    )

});

export default Navbar;