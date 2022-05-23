import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { useUser } from './useUser';
import { setCurrentAccount } from '../store/user/action';
import { fetchAccountStatus } from '../services/components/loznZone/calculation/fetchAccountStatus';
import { getToken } from '../services/user/accessToken';
export const useLoanAccount = token => {
    const { isLogin, accounts } = useUser();
    const dispatch = useDispatch();
    const [haveLoanAccount, setHaveLoanAccount] = useState(null);
    useEffect(() => {
        if (isLogin) {
            getAccountStatus();
        }
    }, [isLogin]);

    const getAccountStatus = async () => {
        const res = await fetchAccountStatus(getToken());
        if (res.success) {
            const id = jwt_decode(getToken()).user_id;
            const account = accounts.find(element => {
                if (element.idno === id && element.accttype === 'S') {
                    return true;
                }
            });
            // console.log('account....', account);
            setHaveLoanAccount(true);
            dispatch(setCurrentAccount(account));
        } else {
            setHaveLoanAccount(false);
        }
    };

    return haveLoanAccount;
};
