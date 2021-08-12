import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import { Select } from 'antd';

import { useUser } from '../../../../hooks/useUser';
import { useHasMounted } from '../../../../hooks/useHasMounted';

import { setCheckQuery, setCode, setProductInfo, setType } from '../../../../store/goOrder/action';
import { setCurrentAccount } from '../../../../store/user/action';

import { accountGroupByType } from '../../../../services/user/accountGroupByType';

// import grid from '../../../../resources/images/components/goOrder/grid-grid-big.svg';
import arrow from '../../../../resources/images/components/goOrder/arrow-caret-down.svg';
import theme from '../../../../resources/styles/theme';
import logo from '../../../../resources/images/components/goOrder/logo.svg';

import { useCheckSocialLogin } from '../../../../hooks/useCheckSocialLogin';
import { AccountAvatar } from '../../AccountAvatar';
import { objectToQueryHandler } from '../../../../services/objectToQueryHandler';
import { logout } from '../../../../services/user/logoutFetcher';
import { defaultProductInfo } from '../SB/Info';

const { Option } = Select;

const DropDownArrow = () => {
    return (
        <>
            <img src={arrow} alt="arrow"></img>
        </>
    );
};

const Header = () => {
    // 客戶登入/登出的帳號及個人化設定處理，回傳 { isLogin, accounts, userSettings }
    const { isLogin } = useUser();
    const { socalLogin } = useCheckSocialLogin();
    const code = useSelector(store => store.goOrder.code);
    const hasMounted = useHasMounted();

    const dispatch = useDispatch();
    const accounts = useSelector(store => store.user.accounts);
    const currentAccount = useSelector(store => store.user.currentAccount);
    const type = useSelector(store => store.goOrder.type);
    const userSettings = useSelector(store => store.user.userSettings);
    const socalLoginData = useSelector(store => store.user.socalLogin);
    const solaceInit = useSelector(store => store.goOrder.solaceInit);

    const [menuVisible, setMenuVisible] = useState(false);

    const groupedAccount = accountGroupByType(accounts);
    const accountList = groupedAccount[type];

    const router = useRouter();

    const accountElement = () => {
        if (currentAccount != null) {
            return (
                <AccountAvatar
                    style={{
                        width: '26px',
                        height: '26px',
                        lineHeight: '26px',
                        fontSize: '1.2rem',
                    }}
                >
                    {currentAccount.username && currentAccount.username[0]}
                </AccountAvatar>
            );
        } else {
            return (
                <AccountAvatar
                    style={{
                        width: '26px',
                        height: '26px',
                        lineHeight: '26px',
                        fontSize: '1.2rem',
                    }}
                >
                    {''}
                </AccountAvatar>
            );
        }
    };

    useEffect(() => {
        document.addEventListener('click', bodyClickHandler);
        return () => {
            document.removeEventListener('click', bodyClickHandler);
        };
    }, [menuVisible]);

    // TODO: 連動 current account 的處理
    useEffect(() => {
        // TODO: 無帳號處理
        if (hasMounted) {
            let currentAccount;
            if (type === 'S') {
                const defaultStockAccount = groupedAccount.S.find(
                    account => `${account.broker_id}-${account.account}` === userSettings.defaultStockAccount,
                );
                currentAccount = defaultStockAccount || groupedAccount.S[0];
            } else {
                currentAccount = groupedAccount[type][0];
            }
            dispatch(setCurrentAccount(currentAccount));
        }
    }, [type]);

    const bodyClickHandler = e => {
        if (e.target.className !== 'ant-tooltip-content') {
            if (menuVisible) {
                setMenuVisible(false);
            }
        }
    };

    const socalLoginChildren = useMemo(() => {
        if (socalLoginData._id != null) {
            if (socalLoginData.img != null && socalLoginData.img) {
                return (
                    <div className="socal__box">
                        <span className="socalName">{socalLoginData.name}</span>
                        <Avatar src={socalLoginData.img} size={26} />
                    </div>
                );
            } else {
                return (
                    <div className="socal__box">
                        <span className="socalName">{socalLoginData.name}</span>
                        <Avatar size={26}>{socalLoginData.name.substr(0, 1)}</Avatar>
                    </div>
                );
            }
        } else {
            return null;
        }
    }, [socalLoginData]);

    const handleTypeChange = value => {
        dispatch(setProductInfo({}));
        dispatch(setType(value));
        dispatch(setCheckQuery(false));
        switch (value) {
            case 'S':
                dispatch(setCode('2890'));
                break;
            case 'H':
                dispatch(setCode(defaultProductInfo.symbol));
                break;
            default:
                dispatch(setCode('2890'));
                break;
        }
        // if (value !== 'S') {
        //     dispatch(setCode(''));
        // } else {
        //     dispatch(setCode('2890'));
        // }

        // dispatch(setCurrentAccount(groupedAccount[value][0]));
    };

    const onAccountChange = value => {
        const account = accountList.find(account => `${account.broker_id}-${account.account}` === value);
        dispatch(setCurrentAccount(account));
    };

    const updateQueryStringParameter = (uri, key, value) => {
        var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
        var separator = uri.indexOf('?') !== -1 ? '&' : '?';
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + '=' + value + '$2');
        } else {
            return uri + separator + key + '=' + value;
        }
    };

    const loginClickHandler = () => {
        const query = router.query;
        let queryStr = objectToQueryHandler(query);
        if (code) {
            queryStr = updateQueryStringParameter(queryStr, 'stockid', code);
        }
        window.location =
            `${process.env.NEXT_PUBLIC_SUBPATH}` +
            `/SinoTrade_login${queryStr}` +
            `${queryStr ? '&' : '?'}` +
            `redirectUrl=${router.pathname}`;
    };

    const currentAccountHandler = () => {
        if (currentAccount != null) {
            if (currentAccount.accttype !== type) {
                return '--';
            } else {
                return `${currentAccount.broker_id || ''}-${currentAccount.account || ''}`;
            }
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            window.location.reload();
            // window.location.href = `${process.env.NEXT_PUBLIC_SUBPATH}`;
        } catch (error) {
            console.error(`logout error:`, error);
        }
    };

    const renderMenu = () => {
        return (
            <>
                {socalLoginData._id == null && (
                    <>
                        <a
                            style={{
                                marginBottom: '8px',
                                display: 'inline-block',
                                color: '#0d1623',
                                zIndex: '999',
                                fontWeight: 'bold',
                            }}
                            href={process.env.NEXT_PUBLIC_SUBPATH + '/TradingAccount'}
                            target="_blank"
                        >
                            我的帳務
                        </a>
                        <br />
                    </>
                )}
                <a
                    style={{
                        marginBottom: '8px',
                        display: 'inline-block',
                        color: '#0d1623',
                        fontWeight: 'bold',
                    }}
                    href={process.env.NEXT_PUBLIC_SUBPATH + '/watchLists'}
                    target="_blank"
                >
                    我的自選
                </a>
                <br />
                <a
                    style={{
                        display: 'block',
                        color: '#0d1623',
                        fontWeight: 'bold',
                    }}
                    onClick={() => {
                        handleLogout();
                    }}
                >
                    登出
                </a>
            </>
        );
    };

    if (!hasMounted) {
        return null;
    }

    return (
        <div className="Header__container">
            <div className="colorArea__container">
                <div className="primary"></div>
                <div className="secondary"></div>
            </div>
            <div className="main__container">
                {isLogin && (
                    <>
                        <div className="dropdown__container">
                            <Select
                                // defaultValue={type}
                                // defaultValue={'S'}
                                value={type}
                                style={{ width: 111 }}
                                onChange={handleTypeChange}
                                getPopupContainer={trigger => trigger.parentElement}
                                bordered={false}
                                suffixIcon={<DropDownArrow />}
                            >
                                {/* {groupedTypes.map(accType => (
                                    <Option key={accType}>{getAccountText(accType)}</Option>
                                ))} */}
                                <Option value={'S'}>國內證券</Option>
                                {solaceInit && <Option value={'H'}>海外證券</Option>}
                            </Select>
                        </div>
                        {accountList?.length > 0 && (
                            <div className="dropdown__container">
                                <Select
                                    style={{ width: 136 }}
                                    value={currentAccountHandler()}
                                    onChange={onAccountChange}
                                    getPopupContainer={trigger => trigger.parentElement}
                                    bordered={false}
                                    suffixIcon={<DropDownArrow />}
                                    notFoundContent={<div></div>}
                                >
                                    {accountList?.length > 0 &&
                                        accountList.map(account => (
                                            <Option key={`${account.broker_id}-${account.account}`}>
                                                <span className="option__account">{`${account.broker_id}-${account.account}`}</span>
                                                <span className="option__username">{`${account.bhname} ${account.username}`}</span>
                                            </Option>
                                        ))}
                                </Select>
                            </div>
                        )}
                        <Tooltip
                            placement="topLeft"
                            title={renderMenu.bind(null, socalLogin)}
                            color="white"
                            overlayClassName="menu__tooltip"
                            visible={menuVisible}
                            style={{ width: '500px' }}
                        >
                            <div
                                className="accountElement"
                                onClick={e => {
                                    e.stopPropagation();
                                    setMenuVisible(true);
                                }}
                            >
                                {accountElement()}
                            </div>
                        </Tooltip>
                    </>
                )}
                {socalLogin && (
                    <>
                        <img className="logo" src={logo} />
                        <Tooltip
                            placement="topRight"
                            title={renderMenu.bind(null, socalLogin)}
                            color="white"
                            overlayClassName="menu__tooltip--2"
                        >
                            {socalLoginChildren}
                        </Tooltip>
                    </>
                )}
                {!socalLogin && !isLogin && (
                    <>
                        <img className="logo" src={logo} />
                        <button className="grid__button" onClick={loginClickHandler}>
                            開戶 / 登入
                        </button>
                    </>
                )}
            </div>
            <style jsx>{`
                .accountElement {
                    position: absolute;
                    right: 16px;
                    cursor: pointer;
                }
                .Header__container {
                    width: 100%;
                }
                .logo {
                    margin-left: 16px;
                }
                .colorArea__container {
                    display: flex;
                }
                .colorArea__container .primary {
                    width: 111px;
                    height: 4px;
                    background-color: ${theme.colors.primary};
                }
                .colorArea__container .secondary {
                    width: calc(100% - 111px);
                    height: 4px;
                    background-color: ${theme.colors.secondary};
                }
                .main__container {
                    width: 100%;
                    height: 44px;
                    background-color: ${theme.colors.darkBg};
                    position: relative;
                    display: flex;
                    align-items: center;
                }
                button.grid__button {
                    border: none;
                    background-color: #c43826;
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 112px;
                    color: white;
                    height: 44px;
                    font-size: 1.6rem;
                }
            `}</style>
            <style jsx global>{`
                .dropdown__container .ant-select-item-option-content .option__account {
                    display: block;
                }
                .dropdown__container .ant-select-selection-item .option__account {
                    display: none;
                }
                .ant-select-item.ant-select-item-option.ant-select-item-option-selected {
                    background: #e6ebf5;
                }

                .dropdown__container .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
                    background-color: inherit;
                    color: #ffffff;
                    padding: 0 16px;
                }
                .dropdown__container .ant-select-arrow {
                    top: 28%;
                    right: 11px;
                }
                .ant-avatar-string {
                    line-height: 26px !important;
                }
                .socalName {
                    font-size: 1.6rem;
                    color: white;
                    margin-right: 8px;
                }
                .socal__box {
                    position: absolute;
                    right: 16px;
                }
                .menu__tooltip .ant-tooltip-inner {
                    color: #0d1623;
                    font-size: 1.6rem;
                    box-shadow: 0 2px 15px 0 rgba(169, 182, 203, 0.7);
                    padding: 16px;
                    line-height: 25px;
                    margin-top: -12px;
                }
                .menu__tooltip--2 .ant-tooltip-inner {
                    color: #0d1623;
                    font-size: 1.6rem;
                    box-shadow: 0 2px 15px 0 rgba(169, 182, 203, 0.7);
                    padding: 16px;
                    line-height: 25px;
                    margin-top: -12px;
                    margin-left: 12px;
                    width: 110px;
                }
            `}</style>
        </div>
    );
};

export default Header;
