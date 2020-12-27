import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';

import { checkLogin } from '../services/components/layouts/checkLogin';
import { getToken } from '../services/user/accessToken';
import { accountGroupByType } from '../services/user/accountGroupByType';

import { setIsLogin, setAccounts, setUserSettings, getUserSettings, setCurrentAccount } from '../store/user/action';

export const useUser = () => {
    const dispatch = useDispatch();
    const isLogin = useSelector(store => store.user.isLogin);
    const accounts = useSelector(store => store.user.accounts);
    const userSettings = useSelector(store => store.user.userSettings);

    useEffect(() => {
        const getDefaultAccount = accounts => {
            const groupedAccount = accountGroupByType(accounts);
            if (groupedAccount.S.length) {
                const defaultStockAccount = groupedAccount.S.find(
                    account => `${account.broker_id}-${account.account}` === userSettings.defaultStockAccount,
                );
                return defaultStockAccount || groupedAccount.S[0];
            } else if (groupedAccount.H.length) {
                return groupedAccount.H[0];
            } else if (groupedAccount.F.length) {
                return groupedAccount.F[0];
            } else {
                return accounts[0];
            }
        };
        const defaultAccount = getDefaultAccount(accounts) || {};
        dispatch(setCurrentAccount(defaultAccount));
    }, [userSettings]);

    useEffect(() => {
        const updateUserSettings = () => {
            const token = getToken();
            token && dispatch(getUserSettings(token));
        };

        if (isLogin) {
            const tokenVal = jwt_decode(getToken());
            dispatch(setAccounts(tokenVal.acts_detail));
            updateUserSettings();
        } else {
            dispatch(setAccounts([]));
            dispatch(setUserSettings({}));
        }
    }, [isLogin]);

    useEffect(() => {
        if (checkLogin()) {
            dispatch(setIsLogin(true));
        }
    }, []);

    return { isLogin, accounts, userSettings };
};
