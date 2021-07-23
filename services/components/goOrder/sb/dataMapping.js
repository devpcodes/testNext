export const marketName = market => {
    const market_options = [
        { name: '美國', value: 'US', category: true, label: '美股', area: '美東' },
        { name: '香港', value: 'HKR', category: true, label: '港股人民幣', area: '香港' },
        { name: '香港', value: 'SEHK', category: true, label: '港股', area: '香港' },
        { name: '滬股通', value: 'SHSE', category: true, label: '滬股通', area: '深滬' },
        { name: '深股通', value: 'SZSE', category: true, label: '深股通', area: '深滬' },
        { name: '日本', value: 'JP', category: true, label: '日股', area: '日本' },
    ];
    const found = market_options.find(item => {
        if (item.value === market) {
            return item.name;
        }
    });
    return found;
};

export const currencyChName = currency => {
    const obj = { NTD: '台幣', USD: '美金', CNY: '人民幣', JPY: '日圓', HKD: '港幣' };
    return obj[currency] || currency;
};

export const getCodeType = market => {
    switch (market) {
        case 'US':
            return 'NB';
        case 'SEHK':
            return 'HK';
        default:
            return '';
    }
};

export const getCurrency = currency => {
    switch (currency) {
        case 'USD':
            return '美元';
        case 'CNY':
            return '人民幣';
        case 'HKD':
            return '港幣';
        case 'JPY':
            return '日元';
        default:
            return '--';
    }
};

export const getPriceType = code => {
    switch (code) {
        case '0':
            return '限&ANY';
        case '5':
            return 'GTC';
        case '6':
            return '限&AON';
        case '10':
            return '限&GTC&ANY';
        case '16':
            return '限&GTC&AON';
        case '60':
            return '觸價單&ANY';
        case '66':
            return '觸價單&AON';
        default:
            break;
    }
};

//整合getPriceType(源自舊的)
export const goOrderMapping = (str, gtcDate) => {
    let arr = str.split('&');
    let narr = [];
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if (element === 'GTC') {
            element = '長';
        }
        if (element === '觸價單') {
            element = '觸';
        }
        narr.push(element);
    }

    if (gtcDate != null && gtcDate) {
        let filterArr = narr.filter(item => {
            if (item === '長') {
                return item;
            }
        });
        const found = narr.find(element => element === '觸');
        if (filterArr.length == 0) {
            if (found) {
                narr.splice(1, 0, '長');
            } else {
                narr.unshift('長');
            }
        }
    }
    return narr;
};

export const getTT = MarketID => {
    let tt = '';
    if (MarketID == 'SEHK' || MarketID == 'HKR') tt = '0';
    else if (MarketID == 'JP') tt = '1';
    else if (MarketID == 'US') tt = '2';
    else if (MarketID == 'SHSE') tt = '8';
    else if (MarketID == 'SZSE') tt = '9';
    return tt;
};
