import { useState, useEffect } from 'react';
import { Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { accountGroupByType, getAccountText } from '../../../../services/user/accountGroupByType';
import { setCurrentAccount } from '../../../../store/user/action';

import { AccountList } from './AccountList';
import MyTransition from '../../myTransition';

import theme from '../../../../resources/styles/theme';
import checkImg from '../../../../resources/images/components/login/ic-check.png';

export const AccountDropdown = ({ personalAreaVisible }) => {
    const dropdownWidth = 243;
    const { Option, OptGroup } = Select;

    const dispatch = useDispatch();
    const isMobile = useSelector(store => store.layout.isMobile);
    const accounts = useSelector(store => store.user.accounts);
    const currentAccount = useSelector(store => store.user.currentAccount);

    const [listVisible, setListVisible] = useState(false);

    const groupedAccount = accountGroupByType(accounts);
    const groupedAccountTypes = Object.keys(groupedAccount);

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

    if (
        !accounts.length ||
        (groupedAccountTypes.length === 0 && groupedAccount.constructor === Object) ||
        (currentAccount.accttype !== 'S' && currentAccount.accttype !== 'H' && currentAccount.accttype !== 'F')
    )
        return null;

    return (
        <div className="account__container">
            {isMobile ? (
                <>
                    <div className="account__container--mobile currentAccount__container">
                        <AccountList account={currentAccount} />
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
                                                    <AccountList account={account} />
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
                    getPopupContainer={trigger => trigger.parentElement}
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
                                            <span className="option__username">{`${account.bhname || ''} ${
                                                account.username
                                            }`}</span>
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
                    border-bottom: dashed 1px #e6ebf5;
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
                .option__username {
                    font-size: 1.6rem;
                    font-weight: 600;
                }
                @media (max-width: ${theme.mobileBreakPoint}px) {
                    .account__container {
                        color: ${theme.colors.text};
                        background-color: ${theme.colors.darkBg};
                        height: ${listVisible ? '100%' : 'auto'};
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
                    .currentAccount__container {
                        position: relative;
                        z-index: 1;
                        box-shadow: rgba(0, 0, 0, 0.35) 5px 5px 10px;
                    }
                    .accountList__container {
                        display: block;
                        position: absolute;
                        width: 100%;
                        height: calc(100vh - 70px);
                        overflow-y: auto;
                        overflow-x: hidden;
                        background-color: ${theme.colors.darkBg};
                        -ms-overflow-style: none; /* IE and Edge */
                        scrollbar-width: none; /* Firefox */
                    }
                    .accountList__container::-webkit-scrollbar {
                        display: none; /* Hide scrollbar for Chrome, Safari and Opera */
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
                    pointer-events: none;
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
                .account__container .ant-select-item-option-content .option__accType {
                    display: none;
                }
                .account__container .ant-select-item-option-content .option__account {
                    display: block;
                }
                .account__container .ant-select-selection-item .option__account {
                    display: none;
                }
                .account__container .ant-select-item.ant-select-item-group .optGroup__accType {
                    color: ${theme.colors.secondary};
                }
                .account__container .ant-select-item.ant-select-item-group,
                .account__container .ant-select-item.ant-select-item-option.ant-select-item-option-grouped {
                    padding-left: 20px;
                }
                .account__container .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
                    background-color: ${theme.colors.normalBg};
                }
                .account__container .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
                    background-color: #ffffff;
                }
                .account__container .ant-select-item-option-selected:after {
                    content: '';
                    position: absolute;
                    top: 17px;
                    right: 20px;
                    width: 19px;
                    height: 19px;
                    background-image: url(${checkImg});
                }
                .account__container .ant-select-dropdown.ant-select-dropdown-placement-bottomLeft {
                    width: ${dropdownWidth - 28}px !important;
                    min-width: ${dropdownWidth - 28}px !important;
                    top: 0px !important;
                }
            `}</style>
        </div>
    );
};

AccountDropdown.propTypes = {
    personalAreaVisible: PropTypes.bool.isRequired,
};
