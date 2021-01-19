// 強制小數點n位
export function toDecimal(x, n = 2) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    var f = Math.round(x * Math.pow(10, n)) / Math.pow(10, n);
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + n) {
        s += '0';
    }
    return s;
}

// 改變價格的紅綠色
export function priceColor(price, reference) {
    let color = '';
    if (Number(price) == 0) {
        return '#0d1623';
    }
    if (isNaN(Number(price)) || isNaN(Number(reference))) {
        return '#0d1623';
    }
    if (parseFloat(price) > parseFloat(reference)) {
        color = '#c43826';
    } else if (price < reference) {
        color = '#22a16f';
    } else {
        color = '#0d1623';
    }
    return color;
}
