export const getPriceJumpPoint = (marketID, price, isMinus) => {
    var priceJumpPoint = 1;
    if (marketID == 'US') {
        if (price >= 1) {
            priceJumpPoint = 0.01;
        }
        if (price < 1) {
            priceJumpPoint = 0.0001;
        }
        if (price == 1) {
            if (isMinus) {
                priceJumpPoint = 0.0001;
            } else {
                priceJumpPoint = 0.01;
            }
        }
    } else if (marketID == 'HKR' || marketID == 'SEHK') {
        var cutPoints = [0.25, 0.5, 10, 20, 100, 200, 500, 1000, 2000, 5000, 9995];
        var jumpPoints = [0.001, 0.005, 0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 0];
        if (!price || isNaN(price)) {
            price = 0.01;
        }
        price = parseFloat(price);
        if (!isMinus && price >= 9995) {
            return 0;
        }

        for (let i = 0; i < cutPoints.length; i++) {
            const cutPoint = cutPoints[i];
            if (parseFloat(price) == parseFloat(cutPoint)) {
                //落在邊界點上
                priceJumpPoint = isMinus ? jumpPoints[i] : jumpPoints[i + 1];
                break;
            } else if (parseFloat(price) < parseFloat(cutPoint)) {
                priceJumpPoint = jumpPoints[i];
                break;
            }
        }
        // $(cutPoints).each(function (i, cutPoint) {
        //     if (parseFloat(price) == parseFloat(cutPoint)) {
        //         //落在邊界點上
        //         priceJumpPoint = (isMinus) ? jumpPoints[i] : jumpPoints[i + 1];
        //         return false;
        //     }
        //     else if (parseFloat(price) < parseFloat(cutPoint)) {
        //         priceJumpPoint = jumpPoints[i];
        //         return false;
        //     }
        // });
    } else if (marketID == 'SHSE' || marketID == 'SZSE') {
        priceJumpPoint = 0.01;
    } else if (marketID == 'JP') {
        priceJumpPoint = 0.1;
    }

    return priceJumpPoint;
};
