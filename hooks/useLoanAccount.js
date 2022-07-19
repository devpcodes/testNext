import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { useUser } from './useUser';
import { setCurrentAccount } from '../store/user/action';
import { fetchAccountStatus } from '../services/components/loznZone/calculation/fetchAccountStatus';
import { getToken } from '../services/user/accessToken';
export const useLoanAccount = token => {
    const { isLogin, accounts } = useUser();
    const dispatch = useDispatch();
    const [haveLoanAccount, setHaveLoanAccount] = useState(null);
    const userSettings = useSelector(store => store.user.userSettings);
    useEffect(() => {
        if (isLogin && userSettings?.confirmAfterStockOrdered != null) {
            // setTimeout(() => {
            //     getAccountStatus();
            // }, 500);
            getAccountStatus();
        }
    }, [isLogin, userSettings]);

    const getAccountStatus = async () => {
        const res = await fetchAccountStatus(getToken());
        if (res.success && res.result?.length > 0) {
            const loanAccounts = [];
            accounts.map(item => {
                for (let index = 0; index < res.result.length; index++) {
                    const element = res.result[index];
                    if (element.status === 'A' && element.account === item.account) {
                        loanAccounts.push(item);
                        return;
                    }
                }
            });
            console.log('loanAccounts................', loanAccounts);
            if (loanAccounts.length > 0) {
                setHaveLoanAccount(true);
                dispatch(setCurrentAccount(loanAccounts[0]));
            } else {
                setHaveLoanAccount(false);
            }
        } else {
            setHaveLoanAccount(false);
        }
    };

    return haveLoanAccount;
};
