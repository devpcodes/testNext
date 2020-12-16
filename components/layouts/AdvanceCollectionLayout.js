import { useEffect, useState, useContext } from 'react';
import jwt_decode from 'jwt-decode';

import moment from 'moment';
import Head from 'next/head';
import { checkLogin } from '../../services/components/layouts/checkLogin';
import { accountGroupByType } from '../../services/user/accountGroupByType';
import { PageHead } from '../includes/PageHead';
import { getToken } from '../../services/user/accessToken';
import { ReducerContext } from '../../pages/AdvanceCollection';
import { ACCOUNTS } from '../../store/advanceCollection/actionType';
const AdvanceCollectionLayout = function ({ children, startTime, endTime }) {
    const [verifySuccess, setVerifySuccess] = useState(false);
    const [state, dispatch] = useContext(ReducerContext);

    useEffect(() => {
        if (checkTimeHandler() && checkLoginHandler()) {
            setVerifySuccess(true);
        }
    }, []);

    const checkTimeHandler = () => {
        const formatTime = 'HH:mm:ss';
        let time = moment().format(formatTime);
        time = moment(time, formatTime);
        const beforeTime = moment(startTime, formatTime);
        const afterTime = moment(endTime, formatTime);

        if (time.isBetween(beforeTime, afterTime)) {
            return true;
        } else {
            alert(`非營業時間，請於${startTime}-${endTime}申請`);
            return true;
        }
    };

    const checkLoginHandler = () => {
        if (checkLogin()) {
            const tonkenVal = jwt_decode(getToken());
            const groupedAccount = accountGroupByType(tonkenVal.acts_detail);
            if (groupedAccount.S.length > 0) {
                dispatch({ type: ACCOUNTS, payload: groupedAccount.S });
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
        </>
    );
};

export default AdvanceCollectionLayout;
