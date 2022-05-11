import { useRouter } from 'next/router';
import { Modal } from 'antd';
import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { submit } from '../services/components/login/trustLogin';
import { objectToQueryHandler } from '../services/objectToQueryHandler';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getToken } from '../services/user/accessToken';
import { caValidator } from '../services/caValidator';
import CaHead from '../components/includes/CaHead';
import { checkCert, clearCert, signCert } from '../services/webCa';

const Navigation = () => {
    const router = useRouter();
    const [, setPlatform] = useSessionStorage('newweb_platform', 'newweb'); // 因為沒用到，忽略陣列解構的第一個回傳值，只取 setPlatform

    const doLogin = async () => {
        const getQueryStr = () => {
            let addQueryHeaderObj = {};
            if (router.query.nav == '0') {
                addQueryHeaderObj.nav = '0';
            }
            if (router.query.iswebview == 'true') {
                addQueryHeaderObj.iswebview = 'true';
            }
            if (Object.keys(addQueryHeaderObj).length > 0) {
                return objectToQueryHandler(addQueryHeaderObj);
            } else {
                return '';
            }
        };

        // try {
        const res = await submit(router.query.otp);
        const result = res.data?.result;
        // 不需要做生日驗證
        // localStorage.setItem('INCB', false);
        console.log('=================', result);
        if (res.data.success) {
            console.log(111111111111111111111111111111111111111111111111111111);
            const tokenVal = jwt_decode(getToken());
            console.log(tokenVal);
            const checkData = checkCert(tokenVal.user_id);
            console.log(checkData);
            if (checkData.suggestAction == 'None') {
                // 有憑證送驗章
                const cert = await signCert({ idno: tokenVal.user_id }, true, tokenVal);
                console.log('cert', cert);
                const validateRes = await caValidator(getToken(), {
                    signature: cert.signature,
                    plainText: cert.plainText,
                    certSN: cert.certSN,
                    type: 'web',
                });
                console.log(validateRes);
                if (validateRes.msg !== '驗章成功') {
                    console.log('清除憑證');
                    if (validateRes.msg.split('||')[0].split('=')[1] === '8020') {
                        clearCert();
                        console.log('清除成功');
                    }
                }
            }

            if (router.query.platform) {
                // 新站一律使用 newweb_platform 作為 key，不與舊站 `platform` 與 `source` 兩個 key 混用，以保證舊站未來可安全下架
                setPlatform(router.query.platform.toLowerCase());
                // 為保持與舊站的相容，trust login 進站時，也要設定 sessionStorage `platform`，直到舊站下架才移除下面這行
                sessionStorage.setItem('platform', router.query.platform);
            }

            // http:// || https:// 開頭 全部直接幫忙轉到外部網址
            if (/(^http(s?)):\/\//i.test(router.query.page)) {
                location.href = router.query.page;
            } else {
                router.push(`/${router.query.page || ''}${getQueryStr()}`);
            }
        } else {
            if (result.isOpenAccount) {
                Modal.confirm({
                    content: '您尚未開立證券帳戶，請點選「確定」，即可進行線上開戶。',
                    onOk: () => {
                        window.open(result.url);
                    },
                    visible: true,
                    okText: '確定',
                    cancelText: '取消',
                    onCancel: () => {
                        location.href = `${process.env.NEXT_PUBLIC_SUBPATH}`;
                    },
                });
            }
        }
        // } catch (e) {
        //     router.push(`/errPage`);
        //     // 注意：這裡不需要再 alert 任何錯誤訊息，myAxios.js 已在上層處理 api 的 error handle (顯示錯誤訊息)
        // }
    };

    useEffect(() => {
        if (router.query.otp) {
            doLogin();
        }
    }, [router.query]);

    return (
        <>
            <CaHead />
        </>
    );
};

Navigation.getLayout = Page => Page;

export default Navigation;
