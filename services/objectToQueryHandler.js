export const objectToQueryHandler = function (obj) {
    var str = '';
    for (var key in obj) {
        if (str != '') {
            str += '&';
        }
        str += key + '=' + encodeURIComponent(obj[key]);
    }
    if (str !== '') {
        str = '?' + str;
    }
    return str;
};
