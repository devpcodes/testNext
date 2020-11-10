export const sign = function (userInfo, isNeedSign = true, token) {
    if (isNeedSign) {
        var signDict = {};
        console.log('CACA', CA_Component);
        // 產生簽章元件
        var ca = new CA_Component({
            windowURL: process.env.NEXT_PUBLIC_WEBCAFRM,
            webcaURL: process.env.NEXT_PUBLIC_WEBCAURL,
            getIdentifyNoURL: process.env.NEXT_PUBLIC_GETIDENTIfYNOURL,
            DM: process.env.NEXT_PUBLIC_DM,
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

export const checkCA = function (ca_content) {
    console.log('CA_CONTENT', ca_content);
    if (ca_content.certSN && ca_content.plainText && ca_content.signature) {
        return true;
    }
    return false;
};

export const checkCert = function (userIdNo) {
    const ca = new CA_Component({
        windowURL: process.env.NEXT_PUBLIC_WEBCAFRM,
        webcaURL: process.env.NEXT_PUBLIC_WEBCAURL,
        getIdentifyNoURL: process.env.NEXT_PUBLIC_GETIDENTIfYNOURL,
        DM: process.env.NEXT_PUBLIC_DM,
    });
    console.log('checkCert', {
        windowURL: process.env.NEXT_PUBLIC_WEBCAFRM,
        webcaURL: process.env.NEXT_PUBLIC_WEBCAURL,
        getIdentifyNoURL: process.env.NEXT_PUBLIC_GETIDENTIfYNOURL,
        DM: process.env.NEXT_PUBLIC_DM,
    });
    const checkData = ca.checkCert(userIdNo);
    console.log('checkCert', checkData);
    return checkData.suggestAction;
};
