export const marketIdToMarket = id => {
    if (id == null) return '';

    // const hexId = id.toString(16);
    const hexId = decToHex(id);
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
    if (arr[arr.length - 8] == 8) {
        market = '權證';
    }
    return market;
};
const decToHex = number => {
    return (parseInt(number, 10) >>> 0).toString(16).toLocaleUpperCase();
};
