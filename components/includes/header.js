import Link from 'next/link';
import PropTypes from 'prop-types';

import Navbar from './navbar/navbar';
import { HeaderCallToAction } from './headerCallToAction/HeaderCallToAction';
import logo from '../../resources/images/logo/logo.svg';
import menu from '../../resources/images/components/header/ic_menu.png';
import theme from '../../resources/styles/theme';
import { useSelector, useDispatch } from 'react-redux';
import { setMenuOpen } from '../../store/components/layouts/action';

const Header = ({ showNav }) => {
    const showMenu = useSelector(store => store.layout.showMenu);
    const dispatch = useDispatch();

    const menuClickHandler = function () {
        dispatch(setMenuOpen(true));
    };

    return (
        <header>
            <div className="header__navbar">
                <div className="navbar__switch__m" onClick={menuClickHandler}></div>
                <Link href={'/'}>
                    <a>
                        <img
                            src={logo}
                            alt={'logo'}
                            className={`header__logo ${showMenu ? 'header__logo--hide' : ''}`}
                        ></img>
                    </a>
                </Link>
                <Navbar />
                <HeaderCallToAction />
            </div>
            <style jsx>{`
                header {
                    height: 70px;
                    background: ${theme.colors.darkBg};
                    position: fixed;
                    top: 0;
                    right: 0;
                    left: 0;
                    z-index: 500;
                    display: ${showNav ? '' : 'none'};
                }
                .header__navbar {
                    width: ${theme.contentWidth.pc};
                    height: 100%;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                }
                .navbar__switch__m {
                    width: 70px;
                    height: 70px;
                    background: url(${menu}) center center no-repeat;
                    display: none;
                    cursor: pointer;
                }
                .header__logo {
                    display: inline-block;
                    width: 158px;
                    height: 38px;
                    margin: 16px 0;
                }

                @media (max-width: 1250px) {
                    .header__navbar {
                        width: 90%;
                    }
                }
                @media (max-width: 1112px) {
                    .header__navbar {
                        width: 100%;
                    }
                    .header__logo {
                        width: 132px;
                        height: 32px;
                        margin: 19px 0 19px 10px;
                    }
                }

                @media (max-width: 1024px) {
                    .header__logo--hide {
                        display: none;
                    }
                    .navbar__switch__m {
                        display: block;
                    }
                    .header__logo {
                        margin: 19px 0;
                    }
                }
            `}</style>
        </header>
    );
};

Header.propTypes = {
    showNav: PropTypes.bool.isRequired,
};

export default Header;
