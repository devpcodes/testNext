import jwt_decode from 'jwt-decode';
import { Modal, notification } from 'antd';
import { getToken } from './user/accessToken';
import BirthdayChecker from '../components/includes/BirthdayChecker';
import { caValidator } from '../services/caValidator';
import { logout } from '../services/user/logoutFetcher';
export const signCert = async function (userInfo, isNeedSign = true, token, isWebview = false) {
    if (isNeedSign) {
        let DM;
        let signDict = {};
        if (process.env.NEXT_PUBLIC_DM === 'false') {
            DM = false;
        } else {
            DM = true;
        }

        // 產生簽章元件
        var ca = new CA_Component({
            businessNo: 'NewWeb_web',
            apiVersion: '1.0',
            hashKeyNo: '2',
            returnParams: '',
            windowURL: process.env.NEXT_PUBLIC_WEBCAFRM,
            webcaURL: process.env.NEXT_PUBLIC_WEBCAURL,
            getIdentifyNoURL: process.env.NEXT_PUBLIC_GETIDENTIfYNOURL,
            DM: DM,
        });

        const checkCertResult = ca.checkCert(userInfo.idno);
        const suggestAction = checkCertResult.suggestAction;
        let hashKey;
        const verifyNo = +new Date();
        const getIdentifyNoInput = {
            businessNo: 'NewWeb_web',
            apiVersion: '1.0',
            hashKeyNo: '2',
            verifyNo: verifyNo,
            returnParams: '',
            memberNo: userInfo.idno,
            raFunc: suggestAction,
        };

        const res = await fetch(process.env.NEXT_PUBLIC_GETIDENTIfYNOURL, {
            body: JSON.stringify(getIdentifyNoInput),
            headers: {
                'content-type': 'application/json',
                Authorization: 'Basic bndlYjpOd2ViMTIz',
            },
            method: 'POST',
        });
        const content = await res.json();
        console.log(content.result.hashKey);
        hashKey = content.result.hashKey;

        ca.certSign({
            userID: userInfo.idno,
            signTxt: userInfo.idno + verifyNo,
            identifyNo: hashKey,
            verifyNo: verifyNo,
            isWebview: isWebview,
        });

        if (ca.getSignature()) {
            signDict.signature = ca.getSignature();
            signDict.plainText = ca.getSignCode();
            signDict.certSN = ca.getCertSN();
            signDict.type = 'web';
            signDict.success = true;
        } else {
            signDict.success = false;
        }

        ca = null;
        console.log('signDict', signDict);
        return signDict;
    }
};

export const sign = function (userInfo, isNeedSign = true, token, isWebview) {
    if (isNeedSign) {
        var signDict = {};
        let DM;
        if (process.env.NEXT_PUBLIC_DM === 'false') {
            DM = false;
        } else {
            DM = true;
        }
        // 產生簽章元件
        var ca = new CA_Component({
            windowURL: process.env.NEXT_PUBLIC_WEBCAFRM,
            webcaURL: process.env.NEXT_PUBLIC_WEBCAURL,
            getIdentifyNoURL: process.env.NEXT_PUBLIC_GETIDENTIfYNOURL,
            DM: DM,
        });
        console.log('CA_Component:', ca);
        var memberNo;
        if (typeof token !== 'undefined') memberNo = token;
        else memberNo = getToken();

        // 簽章
        var setting = {
            userID: userInfo.idno,
            memberNo: memberNo,
            signTxt: userInfo.idno + new Date().getTime().toString(),
        };

        if (isWebview) {
            setting.isWebview = true;
        }

        if (userInfo.account && userInfo.broker_id) {
            // $.extend(setting, {
            //     extendInfo : {
            //         account: userInfo.account,
            //         broker_id: userInfo.broker_id
            //     }
            // });
            Object.assign(setting, {
                extendInfo: {
                    account: userInfo.account,
                    broker_id: userInfo.broker_id,
                },
            });
        }
        console.log('setting:', setting);

        ca.certSign(setting);
        console.log('getSignature:', ca.getSignature());
        if (ca.getSignature()) {
            signDict.signature = ca.getSignature();
            signDict.plainText = ca.getSignCode();
            signDict.certSN = ca.getCertSN();
            signDict.type = 'web';
            signDict.success = true;
        } else {
            signDict.success = false;
        }

        ca = null;
        console.log('signDict', signDict);
        return signDict;
    } else {
        return {};
    }
};

export const checkSignCA = function (ca_content) {
    console.log('CA_CONTENT', ca_content);
    if (ca_content.certSN && ca_content.plainText && ca_content.signature) {
        return true;
    }
    return false;
};

// 檢查憑證
export const checkCert = function (userIdNo) {
    let DM;
    if (process.env.NEXT_PUBLIC_DM === 'false') {
        DM = false;
    } else {
        DM = true;
    }
    const ca = new CA_Component({
        windowURL: process.env.NEXT_PUBLIC_WEBCAFRM,
        webcaURL: process.env.NEXT_PUBLIC_WEBCAURL,
        getIdentifyNoURL: process.env.NEXT_PUBLIC_GETIDENTIfYNOURL,
        DM: DM,
    });
    console.log('checkCert', {
        windowURL: process.env.NEXT_PUBLIC_WEBCAFRM,
        webcaURL: process.env.NEXT_PUBLIC_WEBCAURL,
        getIdentifyNoURL: process.env.NEXT_PUBLIC_GETIDENTIfYNOURL,
        DM: DM,
    });
    const checkData = ca.checkCert(userIdNo);
    console.log('checkCert', checkData);
    return checkData;
};

export const clearCert = function () {
    let DM;
    if (process.env.NEXT_PUBLIC_DM === 'false') {
        DM = false;
    } else {
        DM = true;
    }
    const ca = new CA_Component({
        windowURL: process.env.NEXT_PUBLIC_WEBCAFRM,
        webcaURL: process.env.NEXT_PUBLIC_WEBCAURL,
        getIdentifyNoURL: process.env.NEXT_PUBLIC_GETIDENTIfYNOURL,
        DM: DM,
    });
    ca.clearLS();
};

// 安裝憑證
export const applyCert = function (user_idNo, token, isWebview, callBack) {
    let DM;
    if (process.env.NEXT_PUBLIC_DM === 'false') {
        DM = false;
    } else {
        DM = true;
    }
    const ca = new CA_Component({
        windowURL: process.env.NEXT_PUBLIC_WEBCAFRM,
        webcaURL: process.env.NEXT_PUBLIC_WEBCAURL,
        getIdentifyNoURL: process.env.NEXT_PUBLIC_GETIDENTIfYNOURL,
        DM: DM,
    });

    return new Promise((resolve, reject) => {
        // 清除母憑證
        ca.clearLS();
        // 申請新憑證
        ca.applyCert(
            {
                userID: user_idNo,
                memberNo: token,
                isWebview: isWebview,
            },
            function (applyCertCode, applyCertMsg, applyCertToken, applyCertData) {
                console.log('applyCertMsg', applyCertCode, applyCertMsg, applyCertToken, applyCertData);
                // localStorage.setItem('INCB', false);
                resolve({
                    code: applyCertCode,
                    msg: applyCertMsg,
                });
            },
        );
    });
};

// 安裝憑證
export const renewCert = function (user_idNo, token, callBack) {
    let DM;
    if (process.env.NEXT_PUBLIC_DM === 'false') {
        DM = false;
    } else {
        DM = true;
    }
    const ca = new CA_Component({
        windowURL: process.env.NEXT_PUBLIC_WEBCAFRM,
        webcaURL: process.env.NEXT_PUBLIC_WEBCAURL,
        getIdentifyNoURL: process.env.NEXT_PUBLIC_GETIDENTIfYNOURL,
        DM: DM,
    });
    return new Promise((resolve, reject) => {
        ca.renewCert(
            {
                userID: user_idNo,
                memberNo: token,
            },
            function (applyCertCode, applyCertMsg, applyCertToken, applyCertData) {
                console.log('applyCertMsg', applyCertCode, applyCertMsg, applyCertToken, applyCertData);
                // localStorage.setItem('INCB', false);
                resolve({
                    code: applyCertCode,
                    msg: applyCertMsg,
                });
            },
        );
    });
};

//憑證檢查整合安裝
export const CAHandler = async function (token, cb) {
    const tokenVal = jwt_decode(token);
    const checkData = checkCert(tokenVal.user_id);
    if (checkData.suggestAction != 'None') {
        localStorage.removeItem('INCB');
        setTimeout(() => {
            const modal = Modal.confirm();
            const content = (
                <React.Fragment>
                    <p>為保障您的電子交易安全，登入時將檢查電子憑證，是否載入憑證?</p>
                </React.Fragment>
            );
            modal.update({
                title: '憑證系統',
                content: content,
                async onOk() {
                    modal.destroy();
                    await caResultDataHandler(
                        checkData.suggestAction,
                        tokenVal.user_id,
                        token,
                        function () {
                            logout();
                            Modal.info({
                                title: '憑證部署完成，請重新登入',
                                okText: '確認',
                            });
                        },
                        function () {
                            logout();
                            Modal.error({
                                title: '憑證部署失敗。',
                                okText: '確認',
                            });
                        },
                    );
                },
                okText: '是',
                cancelText: '否',
                onCancel() {
                    modal.destroy();
                    logout();
                    Modal.error({
                        title: '需先部署憑證才可登入。',
                        okText: '確認',
                    });
                },
            });
        }, 600);
    } else {
        const cert = await signCert({ idno: tokenVal.user_id }, true, token);
        const res = await caValidator(getToken(), {
            signature: cert.signature,
            plainText: cert.plainText,
            certSN: cert.certSN,
            type: 'web',
        });
        if (res.msg !== '驗章成功') {
            console.log(res);
            if (res.msg.split('||')[0].split('=')[1] === '8020') {
                Modal.confirm({
                    title: '憑證已失效，是否重新部署憑證 ? 。',
                    content: res.msg,
                    okText: '是',
                    cancelText: '否',
                    onOk() {
                        // 重新部署憑證
                        caResultDataHandler(
                            'ApplyCert',
                            tokenVal.user_id,
                            token,
                            function () {
                                logout();
                                Modal.info({
                                    title: '憑證部署完成，請重新登入',
                                    okText: '確認',
                                });
                            },
                            function () {
                                logout();
                                Modal.error({
                                    title: '憑證部署失敗。',
                                    okText: '確認',
                                });
                            },
                        );
                    },
                    onCancel() {
                        logout();
                    },
                });
            } else {
                Modal.error({
                    title: '憑證驗章失敗',
                    content: res.msg,
                    okText: '確認',
                });
            }
        } else {
            if (cb != null) {
                // localStorage.setItem('INCB', false);
                cb();
            }
        }
    }
};

//憑證安裝
export const caResultDataHandler = async function (
    suggestAction,
    userIdNo,
    token,
    successCallback,
    failCallback,
    isWebview,
) {
    if (suggestAction === 'ApplyCert') {
        const result = await applyCert(userIdNo, token, isWebview);
        console.log('result', result);
        // console.log('ApplyCert憑證回傳訊息', msg);
        if (typeof successCallback === 'function' && (result.code == '7000' || result.code == '0000')) {
            console.log('部屬成功');
            successCallback();
        }
        if (typeof failCallback === 'function' && result.code != '7000' && result.code != '0000') {
            console.log('部屬失敗');
            failCallback();
        }
        notification.open({
            message: '系統訊息',
            description: result.msg,
            top: 70,
            style: {
                width: '200px',
            },
        });
    }
    if (suggestAction == 'RenewCert') {
        const result = await renewCert(userIdNo, token);
        console.log('result', result);
        if (typeof successCallback === 'function' && (result.code == '7000' || result.code == '0000')) {
            successCallback();
        }
        if (typeof failCallback === 'function' && (result.code != '7000' || result.code != '0000')) {
            failCallback();
        }
        // console.log('RenewCert憑證回傳訊息', msg);
        notification.open({
            message: '系統訊息',
            description: result.msg,
            top: 70,
            style: {
                width: '200px',
            },
        });
    }
};
