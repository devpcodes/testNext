import { getToken } from '../../../user/accessToken';
import { checkSignCA, sign } from '../../../webCa';
import { getCookie } from '../../layouts/cookieController';
import { getWebId } from '../getWebId';
import { getTT } from './dataMapping';
import { postOrder } from './postOrder';

export const submitListService = async (currentAccount, data, platform) => {
    const resList = [];
    for (let record of data) {
        const res = await submitService(
            {
                CID: getWebId(platform, 'recommisiioned'),
                StockID: record.StockID,
                Price: record.price,
                Qty: record.qty,
                BS: 'S',
                GTCDate: record.useGtc ? record.gtcDate : '',
                aon: record.aon,
                Exchid: record.exch,
                Creator: currentAccount.idno,
                token: getToken(),
                currentAccount,
            },
            true,
        );
        console.log('res', res);
        resList.push(res);
    }
    return new Promise((resolve, reject) => {
        resolve(resList);
    });
};

export const submitService = async (
    { CID, StockID, Price, Qty, BS, GTCDate, aon, TouchedPrice, Exchid, Creator, token, currentAccount },
    orderList,
) => {
    let gtcDate = '';
    if (GTCDate) {
        gtcDate = [GTCDate.slice(0, 4), GTCDate.slice(5, 7), GTCDate.slice(8)];
    }
    const ca_content = sign(
        {
            idno: currentAccount.idno,
            broker_id: currentAccount.broker_id,
            account: currentAccount.account,
        },
        true,
        token,
    );
    // const ca_content = {
    //     certSN: '6066B3BD',
    //     plainText: 'MCCAFIGAGI1625208998835',
    //     signature:
    //         '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',
    //     type: 'web',
    // };
    // console.log('ccccc', checkSignCA(ca_content));
    if (Exchid !== 'US') {
        aon = '';
    }
    if (checkSignCA(ca_content)) {
        let orderData = {
            token,
            AID: currentAccount.broker_id + currentAccount.account,
            CID,
            BS,
            StockID,
            Qty,
            PriceType: priceType(GTCDate, aon),
            Price,
            Creator,
            Exchid,
            ClientIP: getCookie('client_ip'),
            ca_content,
            TT: getTT(Exchid),
            OT: '0',
        };
        if (GTCDate) {
            orderData.GTCDate = gtcDate.join('');
        }
        if (TouchedPrice) {
            orderData.TouchedPrice = TouchedPrice;
            orderData.PriceType = priceType(GTCDate, aon, TouchedPrice);
        }
        console.log(orderData);
        return await postOrder(orderData, orderList);
    } else {
        throw '憑證驗證失敗';
    }
};

const priceType = (GTCDate, aon, TouchedPrice) => {
    if (TouchedPrice && aon === 'ANY') {
        return '60';
    }
    if (TouchedPrice && aon === 'AON') {
        return '66';
    }
    if (GTCDate && aon === 'ANY') {
        return '10';
    }
    if (GTCDate && aon === 'AON') {
        return '16';
    }
    if (aon === 'AON') {
        return '6';
    }
    if (aon === 'ANY') {
        return '0';
    }
    return '0';
};
