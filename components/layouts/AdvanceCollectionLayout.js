import { useEffect, useState, useContext } from 'react';
import jwt_decode from 'jwt-decode';

import moment from 'moment';
import Head from 'next/head';
import { checkLogin } from '../../services/components/layouts/checkLogin';
import { accountGroupByType } from '../../services/user/accountGroupByType';
import { PageHead } from '../includes/PageHead';
import { getToken } from '../../services/user/accessToken';
// import { ReducerContext } from '../../pages/AdvanceCollection';
import { ReducerContext } from '../../store/advanceCollection/reducerContext';
import { ACCOUNTS, DISABLED } from '../../store/advanceCollection/actionType';
import { SELECTED } from '../../store/advanceCollection/actionType';
import { fetchCheckTradingDate } from '../../services/components/goOrder/fetchCheckTradingDate';
const AdvanceCollectionLayout = function ({ children, startTime, endTime, type }) {
    const [verifySuccess, setVerifySuccess] = useState(false);
    const [state, dispatch] = useContext(ReducerContext);

    useEffect(() => {
        // if (checkTimeHandler() && checkLoginHandler(type)) {
        //     setVerifySuccess(true);
        // }
        checkHandler(type);
    }, [type]);

    const checkHandler = async type => {
        let chTime = await checkTimeHandler();
        let chLogin = checkLoginHandler(type);
        if (chTime && chLogin) {
            setVerifySuccess(true);
        }
    };

    const checkTimeHandler = async () => {
        // const formatTime = 'HH:mm:ss';
        // let time = moment().format(formatTime);
        // time = moment(time, formatTime);
        // const beforeTime = moment(startTime, formatTime);
        // const afterTime = moment(endTime, formatTime);
        try {
            const currentDate = moment().format('YYYYMMDD');
            const res = await fetchCheckTradingDate(currentDate, 'reserve');
            if (res?.result?.hasTrading) {
                return true;
            } else {
                dispatch({ type: DISABLED, payload: `目前非申請時間，請於營業日${startTime}-${endTime}申請` });
                return true;
            }
        } catch (error) {
            return true;
        }

        // if (time.isBetween(beforeTime, afterTime)) {
        //     return true;
        // } else {
        //     // alert(`目前非申請時間，請於營業日${startTime}-${endTime}申請`);
        //     dispatch({ type: DISABLED, payload: `目前非申請時間，請於營業日${startTime}-${endTime}申請` });
        //     return true;
        // }
    };

    const checkLoginHandler = type => {
        if (checkLogin()) {
            const tonkenVal = jwt_decode(getToken());
            const groupedAccount = accountGroupByType(tonkenVal.acts_detail);
            if (groupedAccount.S.length > 0) {
                groupedAccount.S = groupedAccount.S.filter(item => {
                    if (type === 'earmarkReserve') {
                        if (item.settle_sp != null && !item.settle_sp) {
                            console.log('item', item);
                            return false;
                        }
                    }
                    if (item.idno === tonkenVal.user_id) return true;
                });
                if (groupedAccount.S.length == 0) {
                    dispatch({ type: ACCOUNTS, payload: [] });
                } else {
                    dispatch({ type: ACCOUNTS, payload: groupedAccount.S });
                    // dispatch({ type: SELECTED, payload: groupedAccount.S[0] });
                }
                return true;
            } else {
                alert('無可交易帳號');
                return false;
            }
        } else {
            alert('權限不足');
            return false;
        }
    };
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                />
            </Head>
            <PageHead title={'永豐金理財網'} />
            {verifySuccess && <div className="page__container">{children}</div>}
            <style jsx>{`
                .page__container {
                    padding-top: 20px;
                    margin-bottom: 40px;
                    min-height: 700px;
                }
            `}</style>
        </>
    );
};

export default AdvanceCollectionLayout;
