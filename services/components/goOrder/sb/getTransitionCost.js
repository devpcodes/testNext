export const getTransactionCost = (qty, price, bs, market) => {
    //     原幣:委託價*股數+Max(委託價*股數*1%,100)+委託價*股數*0.0077%+Max(委託價*股數*0.1%,1)+ Max(委託價*股數*0.002%,2)

    // (最高100 HKD 最低2 HKD).

    // 原幣:委託價*股數-Max(委託價*股數*1%,100)-委託價*股數*0.0077%-Max(委託價*股數*0.1%,1)-Max(委託價*股數*0.002%,2)
    let cost = '';
    switch (market) {
        case 'SEHK':
            if (bs === 'B') {
                cost =
                    qty * price +
                    Math.max(qty * price * 0.01, 100) +
                    qty * price * 0.000077 +
                    Math.max(price * qty * 0.01, 1) +
                    Math.max(price * qty * 0.00002, 2);
            } else {
                cost =
                    price * qty -
                    Math.max(price * qty * 0.01, 100) -
                    price * qty * 0.000077 -
                    Math.max(price * qty * 0.01, 1) -
                    Math.max(price * qty * 0.00002, 2);
            }
            console.log(
                qty * price +
                    Math.max(qty * price * 0.01, 100) +
                    qty * price * 0.000077 +
                    Math.max(price * qty * 0.01, 1) +
                    Math.max(price * qty * 0.00002, 2),
            );
            if (cost >= 100) {
                cost = 100;
            }
            if (cost <= 2) {
                cost = 2;
            }
            break;

        default:
            break;
    }
    return cost;
};
