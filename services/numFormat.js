import { trim } from 'lodash';
import { getStockPriceRange, getStockType } from './stockTickType';

// 強制小數點n位
export function toDecimal(x, n = 2, replaceStr = null) {
    var num = parseFloat(x);
    if (isNaN(num)) {
        return x;
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
    if (replaceStr != null) {
        if (!isNaN(Number(s)) && Number(s) == 0) {
            s = replaceStr;
        }
        if (isNaN(Number(s))) {
            s = replaceStr;
        }
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

// 取得漲跌箭頭符號
export function getArrow(price, reference) {
    let arrow = '';
    if (Number(price) == 0) {
        return '';
    }
    if (isNaN(Number(price)) || isNaN(Number(reference))) {
        return '';
    }
    if (parseFloat(price) > parseFloat(reference)) {
        arrow = '▲';
    } else if (price < reference) {
        arrow = '▼';
    } else {
        arrow = '';
    }
    return arrow;
}

// TODO: 股票與權證升降單位不一樣
// 根據升降單位顯示價格小數位
export const formatPrice = (price, replace) => {
    const num = Number(price);
    if (num == 0 && replace != null) {
        return replace;
    }
    if (isNaN(num)) {
        return price;
    }
    if (num <= 50) {
        return num.toFixed(2);
    } else if (num > 50 && num <= 500) {
        return num.toFixed(1);
    } else if (num > 500) {
        return num.toFixed(0);
    } else {
        return num.toString();
    }
};

export const formatPriceByUnit = (stock_id, price, replace) => {
    const type = getStockType(stock_id || '').type;
    const num = Number(price);
    if (num == 0 && replace != null) {
        return replace;
    }
    if (isNaN(num)) {
        return price;
    }

    const unit = getStockPriceRange(type, num, true);
    const arr = String(unit).split('.');
    let len = 0;
    if (arr.length > 1) {
        len = arr[1].length;
    } else {
        len = 0;
    }
    return num.toFixed(len);
};

// 去掉數字的減號
export const trimMinus = value => {
    if (isNaN(Number(value))) {
        return value;
    }
    return trim(String(value), '-');
};

// 轉換試搓價格的顯示
export const simTradeHandler = (price, isSimTrade) => {
    if (isNaN(Number(price))) {
        return price;
    }
    if (isSimTrade) {
        return price + '*';
    } else {
        return price;
    }
};

//
export const formatAmountSum = amount => {
    if (isNaN(Number(amount))) {
        return amount;
    }
    if (Number(amount) < 10) {
        return toDecimal(amount, 2);
    } else {
        return toDecimal(amount, 0).split('.')[0];
    }
};
