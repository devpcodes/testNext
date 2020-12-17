import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { submit } from '../services/components/login/trustLogin';
import { objectToQueryHandler } from '../services/objectToQueryHandler';

const Navigation = () => {
    const router = useRouter();

    const doLogin = async () => {
        const getQueryStr = () => {
            if (router.query.nav == '0') {
                return objectToQueryHandler({
                    nav: '0',
                });
            } else {
                return '';
            }
        };

        try {
            const res = await submit(router.query.otp);
            if (res.data.success) {
                if (router.query.platform) {
                    sessionStorage.setItem('platform', router.query.platform);
                }
                router.push(`/${router.query.page || ''}${getQueryStr()}`);
            }
        } catch (e) {
            router.push(`/errPage`);
            // 注意：這裡不需要再 alert 任何錯誤訊息，myAxios.js 已在上層處理 api 的 error handle (顯示錯誤訊息)
        }
    };

    useEffect(() => {
        if (router.query.otp) {
            doLogin();
        }
    }, [router.query]);

    return null;
};

Navigation.getLayout = Page => Page;

export default Navigation;
