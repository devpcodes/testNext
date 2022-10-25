import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { fetchAccount } from '../services/components/subscriptionOverview/fetchAccount';
import { getToken } from '../services/user/accessToken';
import { postQueryCrossSelling } from '../services/components/mySubscription/postQueryCrossSelling';
import { debounce } from '../services/throttle';

export const useCheckSubscriptionAcc = () => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const userSettings = useSelector(store => store.user.userSettings);
    const [applyStatus, setApplyStatus] = useState(false);
    const [signAccounts, setSignAccounts] = useState([]);
    const [accountInfo, setAccountInfo] = useState({});
    const [signAcc, setSignAcc] = useState(false);
    useEffect(() => {
        getDsAndBank();
    }, []);
    useEffect(() => {
        if (currentAccount.idno != null && userSettings.confirmAfterStockOrdered != null) {
            debounce(getDsAndBank, 100);
        }
    }, [currentAccount, userSettings]);

    // useEffect(() => {
    //     if (signAccounts.length > 0) {
    //         const signAccs = signAccounts.filter(item => {
    //             return item.account === currentAccount.account;
    //         });
    //         setSignAcc(signAccs[0]?.bank_flag === '0' ? true : false);
    //     } else {
    //         setSignAcc(false);
    //     }
    // }, [currentAccount, signAccounts]);

    const getDsAndBank = async () => {
        //TODO mock
        // setApplyStatus(true);
        // getQueryCrossSelling(currentAccount.account);
        try {
            const res = await fetchAccount(getToken());
            console.log('step1', res);
            if (res.applyStatus === '1') {
                setApplyStatus(true);
                // getQueryCrossSelling(currentAccount.account);
                setAccountInfo(res);
            } else {
                setApplyStatus(false);
            }

            // if (res.dsStatus === '1') {
            //     setApplyStatus(true);
            // } else {
            //     setApplyStatus(false);
            // }

            if (res.tSaleStatus === '0') {
                setSignAcc(true);
            } else {
                setSignAcc(false);
            }
        } catch (error) {
            setApplyStatus(false);
            message.error(error || '伺服器錯誤');
        }
    };

    // const getQueryCrossSelling = async account => {
    //     const res = await postQueryCrossSelling(getToken());
    //     console.log('res', res, account);
    //     setSignAccounts(res);
    // };

    return [applyStatus, signAcc, accountInfo];
    // return hasMounted;
};
