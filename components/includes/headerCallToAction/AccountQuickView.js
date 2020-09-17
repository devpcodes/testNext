import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import NavList from '../navbar/navList';
import { AccountDropdown } from './AccountDropdown';

import theme from '../../../resources/styles/theme';
import signoutImg from '../../../resources/images/components/header/ic-signout.png';

export const AccountQuickView = ({ isVisible }) => {
    const personalNav = useSelector((store) => store.layout.navData?.personal);

    return (
        <div className="quickView__container">
            <div className="quickView__content">
                {personalNav &&
                    personalNav.map((data, index) => (
                        <div className="myNav__list" key={index}>
                            <NavList lv2Data={data} />
                        </div>
                    ))}
                <AccountDropdown />
            </div>
            <a href="" className="quickView__logoutBtn">
                <img src={signoutImg} />
                登出
            </a>
            <style jsx>{`
                .quickView__container {
                    margin: 0;
                    padding: 0;
                    display: ${isVisible ? 'block' : 'none'};
                    position: absolute;
                    top: 70px;
                    right: 0;
                    width: 644px;

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
            `}</style>
        </div>
    );
};

AccountQuickView.propTypes = {
    isVisible: PropTypes.bool.isRequired,
};