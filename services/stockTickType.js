export const getStockType = function (stockCode) {
    var stockInfo = {};
    stockInfo.type = '';
    stockCode = stockCode.replace(/ /g, '');

    var regExpWarrant = /^[0]{1}[3-8]{1}[0-9]{3}[0-9A-Z]{1}$/;
    var regExpStock = /^[1-9]{1}[0-9]{3}$/;
    var regExpETF = /^[0]{1}[0-1]{1}[0-9]{3}[A-Z]{0,1}$/;
    var regExpETF4Code = /^[0]{2}[5-6]{1}[0-1]{1}$/; // 0050 - 0061 第一批ETF

    if (stockCode.search(regExpWarrant) === 0) {
        stockInfo.type = 'warrant';
    } else if (stockCode.search(regExpETF) === 0 || stockCode.search(regExpETF4Code) === 0) {
        stockInfo.type = 'ETF';
    } else {
        stockInfo.type = 'stock';
    }
    return stockInfo;
};

export const getStockPriceRange = function (type, priceStr, up) {
    var unit = 0;
    var price = parseFloat(priceStr);
    switch (type) {
        case 'warrant':
            if (up) {
                if (price < 5) {
                    unit = 0.01;
                } else if (5 <= price && price < 10) {
                    unit = 0.05;
                } else if (10 <= price && price < 50) {
                    unit = 0.1;
                } else if (50 <= price && price < 100) {
                    unit = 0.5;
                } else if (100 <= price && price < 500) {
                    unit = 1;
                } else if (500 <= price) {
                    unit = 5;
                }
                break;
            } else {
                if (price <= 5) {
                    unit = 0.01;
                } else if (5 < price && price <= 10) {
                    unit = 0.05;
                } else if (10 < price && price <= 50) {
                    unit = 0.1;
                } else if (50 < price && price <= 100) {
                    unit = 0.5;
                } else if (100 < price && price <= 500) {
                    unit = 1;
                } else if (500 < price) {
                    unit = 5;
                }
                break;
            }
        case 'stock':
            if (up) {
                if (price < 10) {
                    unit = 0.01;
                } else if (10 <= price && price < 50) {
                    unit = 0.05;
                } else if (50 <= price && price < 100) {
                    unit = 0.1;
                } else if (100 <= price && price < 500) {
                    unit = 0.5;
                } else if (500 <= price && price < 1000) {
                    unit = 1;
                } else if (1000 <= price) {
                    unit = 5;
                }
                break;
            } else {
                if (price <= 10) {
                    unit = 0.01;
                } else if (10 < price && price <= 50) {
                    unit = 0.05;
                } else if (50 < price && price <= 100) {
                    unit = 0.1;
                } else if (100 < price && price <= 500) {
                    unit = 0.5;
                } else if (500 < price && price <= 1000) {
                    unit = 1;
                } else if (1000 < price) {
                    unit = 5;
                }
                break;
            }
        case 'ETF':
            if (up) {
                if (price < 50) {
                    unit = 0.01;
                } else if (50 <= price) {
                    unit = 0.05;
                }
                break;
            } else {
                if (price <= 50) {
                    unit = 0.01;
                } else if (50 < price) {
                    unit = 0.05;
                }
                break;
            }
    }
    return unit;
};
