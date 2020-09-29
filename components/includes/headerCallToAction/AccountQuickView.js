import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import NavList from '../navbar/navList';
import { AccountDropdown } from './AccountDropdown';
import { logout } from '../../../services/components/header/logoutFetcher';
import { setIsLogin } from '../../../actions/user/action';

import theme from '../../../resources/styles/theme';
import signoutImg from '../../../resources/images/components/header/ic-signout.png';

export const AccountQuickView = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const serverPersonalNav = useSelector((store) => store.server.navData?.personal);
    const clientPersonalNav = useSelector((store) => store.layout.navData?.personal);
    const personalNav = clientPersonalNav ? clientPersonalNav : serverPersonalNav;

    const handleLogout = async () => {
        await logout();
        dispatch(setIsLogin(false));
        router.push('/');
    };

    return (
        <div className="quickView__container">
            <div className="quickView__content">
                <div className="myNav__container">
                    {personalNav &&
                        personalNav.map((data, index) => (
                            <div className="myNav__list" key={index}>
                                <NavList lv2Data={data} />
                            </div>
                        ))}
                </div>
                <AccountDropdown />
            </div>
            <a className="quickView__logoutBtn" onClick={handleLogout}>
                <img src={signoutImg} />
                登出
            </a>
            <style jsx>{`
                .quickView__container {
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
                .quickView__container:before {
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
                .quickView__content {
                    display: flex;
                    padding: 18px 36px;
                }
                .myNav__container {
                    display: flex;
                }
                .myNav__list {
                    margin-right: 37px;
                }
                .quickView__logoutBtn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 70px;
                    font-size: 18px;
                    font-weight: 600;
                    color: ${theme.colors.text};
                    background-color: ${theme.colors.secondary};
                    transition: ${theme.button.transition};
                }
                .quickView__logoutBtn:hover {
                    background-color: ${theme.colors.secondaryHover};
                }
                .quickView__logoutBtn img {
                    margin-right: 5px;
                }
                @media (max-width: ${theme.mobileBreakPoint}px) {
                    .quickView__container {
                        position: fixed;
                        width: calc((10 / 12) * 100vw);
                        height: 100vh;
                        top: 0px;
                        border-top: none;
                        background: ${theme.colors.darkBg};
                    }
                    .quickView__content {
                        flex-wrap: wrap-reverse;
                    }
                    .myNav__container {
                        flex-direction: column;
                    }
                    .myNav__list {
                        margin-right: 0;
                        width: 100%;
                    }
                    .quickView__logoutBtn {
                        position: absolute;
                        bottom: 0;
                        right: 0;
                    }
                }
            `}</style>
        </div>
    );
};
