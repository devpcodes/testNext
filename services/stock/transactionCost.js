import { BigNumber } from 'bignumber.js';
export const getTransactionCost = function (
    offerPrice,
    offerShare,
    unit,
    dealing,
    capitalPercent,
    voucherPercent,
    paymentMethod,
) {
    var amount = BigNumber(offerPrice).times(offerShare).times(unit);

    var formula = dealing + '_' + paymentMethod;
    let total;
    switch (formula) {
        case 'BUY_BYCASH':
            total = amount.plus(BigNumber.max(amount.times(0.001425), 1)).toFixed(0);
            break;

        case 'SELL_BYCASH':
            total = amount
                .minus(BigNumber.max(amount.times(0.001425), 1))
                .minus(amount.times(0.003))
                .toFixed(0);
            break;

        case 'BUY_BYSOURCE':
            total = amount
                .times((10 - capitalPercent) / 10)
                .plus(BigNumber.max(amount.times(0.001425), 1))
                .toFixed(0);
            break;

        case 'SELL_BYSOURCE':
            total = amount
                .times((10 - capitalPercent) / 10)
                .minus(BigNumber.max(amount.times(0.001425), 1))
                .minus(amount.times(0.003))
                .toFixed(0);
            break;

        case 'BUY_BYSECURITY':
            total = amount
                .times(voucherPercent / 10)
                .plus(BigNumber.max(amount.times(0.001425), 1))
                .toFixed(0);
            break;

        case 'SELL_BYSECURITY':
            total = amount
                .times(voucherPercent / 10)
                .minus(BigNumber.max(amount.times(0.001425), 1))
                .minus(amount.times(0.003))
                .toFixed(0);
            break;

        default:
            total = null;
            break;
    }
    return total;
};
