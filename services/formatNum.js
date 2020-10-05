export const formatNum = function (num, precision, separator) {
    var parts;
    if (!isNaN(parseFloat(num)) && isFinite(num)) {
        num = parseFloat(num);
        num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString();
        parts = num.split('.');
        parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));
        return parts.join('.');
    }
    return "--";
}