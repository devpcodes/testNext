export const marketIdToMarket = id => {
    if (id == null) return '';

    const hexId = id.toString(16);
    const arr = hexId.split('');
    let market = '';
    if (arr[arr.length - 1] == 1) {
        market = '上市';
    }
    if (arr[arr.length - 1] == 2) {
        market = '上櫃';
    }
    if (arr[arr.length - 1] == 8) {
        market = '興櫃';
    }
    if (arr[arr.length - 5] == 8) {
        market = '權證';
    }
    return market;
};
