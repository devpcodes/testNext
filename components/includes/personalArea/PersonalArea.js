import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import NavList from '../navbar/navList';
import { AccountDropdown } from './accountDropdown/AccountDropdown';
import { logout } from '../../../services/user/logoutFetcher';
import { setIsLogin } from '../../../store/user/action';
import { TradingQuickView } from './TradingQuickView';
import { useWindowSize } from '../../../hooks/useWindowSize';

import theme from '../../../resources/styles/theme';
import signOutImg from '../../../resources/images/components/header/ic-signout.png';
import closeImg from '../../../resources/images/components/header/ic_close_horizontal_flip.png';
import openImg from '../../../resources/images/components/header/ic_open.png';

export const PersonalArea = ({ personalAreaVisible }) => {
    const dispatch = useDispatch();
    const winSize = useWindowSize();

    const serverPersonalNav = useSelector(store => store.server.navData?.personal);
    const clientPersonalNav = useSelector(store => store.layout.navData?.personal);
    const isMobile = useSelector(store => store.layout.isMobile);
    const personalNav = clientPersonalNav ? clientPersonalNav : serverPersonalNav;

    const handleLogout = async () => {
        try {
            await logout();
            dispatch(setIsLogin(false));
            window.location.href = `${process.env.NEXT_PUBLIC_SUBPATH}`;
        } catch (error) {
            console.error(`logout error:`, error);
        }
    };

    return (
        <div className="personalArea__container">
            <div className="personalArea__wrapper">
                <div className="personalArea__content">
                    <div className="myNav__container">
                        {!!personalNav &&
                            personalNav.map((data, index) => (
                                <div className="myNav__list" key={index}>
                                    <NavList lv2Data={data} toggleList={isMobile} id={index} />
                                </div>
                            ))}
                    </div>
                    <div className="accountInfo__container">
                        <AccountDropdown personalAreaVisible={personalAreaVisible} />
                        <TradingQuickView />
                    </div>
                </div>
            </div>
            <button className="personalArea__logoutBtn" onClick={handleLogout}>
                <img src={signOutImg} alt="signOut" />
                ??????
            </button>
            <style jsx>{`
                .personalArea__container {
                    margin: 0;
                    padding: 0;
                    position: absolute;
                    top: -4px;
                    right: 0;

                    border-top: 6px solid ${theme.colors.secondary};
                    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.3);
                    background: #fff;
                    z-index: 1001;
                    text-align: left;
                }
                .personalArea__container:before {
                    content: '';
                    position: absolute;
                    top: -14px;
                    right: 47px;
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 0 5.5px 8px 5.5px;
                    border-color: transparent transparent ${theme.colors.secondary} transparent;
                }
                .personalArea__content {
                    display: flex;
                    padding: 18px 36px;
                }
                .myNav__container {
                    display: flex;
                }
                .myNav__container + .accountInfo__container {
                    margin-left: 37px;
                }
                .myNav__list ~ .myNav__list {
                    margin-left: 37px;
                }
                .accountInfo__container {
                    width: ${isMobile ? '100%' : 'auto'};
                }
                .personalArea__logoutBtn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    min-width: 210px;
                    height: 70px;
                    font-size: 1.8rem;
                    font-weight: 600;
                    color: ${theme.colors.text};
                    background-color: ${theme.colors.secondary};
                    transition: ${theme.button.transition};
                    border: none;
                }
                .personalArea__logoutBtn:hover {
                    background-color: ${theme.colors.secondaryHover};
                }
                .personalArea__logoutBtn img {
                    margin-right: 5px;
                }
                @media (max-width: ${theme.mobileBreakPoint}px) {
                    .personalArea__container {
                        position: absolute;
                        width: calc((10 / 12) * 100vw);
                        height: ${winSize.height}px;
                        top: -74px;
                        right: 0;
                        bottom: 0;
                        border-top: none;
                        background: ${theme.colors.darkBg};
                        box-shadow: none;
                    }
                    .personalArea__container:before {
                        display: none;
                    }
                    .personalArea__wrapper {
                        height: calc(100% - 70px);
                        overflow-y: auto;
                        overflow-x: hidden;
                        -ms-overflow-style: none; /* IE and Edge */
                        scrollbar-width: none; /* Firefox */
                    }
                    .personalArea__wrapper::-webkit-scrollbar {
                        display: none; /* Hide scrollbar for Chrome, Safari and Opera */
                    }
                    .personalArea__content {
                        flex-wrap: wrap-reverse;
                        padding: 0;
                    }
                    .myNav__container {
                        flex-direction: column;
                        width: 100%;
                    }
                    .myNav__container + .accountInfo__container {
                        margin-left: 0;
                    }
                    .myNav__list ~ .myNav__list {
                        margin-left: 0;
                    }
                    .myNav__list {
                        width: 100%;
                    }
                    .personalArea__logoutBtn {
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        min-width: 100%;
                    }
                }
            `}</style>
            <style jsx global>{`
                @media (max-width: ${theme.mobileBreakPoint}px) {
                    .personalArea__container .navList {
                        width: 100%;
                    }
                    .personalArea__container .navbar__lv2__item__title {
                        height: 70px;
                        padding: 0 36px;
                        margin: 0;
                        color: ${theme.colors.secondary};
                        font-size: 2rem;
                        border-bottom: none;
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        transition: all 0.3s;
                    }
                    .personalArea__container .navbar__lv2__item__title:after {
                        content: '';
                        width: 32px;
                        height: 32px;
                        background-image: url(${closeImg});
                        margin-left: 4px;
                        transition: all 0.3s;
                        transform: rotate(-180deg);
                    }
                    .personalArea__container .navbar__lv2__item__title--hide {
                        color: ${theme.colors.text};
                    }
                    .personalArea__container .navbar__lv2__item__title--hide:after {
                        background-image: url(${openImg});
                        transform: rotate(0);
                    }
                    .personalArea__container .navbar__lv3 {
                        background-color: ${theme.colors.lightBg};
                        margin: 0;
                        padding: 14px 0 8px 40px;
                        position: relative;
                        display: flex;
                        flex-wrap: wrap;
                        transition: transform 0.1s ease-in;
                        transform-origin: top center;
                    }
                    .personalArea__container .navbar__lv3--hide {
                        position: absolute;
                        top: -999px;
                        width: 100%;
                        transform: scale(1, 0);
                    }
                    .personalArea__container .navbar__lv3:before {
                        content: '';
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 100%;
                        height: 6px;
                        background-color: ${theme.colors.secondary};
                    }
                    .personalArea__container .navbar__lv3__item {
                        width: 50%;
                    }
                }
            `}</style>
        </div>
    );
};

PersonalArea.propTypes = {
    personalAreaVisible: PropTypes.bool.isRequired,
};
