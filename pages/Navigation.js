import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { submit } from '../services/components/login/trustLogin';
import { getParamFromQueryString } from '../services/getParamFromQueryString';

const Navigation = () => {
    const router = useRouter();

    const doLogin = async () => {
        const queryStringDict = {
            platform: getParamFromQueryString('platform'),
            source: getParamFromQueryString('source'),
            page: getParamFromQueryString('page'),
            otp: getParamFromQueryString('otp'),
        };

        try {
            const res = await submit(queryStringDict.otp);
            if (res.data.success) {
                // 來源有取 platform 也有 source，為保持與舊站的相容，暫時這兩個值都要儲存在 sessionStorage
                sessionStorage.setItem('platform', queryStringDict.platform);
                sessionStorage.setItem('source', queryStringDict.platform.toLowerCase());
                router.push(`/${queryStringDict.page}`);
            }
        } catch (e) {
            router.push(`/errPage`);
            // 注意：這裡不需要再 alert 任何錯誤訊息，myAxios.js 已在上層處理 api 的 error handle (顯示錯誤訊息)
        }
    };

    useEffect(() => {
        doLogin();
    }, []);

    return null;
};

Navigation.getLayout = Page => Page;

export default Navigation;
