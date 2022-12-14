import { useRouter } from 'next/router';
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { submit } from '../services/components/login/trustLogin';
import { objectToQueryHandler } from '../services/objectToQueryHandler';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getToken } from '../services/user/accessToken';
import { caValidator } from '../services/caValidator';
import CaHead from '../components/includes/CaHead';
import { checkCert, clearCert, signCert, caResultDataHandler } from '../services/webCa';
import redirectPic from '../resources/images/pages/navigation/finance-analytics-two-color@3x.png';
const Navigation = () => {
    const router = useRouter();
    const [, setPlatform] = useSessionStorage('newweb_platform', 'newweb'); // 因為沒用到，忽略陣列解構的第一個回傳值，只取 setPlatform
    const [clearCA, setClearCA] = useState(false);

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

        const redirect = async () => {
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
        };

        // try {
        const res = await submit(router.query.otp);
        const result = res.data?.result;
        // 不需要做生日驗證
        // localStorage.setItem('INCB', false);
        console.log('=================', result);
        if (res.data.success) {
            const tokenVal = jwt_decode(getToken());
            const checkData = checkCert(tokenVal.user_id);
            if (checkData.suggestAction == 'None') {
                // 有憑證送驗章
                const cert = await signCert({ idno: tokenVal.user_id }, true, tokenVal, true);
                const validateRes = await caValidator(getToken(), {
                    signature: cert.signature,
                    plainText: cert.plainText,
                    certSN: cert.certSN,
                    type: 'web',
                });
                if (validateRes.msg !== '驗章成功') {
                    if (validateRes.msg.split('||')[0].split('=')[1] === '8020') {
                        setClearCA(true);
                        caResultDataHandler(
                            'ApplyCert',
                            tokenVal.user_id,
                            getToken(),
                            redirect,
                            function () {
                                alert('部屬失敗，請關閉此頁面或回到上一頁重新登入');
                            },
                            true,
                        );
                    } else {
                        redirect();
                    }
                } else {
                    redirect();
                }
            } else {
                redirect();
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
            <div className="picBlock">
                <img src={redirectPic} className="redirectPic" />
                <p className="desc">頁面跳轉中 ... </p>
            </div>
            {clearCA && (
                <iframe
                    src={
                        process.env.NEXT_PUBLIC_DM === 'false'
                            ? 'https://ca.sinotrade.com.tw/WebCA/clearLS.html'
                            : 'https://catest.sinotrade.com.tw/WebCA/clearLS.html'
                    }
                    className="clearCAIframe"
                ></iframe>
            )}
            <style jsx>{`
                .picBlock {
                    width: 260px;
                    height: 184px;
                    margin: 78px auto 0;
                }
                .picBlock img {
                    height: 100%;
                    width: 100%;
                }
                .desc {
                    font-size: 16px;
                    font-weight: bold;
                    letter-spacing: 0.4px;
                    text-align: center;
                    color: #6c7b94;
                    margin-top: 16px;
                }
                .clearCAIframe {
                    display: none;
                }
            `}</style>
        </>
    );
};

Navigation.getLayout = Page => Page;

export default Navigation;
