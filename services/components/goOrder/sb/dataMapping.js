export const marketName = market => {
    const market_options = [
        { name: '美國', value: 'US', category: true, label: '美股' },
        { name: '香港', value: 'HKR', category: true, label: '港股人民幣' },
        { name: '香港', value: 'SEHK', category: true, label: '港股' },
        { name: '滬股通', value: 'SHSE', category: true, label: '滬股' },
        { name: '深股通', value: 'SZSE', category: true, label: '深股' },
        { name: '日本', value: 'JP', category: true, label: '日股' },
    ];
    const found = market_options.find(item => {
        if (item.value === market) {
            return item.name;
        }
    });
    return found;
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
