export const marketName = market => {
    const market_options = [
        { name: '美國', value: 'US', category: true },
        { name: '香港', value: 'HKR', category: true },
        { name: '香港', value: 'SEHK', category: true },
        { name: '滬股通', value: 'SHSE', category: true },
        { name: '深股通', value: 'SZSE', category: true },
        { name: '日本', value: 'JP', category: true },
    ];
    const found = market_options.find(item => {
        if (item.value === market) {
            return item.name;
        }
    });
    return found;
};
