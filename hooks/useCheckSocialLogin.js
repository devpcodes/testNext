import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';
import { checkLogin } from '../services/components/layouts/checkLogin';
import { getCookie } from '../services/components/layouts/cookieController';
import { getSocalToken } from '../services/user/accessToken';
import { setSocalLoginData } from '../store/user/action';

export const useCheckSocialLogin = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [socalLogin, setSocalLogin] = useState(false);
    useEffect(() => {
        if (!checkLogin()) {
            if (getCookie('socialToken')) {
                const tonkenVal = jwt_decode(getSocalToken());
                dispatch(setSocalLoginData(tonkenVal));
                setSocalLogin(true);
            }
        }
    }, [router]);
    return { socalLogin };
};
