import { objectToQueryHandler } from './objectToQueryHandler';

export const openGoOrder = (queryStringObj = {}, isMobile = false, nextRouter = {}) => {
    let queryStr = objectToQueryHandler(queryStringObj);
    if (!isMobile) {
        if (!queryStr) {
            queryStr = '?nav=0';
        } else {
            queryStr += '&nav=0';
        }
    }

    if (!isMobile) {
        const name = 'goOrderWindow'; //網頁名稱;
        const iWidth = 450; //視窗的寬度;
        const iHeight = 670; //視窗的高度;
        const iTop = (window.screen.availHeight - 30 - iHeight) / 2; //視窗的垂直位置;
        const iLeft = (window.screen.availWidth - 10 - iWidth) / 2; //視窗的水平位置;
        const url =
            location.protocol + '//' + location.host + `${process.env.NEXT_PUBLIC_SUBPATH}` + '/goOrder' + queryStr;
        window.open(
            url,
            name,
            'height=' +
                iHeight +
                ',innerHeight=' +
                iHeight +
                ',width=' +
                iWidth +
                ',innerWidth=' +
                iWidth +
                ',top=' +
                iTop +
                ',left=' +
                iLeft +
                ',status=no,location=no,status=no,menubar=no,toolbar=no,resizable=no,scrollbars=no',
        );
        return;
    }
    {
        nextRouter.push('/goOrder' + queryStr);
        return;
    }
};
