import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { submit } from '../services/components/login/trustLogin';
import { objectToQueryHandler } from '../services/objectToQueryHandler';

import { useSessionStorage } from '../hooks/useSessionStorage';

const Navigation = () => {
    const router = useRouter();
    const [, setPlatform] = useSessionStorage('newweb_platform', 'newweb'); // 因為沒用到，忽略陣列解構的第一個回傳值，只取 setPlatform

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
                    // 新站一律使用 newweb_platform 作為 key，不與舊站 `platform` 與 `source` 兩個 key 混用，以保證舊站未來可安全下架
                    setPlatform(router.query.platform.toLowerCase());
                    // 為保持與舊站的相容，trust login 進站時，也要設定 sessionStorage `platform`，直到舊站下架才移除下面這行
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
