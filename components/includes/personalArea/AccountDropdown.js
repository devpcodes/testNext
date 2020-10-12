import { useState, useRef, useEffect } from 'react';
import { Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { accountGroupByType } from '../../../services/user/accountGroupByType';
import { setCurrentAccount } from '../../../actions/user/action';

import { AccountAvatar } from '../AccountAvatar';
import MyTransition from '../myTransition';

import theme from '../../../resources/styles/theme';
import checkImg from '../../../resources/images/components/login/ic-check.png';

export const AccountDropdown = ({ personalAreaVisible }) => {
    const selectRef = useRef(null);
    const dropdownWidth = 243;
    const selectTop = selectRef.current?.getBoundingClientRect()?.top;
    const dropdownCssTop = selectTop ? `${selectTop}px !important` : '0px';
    const dropdownCssWidth = selectTop ? `${dropdownWidth - 28}px !important` : '0px';

    const { Option, OptGroup } = Select;
    const dispatch = useDispatch();
    const isMobile = useSelector(store => store.layout.isMobile);
    const accounts = useSelector(store => store.user.accounts);
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [listVisible, setListVisible] = useState(false);

    const groupedAccount = accountGroupByType(accounts);
    const groupedAccountTypes = Object.keys(groupedAccount);

    const getAccountText = accType => {
        switch (accType) {
            case 'S':
                return '國內證券';
            case 'H':
                return '國外證券';
            case 'F':
                return '期權';
            default:
                return '其他';
        }
    };

    useEffect(() => {
        if (!personalAreaVisible || !isMobile) {
            setListVisible(false);
        }
    }, [personalAreaVisible, isMobile]);

    const toggleListVisible = () => {
        setListVisible(!listVisible);
    };

    const keyPressedToToggle = e => {
        if (e.key === 'Enter') {
            toggleListVisible();
        }
    };

    const dispatchCurrentAccount = (currentAccount, accounts) => {
        const selectedAccount = accounts.find(account => `${account.broker_id}-${account.account}` === currentAccount);
        dispatch(setCurrentAccount(selectedAccount));
    };

    const handleChange = value => {
        dispatchCurrentAccount(value, accounts);
    };

    const currentAccountHandler = e => {
        const selectedAccount = e.currentTarget.getAttribute('data-account');
        dispatchCurrentAccount(selectedAccount, accounts);
        setListVisible(false);
    };

    const keyPressed = e => {
        if (e.key === 'Enter') {
            currentAccountHandler(e);
        }
    };

    if (!accounts.length || (groupedAccountTypes.length === 0 && groupedAccount.constructor === Object)) return null;

    return (
        <div className="account__container" ref={selectRef}>
            {isMobile ? (
                <>
                    <div className="account__container--mobile">
                        <div className="account__wrapper">
                            <AccountAvatar>{currentAccount.username && currentAccount.username[0]}</AccountAvatar>
                            <div className="select__container">
                                <div className="select__account">{`${currentAccount.broker_id}-${currentAccount.account}`}</div>
                                <div className="select__username">經紀部 {currentAccount.username}</div>
                            </div>
                        </div>
                        <div
                            className="button__clickToShow"
                            onClick={toggleListVisible}
                            onKeyDown={keyPressedToToggle}
                            role="button"
                            tabIndex="0"
                        >
                            {listVisible ? '確定' : '切換帳號'}
                        </div>
                    </div>
                    <div className="rectangle"></div>
                    <MyTransition isVisible={listVisible} classNames={'accounts'}>
                        <div className="account__container--mobile accountList__container">
                            {groupedAccountTypes.map((accType, index) => {
                                const accText = getAccountText(accType);
                                const accountsPerGroup = groupedAccount[accType];
                                return (
                                    !!accountsPerGroup.length && (
                                        <div className="accountList__grouped" key={index}>
                                            <span className="optGroup__accType">{accText}</span>
                                            {accountsPerGroup.map(account => (
                                                <div
                                                    key={`${account.broker_id}-${account.account}`}
                                                    className="account__card"
                                                    data-account={`${account.broker_id}-${account.account}`}
                                                    onClick={currentAccountHandler}
                                                    onKeyDown={keyPressed}
                                                    role="menuitem"
                                                    tabIndex="0"
                                                >
                                                    <div className="account__wrapper">
                                                        <AccountAvatar>{account.username[0]}</AccountAvatar>
                                                        <div className="select__container">
                                                            <div className="select__account">{`${account.broker_id}-${account.account}`}</div>
                                                            <div className="select__username">
                                                                經紀部 {account.username}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {`${currentAccount.broker_id}-${currentAccount.account}` ===
                                                        `${account.broker_id}-${account.account}` && (
                                                        <img src={checkImg} alt="check"></img>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )
                                );
                            })}
                        </div>
                    </MyTransition>
                </>
            ) : (
                <Select
                    className="account__select"
                    defaultValue={`${currentAccount.broker_id}-${currentAccount.account}`}
                    style={{ width: dropdownWidth }}
                    onChange={handleChange}
                >
                    {groupedAccountTypes.map((accType, index) => {
                        const accText = getAccountText(accType);
                        const accountsPerGroup = groupedAccount[accType];

                        return (
                            !!accountsPerGroup.length && (
                                <OptGroup label={<span className="optGroup__accType">{accText}</span>} key={index}>
                                    {accountsPerGroup.map(account => (
                                        <Option
                                            value={`${account.broker_id}-${account.account}`}
                                            key={`${account.broker_id}-${account.account}`}
                                        >
                                            <span className="option__accType">{accText} | </span>
                                            <span className="option__account">{`${account.broker_id}-${account.account}`}</span>
                                            <span className="option__username">經紀部 {account.username}</span>
                                        </Option>
                                    ))}
                                </OptGroup>
                            )
                        );
                    })}
                </Select>
            )}

            <style jsx>{`
                .account__container {
                    position: relative;
                }
                .account__container :global(.ant-select-selector) {
                    border: 0;
                    border-bottom: solid 1px #e6ebf5;
                    height: 36px;
                    padding: 0 11px 0 0;
                    font-size: 1.6rem;
                    font-weight: 600;
                }
                .option__accType {
                    color: ${theme.colors.secondary};
                }
                .optGroup__accType,
                .option__accType,
                .option__account,
                .option__username,
                .account__wrapper {
                    font-size: 1.6rem;
                    font-weight: 600;
                }
                @media (max-width: ${theme.mobileBreakPoint}px) {
                    .account__container {
                        color: ${theme.colors.text};
                        background-color: ${theme.colors.darkBg};
                        height: ${listVisible ? '100vh' : 'auto'};
                        position: ${listVisible ? 'absolute' : 'relative'};
                        width: ${listVisible ? '100%' : 'auto'};
                        z-index: ${listVisible ? '10' : 'auto'};
                    }
                    .account__container--mobile {
                        display: flex;
                        padding: 13px 20px;
                        height: 70px;
                        align-items: center;
                        justify-content: space-between;
                        background-color: ${theme.colors.darkBg};
                    }
                    .accountList__container {
                        display: block;
                        height: auto;
                    }
                    .account__card {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        cursor: pointer;
                    }
                    .account__card img {
                        margin-right: 8px;
                    }
                    .account__wrapper {
                        display: flex;
                        align-items: center;
                        margin: 10px 0;
                    }
                    .select__container {
                        margin-left: 17px;
                    }
                    .button__clickToShow {
                        display: flex;
                        align-items: center;
                        width: 32px;
                        height: 44px;
                        cursor: pointer;
                    }
                    .rectangle {
                        transform: rotate(-180deg);
                        background-image: linear-gradient(to bottom, #0d1623, #080e16);
                        width: 99%;
                        height: 10px;
                    }
                    .optGroup__accType {
                        color: #a9b6cb;
                    }
                    .accountList__grouped ~ .accountList__grouped {
                        margin-top: 24px;
                    }
                }
            `}</style>
            <style jsx global>{`
                .account__container .account__select:after {
                    content: '';
                    position: absolute;
                    top: 9px;
                    right: 12px;
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 7px 4.5px 0 4.5px;
                    border-color: #c43826 transparent transparent transparent;
                }
                .account__container .ant-select:not(.ant-select-disabled):hover .ant-select-selector {
                    border-color: #e6ebf5;
                }
                .account__container
                    .ant-select-focused.ant-select-single:not(.ant-select-customize-input)
                    .ant-select-selector {
                    border-bottom: 1px solid #e6ebf5;
                    box-shadow: none;
                }
                .account__container .ant-select-arrow {
                    display: none;
                }
                .ant-select-item-option-content .option__accType {
                    display: none;
                }
                .ant-select-item-option-content .option__account {
                    display: block;
                }
                .ant-select-selection-item .option__account {
                    display: none;
                }
                .ant-select-item.ant-select-item-group .optGroup__accType {
                    color: ${theme.colors.secondary};
                }
                .ant-select-item.ant-select-item-group,
                .ant-select-item.ant-select-item-option.ant-select-item-option-grouped {
                    padding-left: 20px;
                }
                .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
                    background-color: ${theme.colors.accountHover};
                }
                .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
                    background-color: #ffffff;
                }
                .ant-select-item-option-selected:after {
                    content: '';
                    position: absolute;
                    top: 17px;
                    right: 20px;
                    width: 19px;
                    height: 19px;
                    background-image: url(${checkImg});
                }
                .ant-select-dropdown.ant-select-dropdown-placement-bottomLeft {
                    width: ${dropdownCssWidth};
                    min-width: ${dropdownCssWidth};
                    top: ${dropdownCssTop};
                }
            `}</style>
        </div>
    );
};

AccountDropdown.propTypes = {
    personalAreaVisible: PropTypes.bool.isRequired,
};
