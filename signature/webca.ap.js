/*
	AP Callback
	function callback(code, msg, token, data)
	
	2000	憑證為一ID一憑證
	5001	簽章元件不存在
	5010	無憑證
	
	7000	至少一個網址佈署失敗
	
*/

// 檢查 local 端是否有憑證
// data: 憑證資訊

var twcaH5Params = {};
var twcaRenewAlertDays = 0; //暫不處理憑證自動展期
var isApple = navigator.platform && /iPad|iPhone|iPod|MacIntel/.test(navigator.platform);
var isSafari = 'safari' === getBrowserType();
var isSafariOnApple = isApple && isSafari;
var currentName;
var inAppDetector = new InAppDetector(navigator.userAgent || navigator.vendor || window.opera);

// Publid Functions=====================================================================================================
function setWebCAinWebview(isInWebview) {
    if (isInWebview) {
        twcaH5Params['isInWebview'] = true;
    } else {
        twcaH5Params['isInWebview'] = false;
    }
}

function WebCAQueryCertState(id, filter, callback) {
    if (!id || !filter) {
        callback(5005, '參數錯誤', '', '');
        return;
    }

    try {
        if (!twcaLib) {
            callback(5001, '簽章元件不存在', '', '');
            return;
        }
    } catch (e) {
        callback(5001, '簽章元件不存在', '', '');
        return;
    }

    twcaLib.SelectSignerEx(filter, '', '', '', '', 0x04 | 0x08 | 0x1000, 0, '', function (
        resultCode,
        resultMsg,
        token,
        data,
    ) {
        var isCertExist = false;
        var isCertMultiType = false;
        var isReadyWebCA = false;
        var suggestAction = '';

        do {
            // Check isCertExist
            if (resultCode !== 0) {
                isCertMultiType = undefined;
                isReadyWebCA = true;
                break;
            }
            isCertExist = true;

            var certInfo = JSON.parse(data);

            // Check isCertMyltiType:   "::" exist in CN
            if (certInfo.cn.indexOf('::') >= 0) {
                isCertMultiType = true;
            }

            // Check isReadyWebCA: expired Date is less than 20 days
            var nta = parseDate(certInfo.nta);
            var current = new Date();
            var diffDays = Math.ceil(Math.abs(nta.getTime() - current.getTime()) / (1000 * 3600 * 24));
            if (diffDays <= twcaRenewAlertDays) {
                isReadyWebCA = true;
            }
        } while (false);

        // suggestAction
        if (!isCertExist) {
            suggestAction = 'ApplyCert';
        } else if (isReadyWebCA) {
            if (isCertMultiType) {
                suggestAction = 'None'; //憑證展期預設不動作
                // suggestAction = "RenewCert";
            } else {
                suggestAction = 'ApplyCert';
            }
        } else {
            suggestAction = 'None';
        }

        cbf(id, isCertExist, isCertMultiType, isReadyWebCA, suggestAction, callback);
    });

    function cbf(id, isCertExist, isCertMultiType, isReadyWebCA, suggestAction, callback) {
        var ret = {};
        ret.userID = id;
        ret.isCertExist = isCertExist;
        ret.isCertMultiType = isCertMultiType;
        ret.isReadyWebCA = isReadyWebCA;
        ret.suggestAction = suggestAction;
        callback(0, '憑證申請完成', '', JSON.stringify(ret));
    }

    function parseDate(str) {
        var year = str.substring(0, 4);
        var month = str.substring(4, 6);
        var day = str.substring(6, 8);
        var hour = str.substring(8, 10);
        var minute = str.substring(10, 12);
        var second = str.substring(12, 14);
        return new Date(year, month - 1, day, hour, minute, second);
    }
}

/*
function selectSignerEx() {
	
}
*/

function WebCAInvoke(
    businessNo,
    apiVersion,
    hashKeyNo,
    verifyNo,
    returnParams,
    memberNo,
    raFunc,
    identifyNo,
    windowURL,
    webcaURL,
    isWebview,
    callback,
) {
    twcaH5Params['businessNo'] = businessNo;
    twcaH5Params['verifyNo'] = verifyNo;
    twcaH5Params['apiVersion'] = apiVersion;
    twcaH5Params['hashKeyNo'] = hashKeyNo;
    twcaH5Params['returnParams'] = returnParams;
    twcaH5Params['memberNo'] = memberNo;
    twcaH5Params['raFunc'] = raFunc;
    twcaH5Params['identifyNo'] = identifyNo;
    twcaH5Params['webcaURL'] = webcaURL;
    twcaH5Params['callback'] = callback;

    // 自動偵測是否在 line or messenger 裡
    if (inAppDetector.isInSpecificApp()) {
        twcaH5Params['isInWebview'] = true;
    }

    if (isTWID()) {
        invokeWebview(
            businessNo,
            apiVersion,
            hashKeyNo,
            verifyNo,
            returnParams,
            memberNo,
            raFunc,
            identifyNo,
            webcaURL,
            '_self',
        );
    } else if (isWebview === true) {
        twcaH5Params['isInWebview'] = true;
        invokeWebview(
            businessNo,
            apiVersion,
            hashKeyNo,
            verifyNo,
            returnParams,
            memberNo,
            raFunc,
            identifyNo,
            webcaURL,
            'WebCAFrm',
        );
    } else {
        var w = 360;
        var h = 600;
        var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
        var dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;
        var width = window.innerWidth
            ? window.innerWidth
            : document.documentElement.clientWidth
            ? document.documentElement.clientWidth
            : screen.width;
        var height = window.innerHeight
            ? window.innerHeight
            : document.documentElement.clientHeight
            ? document.documentElement.clientHeight
            : screen.height;
        var left = width / 2 - w / 2 + dualScreenLeft;
        var top = height / 2 - h / 2 + dualScreenTop;

        twcaH5Params['newWindowObj'] = window.open(
            windowURL,
            'twcaNewWin',
            'scrollbars=yes,width=' + w + ',height=' + h + ',left=' + left + ',top=' + top,
        );
    }
}

function invokeWebview(
    businessNo,
    apiVersion,
    hashKeyNo,
    verifyNo,
    returnParams,
    memberNo,
    raFunc,
    identifyNo,
    webcaURL,
    target,
) {
    if (target === 'WebCAFrm') {
        var div = document.createElement('div');
        var iframe = document.createElement('iframe');
        div.setAttribute('id', 'WebCAFrmDiv');
        div.setAttribute(
            'style',
            'position:fixed; left:0px; bottom:0px; right:0px; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999; -webkit-overflow-scrolling:touch; overflow-y:scroll;',
        );
        iframe.setAttribute('id', 'WebCAFrm');
        iframe.setAttribute('name', 'WebCAFrm');
        iframe.setAttribute('style', 'width:1px; min-width:100%; height:100%;');
        div.appendChild(iframe);
        document.body.appendChild(div);
    }

    var form = document.createElement('form');
    form.setAttribute('id', 'webcaform');
    form.setAttribute('method', 'POST');
    form.setAttribute('target', target);
    form.setAttribute('action', webcaURL);
    form.appendChild(getHiddenField('BusinessNo', businessNo));
    form.appendChild(getHiddenField('ApiVersion', apiVersion));
    form.appendChild(getHiddenField('HashKeyNo', hashKeyNo));
    form.appendChild(getHiddenField('VerifyNo', verifyNo));
    form.appendChild(getHiddenField('ReturnParams', returnParams));
    form.appendChild(getHiddenField('MemberNo', memberNo));
    form.appendChild(getHiddenField('RAFunc', raFunc));
    form.appendChild(getHiddenField('IdentifyNo', identifyNo));
    document.body.appendChild(form);
    form.submit();

    function getHiddenField(name, value) {
        var hiddenField;
        hiddenField = document.createElement('input');
        hiddenField.setAttribute('type', 'hidden');
        hiddenField.setAttribute('name', name);
        hiddenField.setAttribute('value', value);
        return hiddenField;
    }
}

// Private Functions=====================================================================================================
// Private Functions=====================================================================================================
// Private Functions=====================================================================================================
// Private Functions=====================================================================================================
// Private Functions=====================================================================================================
// Private Functions=====================================================================================================

if (window.addEventListener) {
    window.addEventListener('message', twcaH5ReceiveMessage, false);
} else {
    window.attachEvent('onmessage', twcaH5ReceiveMessage);
}

function doDeploy(raFunc) {
    var deployLocatios = twcaH5Params['deployLocatios'];
    var deployIndex = twcaH5Params['deployIndex'];
    if (deployLocatios.length > 0 && deployIndex < deployLocatios.length) {
        if (isApple) {
            twcaH5Params['newWindowObj'] = window.open(deployLocatios[deployIndex], 'twcaNewWin');
            return;
        }
        var twcaH5Flow = {
            twcaH5Flow: {
                raFunc: raFunc,
                action: 'Redirect',
                location: deployLocatios[deployIndex],
            },
        };
        twcaH5Params['newWindowObj'].postMessage(twcaH5Flow, '*');
    } else {
        var twcaH5Flow = {
            twcaH5Flow: {
                raFunc: raFunc,
                action: 'FinishRAFunction',
            },
        };
        twcaH5Params['newWindowObj'].postMessage(twcaH5Flow, '*');

        if (isTWID()) {
            var webcaFrame = document.getElementById('webCAFrame');
            webcaFrame.parentNode.removeChild(webcaFrame);
        }

        doneDeploy();
    }
}

function doneDeploy() {
    var code;
    var msg;
    var data;

    do {
        if (!twcaH5Params['selectedCertInfo']) {
            code = 6001;
            msg = '憑證作業失敗';
            break;
        }

        data = twcaH5Params['selectedCertInfo'];
        var undeployableList = twcaH5Params['undeployableList'];
        if (undeployableList.length > 0) {
            code = 7000;
            msg = '至少一個網址佈署失敗';
            data = JSON.parse(data);
            data['undeployableList'] = twcaH5Params['undeployableList'];
            data = JSON.stringify(data);
            break;
        }

        code = 0;
        msg = '憑證申請完成';
    } while (false);

    webcaDoneProcess(code, msg, '', data);
}

function webcaDoneProcess(errCode, errMsg, token, data) {
    if (twcaH5Params['isInWebview']) {
        document.body.removeChild(document.getElementById('webcaform'));
        document.body.removeChild(document.getElementById('WebCAFrmDiv'));
    }

    twcaH5Params['callback'](errCode, errMsg, token, data);
    window.name = currentName;
}

function doAckRaFunc(errCode, errMsg, BusinessNo, VerifyNo, RAFunc) {
    var url = getContextRoot() + '/AckRaFunc';
    var method = 'POST';
    var postData = {
        BusinessNo: BusinessNo,
        VerifyNo: VerifyNo,
        RAFunc: RAFunc,
        ErrCode: errCode,
        ErrMsg: errMsg,
    };
    var shouldBeAsync = true;

    var request = new XMLHttpRequest();
    request.open(method, url, shouldBeAsync);
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.send(postData);
}

function twcaH5ReceiveMessage(event) {
    var twcaH5Flow = event.data.twcaH5Flow;
    if (!twcaH5Flow || !twcaH5Flow.action) {
        return;
    }

    var action = twcaH5Flow.action;
    var raFunc = twcaH5Flow.raFunc;

    if (action === 'IsWebview') {
        var twcaH5Flow = {
            twcaH5Flow: {
                raFunc: '',
                action: 'ReplyIsWebview',
                IsWebview: twcaH5Params['isInWebview'],
            },
        };
        event.source.postMessage(twcaH5Flow, '*');
        return;
    }

    if (action === 'SaveUrlsAndCertInfo') {
        currentName = window.name;
        window.name = 'twcaSrcWindow';

        twcaH5Params['deployLocatios'] = twcaH5Flow.deployLocations;
        twcaH5Params['selectedCertInfo'] = twcaH5Flow.selectedCertInfo;
        twcaH5Params['undeployableList'] = twcaH5Flow.undeployableList;
        twcaH5Params['deploySuccessCount'] = 0;
        twcaH5Params['deployIndex'] = 0;

        if (raFunc === 'DeleteCert') {
            deleteCert(twcaH5Params['memberNo']);
            sessionStorage.removeItem('selectedCertInfo');
            sessionStorage.removeItem('twcaSelectedKey');
        } else {
            sessionStorage.setItem('selectedCertInfo', twcaH5Flow.selectedCertInfo);
            sessionStorage.setItem('twcaSelectedKey', twcaH5Flow.twcaSelectedKey);
        }

        if (twcaH5Params['isInWebview']) {
            if (raFunc !== 'DeleteCert') {
                saveCert(twcaH5Flow.selectedCertInfo);
            }
            doneDeploy();
        } else {
            doDeploy(raFunc);
        }

        return;
    }

    if (action === 'PageLoaded') {
        if (!raFunc) {
            raFunc = twcaH5Params['raFunc'];
        }
        var twcaH5Flow = {
            action: 'DeployCertInfo',
            raFunc: raFunc,
            certInfo: twcaH5Params['selectedCertInfo'],
        };

        event.source.postMessage({ twcaH5Flow: twcaH5Flow }, '*');
        return;
    }

    if (action === 'DeployComplete') {
        if (twcaH5Flow.errCode == 0 || twcaH5Flow.errCode == '0') {
            twcaH5Params['deploySuccessCount']++;
        } else {
            twcaH5Params['undeployableList'].push({
                location: twcaH5Params['deployLocatios'][twcaH5Params['deployIndex']],
                errMsg: twcaH5Flow.errMsg,
            });
        }
        twcaH5Params['deployIndex']++;
        doDeploy(raFunc);
        return;
    }

    if (action === 'Exception') {
        webcaDoneProcess(twcaH5Flow.errCode, twcaH5Flow.errMsg, '', '');
    }
}

function saveCert(certInfo) {
    if (typeof localStorage === 'undefined') {
        return 7002;
    }

    certInfo = JSON.parse(certInfo);
    var TWCACertIdxRefId = 'TWCACertIdxRef';
    var certRefId = 'TWCA' + new Date().getTime().toString();
    var certIdxRefObj = null;

    do {
        if (localStorage.getItem(TWCACertIdxRefId) === null) {
            certIdxRefObj = {};
            break;
        }

        if (localStorage.getItem(TWCACertIdxRefId) === '') {
            certIdxRefObj = {};
            break;
        }

        try {
            certIdxRefObj = JSON.parse(localStorage.getItem(TWCACertIdxRefId));
        } catch (err) {
            certIdxRefObj = {};
        }
    } while (false);

    for (var key in certIdxRefObj) {
        if (certIdxRefObj[key]['issuer'] === certInfo.issuer) {
            var certInfoCn = certInfo.cn
                .replace(/^\s+|\s+$/, '')
                .replace(/^0*/, '')
                .toUpperCase()
                .split('-')[0];
            var certIdxRefObjCn = certIdxRefObj[key]['cn']
                .replace(/^\s+|\s+$/, '')
                .replace(/^0*/, '')
                .toUpperCase()
                .split('-')[0];

            if (certInfoCn === certIdxRefObjCn) {
                certIdxRefObj[key] = null;
                delete certIdxRefObj[key];
                localStorage.removeItem(key);
                break;
            }
        }
    }

    certIdxRefObj[certRefId] = {
        cn: certInfo.cn,
        issuer: certInfo.issuer,
        subject: certInfo.subject,
        serial: certInfo.serial,
        notBefore: certInfo.notBefore,
        notAfter: certInfo.notAfter,
    };

    try {
        localStorage.setItem(TWCACertIdxRefId, JSON.stringify(certIdxRefObj));
        localStorage.setItem(certRefId, JSON.stringify(certInfo));
    } catch (ex) {
        return 7001;
    }

    return 0;
}

function deleteCert(userID) {
    if (typeof localStorage === 'undefined') {
        return 7002;
    }

    var TWCACertIdxRefId = 'TWCACertIdxRef';
    var certIdxRefObj = null;

    do {
        if (localStorage.getItem(TWCACertIdxRefId) === null) {
            certIdxRefObj = {};
            break;
        }

        if (localStorage.getItem(TWCACertIdxRefId) === '') {
            certIdxRefObj = {};
            break;
        }

        try {
            certIdxRefObj = JSON.parse(localStorage.getItem(TWCACertIdxRefId));
        } catch (err) {
            certIdxRefObj = {};
        }
    } while (false);

    for (var key in certIdxRefObj) {
        if (certIdxRefObj[key]['cn'].indexOf(userID) >= 0) {
            certIdxRefObj[key] = null;
            delete certIdxRefObj[key];
            localStorage.removeItem(key);
        }
    }

    try {
        localStorage.setItem(TWCACertIdxRefId, JSON.stringify(certIdxRefObj));
    } catch (ex) {
        return 7001;
    }

    return 0;
}

function isTWID() {
    if (navigator.userAgent.indexOf('TWID') >= 0) {
        return true;
    }
    return false;
}

function getBrowserType() {
    var ua = navigator.userAgent.toLowerCase();
    var sBrowser = '';

    if (ua.indexOf('edge') > -1) {
        sBrowser = 'edge';
    } else if (ua.indexOf('firefox') > -1) {
        sBrowser = 'firefox';
    } else if (ua.indexOf('msie') > -1) {
        sBrowser = 'ie';
    } else if (ua.indexOf('rv:11.0') > -1 && ua.indexOf('like gecko') > -1) {
        if (ua.indexOf('windows nt 6.3;') > -1) {
            sBrowser = 'ie';
        } else {
            if (ua.indexOf('windows nt ') > -1) {
                sBrowser = 'ie';
            } else {
                sBrowser = 'other';
            }
        }
    } else if (ua.indexOf('iemobile') > -1) {
        sBrowser = 'ie';
    } else if (ua.indexOf('chrome') > -1) {
        sBrowser = 'chrome';
    } else if (ua.indexOf('safari') > -1) {
        if (ua.indexOf('gsa') > -1 || ua.indexOf('crios') > -1) {
            sBrowser = 'chrome';
        } else {
            sBrowser = 'safari';
        }
    } else if (ua.indexOf('dophin') > -1) {
        sBrowser = 'dophin';
    } else if (ua.indexOf('opera') > -1) {
        sBrowser = 'opera';
    } else {
        sBrowser = 'other';
    }
    return sBrowser;
}

function InAppDetector(userAgent) {
    this.ua = userAgent;
}

InAppDetector.prototype.InAppBrowser = {
    messenger: /\bFB[\w_]+\/(Messenger|MESSENGER)/,
    facebook: /\bFB[\w_]+\//,
    line: /\bLine\//i,
};

InAppDetector.prototype.findKey = function (object, predicate) {
    var result;

    if (object == null) {
        return result;
    }

    Object.keys(object).some(function (key) {
        var value = object[key];
        //console.log(key);
        if (predicate(value, key, object)) {
            result = key;
            return true;
        }
    });

    return result;
};

InAppDetector.prototype.getAppName = function () {
    return (
        this.findKey(this.InAppBrowser, function (regex) {
            //alert(inAppDetector.ua);
            return regex.test(inAppDetector.ua);
        }) || 'none'
    );

    //return this.findKey(this.InAppBrowser, regex => regex.test(this.ua)) || 'other';
};

InAppDetector.prototype.isInApp = function () {
    var rules = ['WebView', '(iPhone|iPod|iPad)(?!.*Safari/)', 'Android.*(wv|.0.0.0)'];
    var regex = new RegExp('('.concat(rules.join('|'), ')'), 'ig');
    return Boolean(this.ua.match(regex));
};

InAppDetector.prototype.isInSpecificApp = function () {
    var appName = this.getAppName();
    return this.isInApp() && (appName === 'messenger' || appName === 'facebook' || appName === 'line');
};
