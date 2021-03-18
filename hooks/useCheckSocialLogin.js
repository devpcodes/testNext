import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { checkLogin } from '../services/components/layouts/checkLogin';
import { getCookie } from '../services/components/layouts/cookieController';

export const useCheckSocialLogin = () => {
    const router = useRouter();
    const [socalLogin, setSocalLogin] = useState(false);
    useEffect(() => {
        if (!checkLogin()) {
            if (getCookie('socialToken')) {
                setSocalLogin(true);
            }
        }
    }, [router]);
    return { socalLogin };
};
