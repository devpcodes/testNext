// import PropTypes from 'prop-types';
import { useState, useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useUser } from '../../../../hooks/useUser';
import { usePlatform } from '../../../../hooks/usePlatform';
import { useHasMounted } from '../../../../hooks/useHasMounted';

import { setType } from '../../../../store/goOrder/action';
import { setCurrentAccount } from '../../../../store/user/action';

import { accountGroupByType, getAccountText } from '../../../../services/user/accountGroupByType';

import grid from '../../../../resources/images/components/goOrder/grid-grid-big.svg';
import theme from '../../../../resources/styles/theme';

import { Select } from 'antd';
const { Option } = Select;

export const Header = () => {
    // 客戶登入/登出的帳號及個人化設定處理，回傳 { isLogin, accounts, userSettings }
    const { isLogin } = useUser();
    // 來源別相關的處理
    const platform = usePlatform();
    const hasMounted = useHasMounted();

    const dispatch = useDispatch();
    const accounts = useSelector(store => store.user.accounts);
    const currentAccount = useSelector(store => store.user.currentAccount);
    const type = useSelector(store => store.goOrder.type);
    const userSettings = useSelector(store => store.user.userSettings);

    // console.log(`==========accountssssssssssssss:`, accounts);

    const groupedAccount = accountGroupByType(accounts);
    const groupedTypes = Object.keys(groupedAccount);
    const accountList = groupedAccount[type];

    // console.log(`============groupedAccount:`, groupedAccount);
    // console.log(`============groupedAccountTypes:`, groupedTypes);
    // console.log(`============type:`, type);
    // console.log(`============accountList:`, accountList);

    useEffect(() => {
        // console.log(`============groupedAccount:`, groupedAccount);
        // console.log(`============hasMounted:`, hasMounted);

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

    const handleTypeChange = value => {
        dispatch(setType(value));
        // dispatch(setCurrentAccount(groupedAccount[value][0]));
    };

    const onAccountChange = value => {
        const account = accountList.find(account => `${account.broker_id}-${account.account}` === value);
        dispatch(setCurrentAccount(account));
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
                <div className="dropdown__container">
                    <Select
                        defaultValue={type}
                        style={{ width: 111 }}
                        onChange={handleTypeChange}
                        getPopupContainer={trigger => trigger.parentElement}
                    >
                        {groupedTypes.map(accType => (
                            <Option key={accType}>{getAccountText(accType)}</Option>
                        ))}
                    </Select>
                </div>
                <div className="dropdown__container">
                    <Select
                        style={{ width: 136 }}
                        value={`${currentAccount.broker_id || ''}-${currentAccount.account || ''}`}
                        onChange={onAccountChange}
                        getPopupContainer={trigger => trigger.parentElement}
                    >
                        {accountList.map(account => (
                            <Option
                                key={`${account.broker_id}-${account.account}`}
                            >{`${account.bhname} ${account.username}`}</Option>
                        ))}
                    </Select>
                </div>
                <button className="grid__button">
                    <img src={grid} alt="grid"></img>
                </button>
            </div>
            <style jsx>{`
                .Header__container {
                    width: 100%;
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
                    background-color: inherit;
                    position: absolute;
                    top: 8px;
                    right: 10px;
                }
            `}</style>
        </div>
    );
};

// Header.displayName = 'goOrderHeader';
