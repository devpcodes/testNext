function webCAtest() {
    const ca = new CA_Component({
        businessNo: 'mbook',
        apiVersion: '1.0',
        hashKeyNo: '2',
        returnParams: '',
        windowURL: process.env.NEXT_PUBLIC_WEBCAFRM,
        webcaURL: process.env.NEXT_PUBLIC_WEBCAURL,
        DM: true,
    });
    const checkCertResult = ca.checkCert('MCCAFIGAGI');
    const suggestAction = checkCertResult.suggestAction;
    let hashKey;
    const verifyNo = +new Date();
    const getIdentifyNoInput = {
        businessNo: 'mbook',
        apiVersion: '1.0',
        hashKeyNo: '2',
        verifyNo: verifyNo,
        returnParams: '',
        memberNo: 'MCCAFIGAGI',
        raFunc: suggestAction,
    };
    (async () => {
        const res = await fetch(`https://servicerd.sinotrade.com.tw/api/v1/WebCAIdentification`, {
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
            userID: 'MCCAFIGAGI',
            signTxt: 'MCCAFIGAGI' + verifyNo,
            identifyNo: hashKey,
            verifyNo: verifyNo,
        });
    })();

    return '';
}

export default webCAtest;
