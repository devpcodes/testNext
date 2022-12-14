export const getCookie = function (cname) {
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
};

export const removeCookie = function (cname) {
    document.cookie = cname + '=;expires=Wed, 09 Aug 1995 00:00:01 GMT; path=/';
    document.cookie = cname + '=;expires=Wed, 09 Aug 1995 00:00:01 GMT; path=/newweb';
};
