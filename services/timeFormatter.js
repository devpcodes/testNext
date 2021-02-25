export const timeFormatter = function (time, miniSeconds) {
    if (time) {
        var splitArray = time.match(/[\s\S]{1,2}/g);
        if (splitArray.length >= 3) {
            var str = '';
            splitArray.forEach((val, key) => {
                if (key > 2) {
                    str += val;
                }
            });
            if (splitArray.length > 3) {
                if (miniSeconds) {
                    return splitArray[0] + ':' + splitArray[1] + ':' + splitArray[2] + '.' + str;
                } else {
                    return splitArray[0] + ':' + splitArray[1] + ':' + splitArray[2];
                }
            } else {
                return splitArray[0] + ':' + splitArray[1] + ':' + splitArray[2];
            }
        } else {
            return time;
        }
    }
};
