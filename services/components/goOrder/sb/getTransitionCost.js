import { BigNumber } from 'bignumber.js';
export const getTransactionCost = (qty, price, bs, currency) => {
    //     原幣:委託價*股數+Max(委託價*股數*1%,100)+委託價*股數*0.0077%+Max(委託價*股數*0.1%,1)+ Max(委託價*股數*0.002%,2)

    // (最高100 HKD 最低2 HKD).

    // 原幣:委託價*股數-Max(委託價*股數*1%,100)-委託價*股數*0.0077%-Max(委託價*股數*0.1%,1)-Max(委託價*股數*0.002%,2)
    let estimated = '';
    var currencyaction = currency + bs;
    var price = BigNumber(price);
    var price_qty = price.times(qty);
    switch (currencyaction) {
        case 'HKDB':
            estimated = price_qty
                .plus(BigNumber.max(price_qty.times(0.01), 100))
                .plus(price_qty.times(0.000077))
                .plus(BigNumber.max(price_qty.times(0.001), 1))
                .plus(BigNumber.max(price_qty.times(0.00002), 2))
                .toFixed(2);

            // if(estimated >= 100){
            //     estimated = 100;
            // }
            // if(estimated <= 2){
            //     estimated = 2;
            // }
            break;

        case 'HKDS':
            estimated = price_qty
                .minus(BigNumber.max(price_qty.times(0.01), 100))
                .minus(price_qty.times(0.000077))
                .minus(BigNumber.max(price_qty.times(0.001), 1))
                .minus(BigNumber.max(price_qty.times(0.00002), 2))
                .toFixed(2);
            // if(estimated >= 100){
            //     estimated = 100;
            // }
            // if(estimated <= 2){
            //     estimated = 2;
            // }
            break;

        case 'USDB':
            estimated = price_qty.plus(BigNumber.max(price_qty.times(0.01), 100)).toFixed(2);
            break;

        case 'USDS':
            var taf = BigNumber(qty).times(0.000119);
            if (taf.gte(5.95)) taf = BigNumber(5.95);
            else if (taf.lte(0.01)) taf = BigNumber(0.01);

            estimated = price_qty
                .minus(BigNumber.max(price_qty.times(0.01), 100))
                .minus(price_qty.times(0.000051))
                .minus(taf)
                .toFixed(2);
            break;

        case 'JPYB':
            estimated = price_qty.plus(BigNumber.max(price_qty.times(0.01), 5000)).toFixed(2);
            break;

        case 'JPYS':
            estimated = price_qty.minus(BigNumber.max(price_qty.times(0.01), 5000)).toFixed(2);
            break;

        case 'CNYB':
            estimated = price_qty
                .plus(BigNumber.max(price_qty.times(0.01), 100))
                .plus(price_qty.times(0.0000487))
                .plus(price_qty.times(0.00002))
                .plus(price_qty.times(0.00004))
                .toFixed(2);
            break;

        case 'CNYS':
            estimated = price_qty
                .minus(BigNumber.max(price_qty.times(0.01), 100))
                .minus(price_qty.times(0.0000487))
                .minus(price_qty.times(0.00002))
                .minus(price_qty.times(0.00004))
                .minus(price_qty.times(0.001))
                .toFixed(2);
            break;

        default:
            break;
    }
    return estimated;
};
