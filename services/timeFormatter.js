export const timeFormatter = function (time) {
    if (time) {
        var splitArray = time.match(/[\s\S]{1,2}/g);
        if (splitArray.length === 3) {
            return splitArray[0] + ':' + splitArray[1] + ':' + splitArray[2];
        } else {
            return time;
        }
    }
};
