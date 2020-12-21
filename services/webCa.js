import jwt_decode from 'jwt-decode';
import { Modal, notification } from 'antd';

export const sign = function (userInfo, isNeedSign = true, token) {
    if (isNeedSign) {
        var signDict = {};
        console.log('CACA', CA_Component);
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
        console.log('CACA', ca);
        var memberNo;
        if (typeof token !== 'undefined') memberNo = token;
        else memberNo = sessionStorage.getItem('token');

        // 簽章
        var setting = {
            userID: userInfo.idno,
            memberNo: memberNo,
            signTxt: userInfo.idno + new Date().getTime().toString(),
        };

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
        console.log('setting', setting);

        ca.certSign(setting);
        console.log('signature', ca.getSignature());
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

const checkCA = function (ca_content) {
    console.log('CA_CONTENT', ca_content);
    if (ca_content.certSN && ca_content.plainText && ca_content.signature) {
        return true;
    }
    return false;
};

const checkCert = function (userIdNo) {
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

export const applyCert = function (user_idNo, token, callBack) {
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
    console.log({
        userID: user_idNo,
        memberNo: token,
    });
    return new Promise((resolve, reject) => {
        ca.applyCert(
            {
                userID: user_idNo,
                memberNo: token,
            },
            function (applyCertCode, applyCertMsg, applyCertToken, applyCertData) {
                console.log('applyCertMsg', applyCertCode, applyCertMsg, applyCertToken, applyCertData);
                resolve(applyCertMsg);
            },
        );
    });
};

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
                resolve(applyCertMsg);
            },
        );
    });
};

//憑證檢查
export const CAHandler = function (token) {
    const tokenVal = jwt_decode(token);
    const checkData = checkCert(tokenVal.user_id);
    if (checkData.suggestAction != 'None') {
        setTimeout(() => {
            Modal.confirm({
                title: '憑證系統',
                content: `您現在無憑證。是否要載入憑證 ?`,
                onOk() {
                    caResultDataHandler(checkData.suggestAction, tokenVal.user_id, token);
                },
                okText: '是',
                cancelText: '否',
                onCancel() {
                    sessionStorage.setItem('deployCA', false);
                },
            });
        }, 600);
    }
};

//憑證安裝
const caResultDataHandler = async function (suggestAction, userIdNo, token) {
    if (suggestAction === 'ApplyCert') {
        const msg = await applyCert(userIdNo, token);
        // console.log('ApplyCert憑證回傳訊息', msg);
        notification.open({
            message: '系統訊息',
            description: msg,
            top: 70,
        });
    }
    if (suggestAction == 'RenewCert') {
        const msg = await renewCert(userIdNo, token);
        // console.log('RenewCert憑證回傳訊息', msg);
        notification.open({
            message: '系統訊息',
            description: msg,
            top: 70,
        });
    }
};
